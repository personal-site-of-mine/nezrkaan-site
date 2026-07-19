module.exports = function (eleventyConfig) {
  // Pass through static assets unchanged
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("og-image.png");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("llms.txt");
  eleventyConfig.addPassthroughCopy("googlef9a1995f79913751.html");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("_headers");

  // Watch CSS so eleventy --serve picks up edits
  eleventyConfig.addWatchTarget("css/");

  // Safety net: the CMS occasionally stores media paths without the leading
  // slash ("images/uploads/x.jpg"), which 404 from nested pages like
  // /writeups/. Rewrite them to site-absolute at build time.
  eleventyConfig.addTransform("absoluteImagePaths", function (content) {
    if (this.page.outputPath && String(this.page.outputPath).endsWith(".html")) {
      return content.replace(/src="images\//g, 'src="/images/');
    }
    return content;
  });

  // Date formatter for frontmatter dates -> human readable strings
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  });

  eleventyConfig.addFilter("longDate", (dateObj) => {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    if (!dateObj) return "";
    return new Date(dateObj).toISOString().split("T")[0];
  });

  eleventyConfig.addFilter("year", (dateObj) => {
    if (!dateObj) return "";
    return new Date(dateObj).getFullYear();
  });

  // Auto-calculate read time from rendered HTML content
  // ~220 words per minute average, minimum 1 minute
  eleventyConfig.addFilter("readtime", (content) => {
    if (!content) return "1 min read";
    const text = String(content).replace(/<[^>]*>/g, " ");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 220));
    return `${minutes} min read`;
  });

  // Group writeups by year, newest first
  eleventyConfig.addCollection("writeupsByYear", (collectionApi) => {
    const writeups = collectionApi
      .getFilteredByGlob("writeups/*.md")
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

    const groups = {};
    writeups.forEach((w) => {
      const y = new Date(w.data.date).getFullYear();
      if (!groups[y]) groups[y] = [];
      groups[y].push(w);
    });

    return Object.keys(groups)
      .sort((a, b) => b - a)
      .map((y) => ({ year: y, items: groups[y] }));
  });

  // Distinct filter tags with counts, for the archive filter chips.
  // Known tags keep a fixed order; anything new sorts after, alphabetically,
  // so a tag used in any post shows up as a chip automatically.
  eleventyConfig.addCollection("writeupTags", (collectionApi) => {
    const order = ["CTF", "Bellingcat", "Investigation", "Academic", "Blog", "News"];
    const counts = {};
    collectionApi.getFilteredByGlob("writeups/*.md").forEach((w) => {
      (w.data.tags_for_filter || []).forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return Object.keys(counts)
      .sort((a, b) => {
        const ia = order.indexOf(a);
        const ib = order.indexOf(b);
        if (ia !== -1 && ib !== -1) return ia - ib;
        if (ia !== -1) return -1;
        if (ib !== -1) return 1;
        return a.localeCompare(b);
      })
      .map((tag) => ({ tag, count: counts[tag] }));
  });

  // All writeups, newest first
  eleventyConfig.addCollection("writeups", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("writeups/*.md")
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
  );

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    // Markdown bodies are NOT run through Nunjucks: posts written in the CMS
    // may legitimately contain {{ }} or {% %} as plain text, and a template
    // engine would crash the build on them.
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
