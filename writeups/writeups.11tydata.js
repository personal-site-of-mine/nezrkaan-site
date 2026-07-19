// Data defaults for every writeup. The CMS form only asks for a title, an
// excerpt, tags and the body; everything else lives in the optional
// `advanced` group and is hoisted / auto-computed here, so a new post works
// with minimal front matter.
//
// Note: computed values are read unconditionally (assigned to a const before
// use) so Eleventy's computed-data dependency detection sees them even when
// a short-circuit would skip them at real render time.
const SITE_SUFFIX = " — Nezr Kaan";

const adv = (data) => data.advanced || {};

module.exports = {
  layout: "layouts/writeup.njk",
  tags: ["writeup"],
  permalink: function (data) {
    return `/writeups/${data.page.fileSlug}.html`;
  },
  eleventyComputed: {
    // ── hoisted straight from the advanced group ──
    dek: (data) => data.dek || adv(data).dek || "",
    type: (data) => data.type || adv(data).type || "",
    tag: (data) => data.tag || adv(data).tag || "",
    archive_title: (data) => data.archive_title || adv(data).archive_title || "",
    keywords: (data) => data.keywords || adv(data).keywords || "",
    ogTitle: (data) => data.ogTitle || adv(data).ogTitle || "",
    ogDescription: (data) => data.ogDescription || adv(data).ogDescription || "",

    // ── hoisted with automatic fallbacks ──
    // Browser-tab title falls back to the article title.
    title: (data) =>
      data.title ||
      adv(data).title ||
      `${data.articleTitle || data.page.fileSlug}${SITE_SUFFIX}`,

    // Archive card category falls back to the sub-category, then the first
    // filter tag, then a generic label.
    category: (data) => {
      const type = data.type;
      const firstTag = (data.tags_for_filter || [])[0];
      return data.category || adv(data).category || type || firstTag || "Post";
    },

    // Entry number: next number in date order unless set explicitly.
    number: (data) => {
      const explicit = data.number || adv(data).number;
      if (explicit) return explicit;
      try {
        const sorted = [...(data.collections.writeups || [])].sort(
          (a, b) => new Date(a.data.date) - new Date(b.data.date)
        );
        const idx = sorted.findIndex(
          (p) => p.inputPath === data.page.inputPath
        );
        return String(idx + 1).padStart(3, "0");
      } catch (e) {
        return "";
      }
    },

    // Kicker line above the H1, e.g. "Entry № 002 — Audio OSINT".
    kicker: (data) => {
      const number = data.number;
      const category = data.category;
      return data.kicker || adv(data).kicker || `Entry № ${number} — ${category}`;
    },

    // Archive excerpt falls back to the dek.
    excerpt: (data) => {
      const dek = data.dek;
      return data.excerpt || dek || "";
    },

    // SEO description falls back to the archive excerpt.
    description: (data) => {
      const excerpt = data.excerpt;
      return data.description || adv(data).description || excerpt || "";
    },

    jsonLd: function (data) {
      const title = data.title;
      const description = data.description;
      const ogTitle = data.ogTitle;
      const ogDescription = data.ogDescription;
      const keywords = data.keywords;
      const iso =
        data.date instanceof Date
          ? data.date.toISOString().split("T")[0]
          : data.date;
      return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: ogTitle || title,
        description: ogDescription || description,
        datePublished: iso,
        dateModified: data.dateModified || iso,
        author: {
          "@type": "Person",
          name: data.site.author.name,
          url: data.site.url,
        },
        publisher: {
          "@type": "Person",
          name: data.site.author.name,
          url: data.site.url,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${data.site.url}/writeups/${data.page.fileSlug}`,
        },
        keywords: keywords || "",
      };
    },
  },
};
