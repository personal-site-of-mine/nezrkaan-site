module.exports = function (eleventyConfig) {
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

  eleventyConfig.addWatchTarget("css/");

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    return new Date(dateObj).toLocaleDateString("en-GB", {
      day: "numeric", month: "short", year: "numeric",
    });
  });

  eleventyConfig.addFilter("longDate", (dateObj) => {
    if (!dateObj) return "";
    return new Date(dateObj).toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric",
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

  eleventyConfig.addCollection("writeups", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("writeups/*.md")
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
  );

  return {
    dir: { input: ".", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
