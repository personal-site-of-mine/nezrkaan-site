// Structured data for each bank page (breadcrumbs and the score as a review),
// built in _data/bankPrivacy.js.
module.exports = {
  eleventyComputed: {
    jsonLd: (data) => (data.bank ? data.bank.jsonLd : undefined),
  },
};
