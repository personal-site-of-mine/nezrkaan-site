// Bank Privacy Index: reads every bank file in bank-privacy/banks/, checks it, and works out the
// score from the method in bank-privacy/rubric.js. Templates use the result as `bankPrivacy`.
//
// The build stops with an error if a bank file is incomplete (a missing check, an answer the
// method doesn't know, or a source that isn't listed), so a half-finished page can't go live.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const rubric = require("../bank-privacy/rubric.js");
const site = require("./site.json");

const ROOT = path.join(__dirname, "..", "bank-privacy");
const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;

// 2.25 -> "2.25", 1.5 -> "1.5", 1 -> "1"
const fmt = (n) => String(Number(n.toFixed(2)));
const round2 = (n) => Math.round(n * 100) / 100;

// ["A", "B", "C"] -> "A, B and C"
const listNames = (names) =>
  names.length <= 1 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;

const SHARING = rubric.criteria.find((c) => c.id === "A");

// Share images are cached for a year (see _headers), so each URL carries a short hash of the file:
// a new image gets a new URL.
function imageUrl(rel) {
  const file = path.join(__dirname, "..", rel);
  if (!fs.existsSync(file)) return null;
  const v = crypto.createHash("md5").update(fs.readFileSync(file)).digest("hex").slice(0, 8);
  return `${site.url}/${rel}?v=${v}`;
}
const INDEX_IMAGE = imageUrl("images/bank-privacy/og.png") || site.ogImage;

// The plain sentence the method gives for a bank's answer to one of the sharing checks.
function says(bank, id) {
  const check = SHARING.checks.find((ch) => ch.id === id);
  const option = check.options[(bank.checks[id] || {}).result];
  return option ? option.says : "";
}

function fail(bank, message) {
  throw new Error(`Bank Privacy Index, ${bank}: ${message}`);
}

function scoreBank(bank, file) {
  const name = bank.slug || file;
  ["slug", "name", "region", "type", "checked", "sources"].forEach((key) => {
    if (!bank[key]) fail(name, `missing "${key}"`);
  });

  // Sources are numbered in the order they are listed; every reference must point to one.
  const number = {};
  bank.sources.forEach((s, i) => {
    if (!s.id || !s.url) fail(name, `source ${i + 1} needs an id and a url`);
    number[s.id] = i + 1;
  });
  const refs = (ids, where) =>
    (ids || []).map((id) => {
      if (!number[id]) fail(name, `${where} cites "${id}", which is not in sources`);
      return number[id];
    });

  const checked = new Date(bank.checked);
  let pendingMax = 0;

  const criteria = rubric.criteria.map((c) => {
    // B: serious incidents
    if (c.incidents) {
      const cfg = c.incidents;
      let minus = 0;
      const incidents = (bank.incidents || [])
        .map((inc) => {
          const level = cfg.levels[inc.level];
          if (!level) fail(name, `incident "${inc.title}" has an unknown level`);
          const age = (checked - new Date(inc.date)) / YEAR_MS;
          const counts = age >= 0 && age <= cfg.windowYears;
          const weight = age > cfg.fullWeightYears ? cfg.olderWeight : 1;
          const points = counts ? level.points * weight : 0;
          minus += points;
          return {
            ...inc,
            levelLabel: level.label,
            counts,
            halved: counts && weight < 1,
            minus: fmt(points),
            refs: refs(inc.sources, `incident "${inc.title}"`),
          };
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      const notCounted = (bank.notCounted || [])
        .map((n) => ({ ...n, refs: refs(n.sources, "a not-counted item") }))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      const points = Math.max(0, round2(c.max - minus));
      return { ...c, points, pointsShown: fmt(points), maxShown: fmt(c.max), pending: 0, incidents, notCounted };
    }

    // A, C, D, E: one answer per check
    let points = 0;
    let pending = 0;
    const checks = c.checks.map((ch) => {
      const found = (bank.checks || {})[ch.id];
      if (!found) fail(name, `no finding for ${ch.id}`);
      const base = { id: ch.id, question: ch.question, max: ch.max, maxShown: fmt(ch.max), finding: found, refs: refs(found.sources, ch.id) };
      if (found.result === "pending") {
        pending += ch.max;
        return { ...base, pending: true, answer: "Not measured yet", points: null };
      }
      let option;
      let answer;
      if (ch.bands) {
        if (typeof found.count !== "number") fail(name, `${ch.id} needs a number in "count"`);
        option = ch.bands.find((b) => found.count >= b.from && (b.to === null || found.count <= b.to));
        answer = `${found.count} counted`;
      } else {
        option = ch.options[found.result];
        if (!option) fail(name, `${ch.id} has an answer the method doesn't know: "${found.result}"`);
        answer = option.label;
      }
      points += option.points;
      return { ...base, pending: false, answer, points: option.points, pointsShown: fmt(option.points) };
    });
    points = round2(points);
    pendingMax += pending;
    return { ...c, points, pointsShown: fmt(points), maxShown: fmt(c.max), pending: round2(pending), checks };
  });

  (bank.sharing || []).forEach((row) => {
    (row.reasons || []).forEach((r) => {
      if (!rubric.reasons[r]) fail(name, `sharing row "${row.who}" has an unknown reason "${r}"`);
    });
  });

  // The sharing list, grouped by the first reason given for each row, in a fixed order.
  const sharingGroups = Object.keys(rubric.reasons)
    .map((key) => ({
      key,
      ...rubric.reasons[key],
      rows: (bank.sharing || []).filter((row) => row.reasons[0] === key),
    }))
    .filter((g) => g.rows.length);

  const total = round2(criteria.reduce((sum, c) => sum + c.points, 0));
  const totalShown = (Math.round(total * 10) / 10).toFixed(1);

  // "Does it sell your data?" in four plain sentences, taken from the answers to A4, A5, A1 and A2.
  const selling = [`${bank.name} ${says(bank, "A4")}.`, `It ${says(bank, "A5")}.`, `It ${says(bank, "A1")}.`, `It ${says(bank, "A2")}.`];
  const answer = (id) => (bank.checks[id] || {}).result;
  const doesNotSell = answer("A4") === "never" && answer("A5") === "no" && ["no", "consent"].includes(answer("A1"));

  const url = `${site.url}/bank-privacy/${bank.slug}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
          { "@type": "ListItem", position: 2, name: "Bank Privacy Index", item: `${site.url}/bank-privacy/` },
          { "@type": "ListItem", position: 3, name: bank.name, item: url },
        ],
      },
      {
        "@type": "Review",
        name: `${bank.name} privacy score`,
        url,
        datePublished: bank.checked,
        itemReviewed: {
          "@type": bank.type === "Banking app" ? "FinancialService" : "BankOrCreditUnion",
          name: bank.name,
          areaServed: bank.country,
        },
        reviewRating: { "@type": "Rating", ratingValue: Number(totalShown), bestRating: 10, worstRating: 0 },
        reviewBody: selling.join(" "),
        author: { "@type": "Person", name: site.author.name, url: site.author.url },
        publisher: { "@type": "Person", name: site.author.name, url: site.author.url },
      },
    ],
  };

  return {
    ...bank,
    criteria,
    total,
    totalShown,
    selling,
    doesNotSell,
    url,
    ogImage: imageUrl(`images/bank-privacy/og/${bank.slug}.png`) || INDEX_IMAGE,
    jsonLd,
    pendingMax: round2(pendingMax),
    pendingShown: fmt(pendingMax),
    provisional: pendingMax > 0,
    sharingGroups,
    sharingCount: (bank.sharing || []).length,
    sharingRefs: refs(bank.sharingSources, "the sharing table"),
    totalMaxShown: (Math.round((total + pendingMax) * 10) / 10).toFixed(1),
    context: (bank.context || []).map((x) => ({ ...x, refs: refs(x.sources, "a context note") })),
    policyRef: bank.policy && bank.policy.source ? refs([bank.policy.source], "policy")[0] : null,
  };
}

module.exports = function () {
  const dir = path.join(ROOT, "banks");
  const banks = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => scoreBank(JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")), f))
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));

  // Rank by total score. Banks with the same total share a rank (1, 2, 2, 4).
  banks.forEach((bank) => {
    bank.rank = 1 + banks.filter((other) => other.total > bank.total).length;
  });

  const scoredNames = new Set(banks.map((b) => b.name));
  const planned = JSON.parse(fs.readFileSync(path.join(ROOT, "planned.json"), "utf8")).banks.filter(
    (p) => !scoredNames.has(p.name)
  );

  const regions = ["UK", "US", "Europe"].map((r) => ({
    name: r,
    count: banks.filter((b) => b.region === r).length + planned.filter((p) => p.region === r).length,
  }));

  const lastChecked = banks.map((b) => b.checked).sort().pop();

  // Other banks in the same region, for the links at the bottom of each bank page.
  banks.forEach((bank) => {
    bank.others = banks
      .filter((o) => o.region === bank.region && o.slug !== bank.slug)
      .map((o) => ({ name: o.name, slug: o.slug, totalShown: o.totalShown }));
  });

  const faq = buildFaq(banks);
  const noSell = banks.filter((b) => b.doesNotSell).map((b) => ({ name: b.name, slug: b.slug, totalShown: b.totalShown, region: b.region }));

  const indexUrl = `${site.url}/bank-privacy/`;
  const indexJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
          { "@type": "ListItem", position: 2, name: "Bank Privacy Index", item: indexUrl },
        ],
      },
      {
        "@type": "Dataset",
        name: "Bank Privacy Index",
        description:
          "Privacy scores out of 10 for the most-used banks in the UK, the US and Europe. Each bank is scored on selling and sharing customers' data, serious data incidents in the last ten years, tracking on its website and app, what its privacy policy says, and the controls it gives customers.",
        url: indexUrl,
        creator: { "@type": "Person", name: site.author.name, url: site.author.url },
        datePublished: rubric.published,
        dateModified: lastChecked,
        isAccessibleForFree: true,
        keywords: ["bank privacy", "banks that sell your data", "bank data sharing", "privacy policy", "data breach", "UK banks", "US banks", "European banks"],
        spatialCoverage: ["United Kingdom", "United States", "Europe"].map((name) => ({ "@type": "Place", name })),
        variableMeasured: rubric.criteria.map((c) => c.title),
        measurementTechnique: "Each bank's privacy policy, regulators' decisions and national news reports, Exodus Privacy app reports and the Disconnect tracker list, scored with a fixed method.",
      },
      {
        "@type": "ItemList",
        name: "Bank privacy scores, out of 10",
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: banks.length,
        itemListElement: banks.map((b, i) => ({ "@type": "ListItem", position: i + 1, name: b.name, url: b.url })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((q) => ({ "@type": "Question", name: q.q, acceptedAnswer: { "@type": "Answer", text: q.a } })),
      },
    ],
  };

  return {
    rubric: {
      ...rubric,
      criteria: rubric.criteria.map((c) => ({
        ...c,
        maxShown: fmt(c.max),
        checks: (c.checks || []).map((ch) => ({
          ...ch,
          maxShown: fmt(ch.max),
          rows: ch.bands
            ? ch.bands.map((b) => ({ label: b.label, points: fmt(b.points) }))
            : Object.values(ch.options).map((o) => ({ label: o.label, points: fmt(o.points) })),
        })),
        levels: c.incidents
          ? Object.entries(c.incidents.levels)
              .sort((a, b) => b[0] - a[0])
              .map(([n, l]) => ({ n, ...l, pointsShown: fmt(l.points) }))
          : null,
      })),
    },
    banks,
    planned,
    regions,
    total: banks.length + planned.length,
    lastChecked,
    faq,
    noSell,
    indexJsonLd,
    ogImage: INDEX_IMAGE,
  };
};

// Questions people search for, answered from the scores themselves so the answers stay true
// as banks are added or re-checked.
function buildFaq(banks) {
  const n = banks.length;
  if (!n) return [];
  const answer = (b, id) => (b.checks[id] || {}).result;
  const count = (fn) => banks.filter(fn).length;
  const never = count((b) => answer(b, "A4") === "never");
  const sells = count((b) => answer(b, "A4") === "sells");
  const anon = count((b) => ["yes", "sells"].includes(answer(b, "A5")));
  const spending = count((b) => ["optout", "yes"].includes(answer(b, "A2")));

  const faq = [];

  let sell = never > n / 2
    ? `Most say they don't sell your personal data: ${never} of the ${n} banks here say they never do.`
    : `${never} of the ${n} banks here say they never sell your personal data.`;
  if (sells) sell += sells === 1 ? " One says it sells personal data, or may." : ` ${sells} say they sell personal data, or may.`;
  sell += ` But selling isn't the only way your data leaves a bank. Of the ${n}, ${anon} may sell anonymous data about customers or give it to other companies, and ${spending} use your spending to choose the ads and offers you see.`;
  faq.push({ q: "Do banks sell your data?", a: sell });


  const top = banks.filter((b) => b.total === banks[0].total);
  let best = `On this index, ${listNames(top.map((b) => b.name))} ${top.length === 1 ? "has" : "share"} the highest score, ${top[0].totalShown} out of 10.`;
  const leaders = ["UK", "US", "Europe"]
    .map((r) => ({ region: r === "Europe" ? "Europe" : `the ${r}`, bank: banks.find((b) => b.region === r) }))
    .filter((x) => x.bank)
    .map((x, i) => `${i === 0 ? "The highest in" : "in"} ${x.region} is ${x.bank.name} (${x.bank.totalShown})`);
  if (leaders.length > 1) best += ` ${leaders.slice(0, -1).join(", ")} and ${leaders[leaders.length - 1]}.`;
  best += " A higher score means the bank shares less for commercial reasons, has had fewer serious incidents, tracks you less and tells you more.";
  faq.push({ q: "Which bank is best for privacy?", a: best });

  const parts = rubric.criteria.map((c) => `${c.keyName} (${fmt(c.max)})`);
  faq.push({
    q: "What does the score look at?",
    a: `Five things, worth 10 points in total: ${listNames(parts)}. Sharing that the law requires costs nothing. Only sharing for commercial reasons, like marketing and advertising, loses points.`,
  });

  return faq;
}

// Used by the checking script that tests a single bank file before it is added.
module.exports.scoreBank = scoreBank;
