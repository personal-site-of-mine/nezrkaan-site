// Bank Privacy Index: reads every bank file in bank-privacy/banks/, checks it, and works out the
// score from the method in bank-privacy/rubric.js. Templates use the result as `bankPrivacy`.
//
// The build stops with an error if a bank file is incomplete (a missing check, an answer the
// method doesn't know, or a source that isn't listed), so a half-finished page can't go live.

const fs = require("fs");
const path = require("path");
const rubric = require("../bank-privacy/rubric.js");

const ROOT = path.join(__dirname, "..", "bank-privacy");
const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;

// 2.25 -> "2.25", 1.5 -> "1.5", 1 -> "1"
const fmt = (n) => String(Number(n.toFixed(2)));
const round2 = (n) => Math.round(n * 100) / 100;

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
  return {
    ...bank,
    criteria,
    total,
    totalShown: (Math.round(total * 10) / 10).toFixed(1),
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
  };
};

// Used by the checking script that tests a single bank file before it is added.
module.exports.scoreBank = scoreBank;
