// Data defaults for every writeup. Anything the CMS form leaves blank is
// computed here, so a new post only needs a title, an excerpt and a body.
const SITE_SUFFIX = " — Field Notes by Nezr Kaan";

module.exports = {
  layout: "layouts/writeup.njk",
  tags: ["writeup"],
  permalink: function (data) {
    return `/writeups/${data.page.fileSlug}.html`;
  },
  eleventyComputed: {
    // Browser-tab title falls back to the article title.
    title: (data) =>
      data.title || `${data.articleTitle || data.page.fileSlug}${SITE_SUFFIX}`,

    // Archive card category falls back to the sub-category / a generic label.
    category: (data) => data.category || data.type || "OSINT",

    // Field-note number: next number in date order unless set explicitly.
    number: (data) => {
      if (data.number) return data.number;
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

    // Kicker line above the H1, e.g. "Field Note № 002 — Audio OSINT".
    // Computed values are read unconditionally so Eleventy's dependency
    // detection orders number/category before this.
    kicker: (data) => {
      const number = data.number;
      const category = data.category;
      return data.kicker || `Field Note № ${number} — ${category}`;
    },

    // SEO description falls back to the archive excerpt, then the dek.
    description: (data) => {
      const excerpt = data.excerpt;
      return data.description || excerpt || data.dek || "";
    },

    // Archive excerpt falls back to the dek.
    excerpt: (data) => data.excerpt || data.dek || "",

    jsonLd: function (data) {
      const title = data.title;
      const description = data.description;
      const iso =
        data.date instanceof Date
          ? data.date.toISOString().split("T")[0]
          : data.date;
      return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: data.ogTitle || title,
        description: data.ogDescription || description,
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
        keywords: data.keywords || "",
      };
    },
  },
};
