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
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
