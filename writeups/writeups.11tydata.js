module.exports = {
  layout: "layouts/writeup.njk",
  tags: ["writeup"],
  permalink: function (data) {
    return `/writeups/${data.page.fileSlug}.html`;
  },
  eleventyComputed: {
    jsonLd: function (data) {
      const iso =
        data.date instanceof Date
          ? data.date.toISOString().split("T")[0]
          : data.date;
      return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: data.ogTitle || data.title,
        description: data.ogDescription || data.description,
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
