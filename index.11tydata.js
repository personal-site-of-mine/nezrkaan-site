// Fixed configuration for the home page. Kept out of the front matter so the
// CMS form only shows the fields that are actually meant to be edited.
module.exports = {
  layout: "layouts/base.njk",
  permalink: "/index.html",
  showFieldNotesNav: true,
  extraStyles: ["/css/home.css"],
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nezr Kaan",
    url: "https://nezrkaan.com",
    jobTitle: "Student & Developer",
    description:
      "Student building custom web applications, integrating complex systems, and researching open-source intelligence.",
    sameAs: ["https://www.linkedin.com/in/nezr-kaan"],
    knowsAbout: [
      "Web Development",
      "API Integrations",
      "Stripe Payments",
      "Database Architecture",
      "OSINT",
      "Open Source Intelligence",
    ],
  },
};
