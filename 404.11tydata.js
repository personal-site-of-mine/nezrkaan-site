// Fixed configuration for the 404 page.
module.exports = {
  layout: "layouts/base.njk",
  permalink: "/404.html",
  showFieldNotesNav: true,
  extraStyles: ["/css/home.css"],
  eleventyExcludeFromCollections: true,
};
