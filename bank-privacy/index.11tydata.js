// Structured data for search engines, built from the scores in _data/bankPrivacy.js.
module.exports = {
  eleventyComputed: {
    jsonLd: (data) => data.bankPrivacy.indexJsonLd,
  },
};
