// Fixed configuration for the archive page (writeups.html). Kept out of the
// front matter so the CMS form only shows the editable fields.
module.exports = {
  layout: "layouts/base.njk",
  permalink: "/writeups.html",
  showFieldNotesNav: true,
  isArchive: true,
  extraStyles: ["/css/archive.css"],
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Field Notes",
    description:
      "OSINT CTF writeups and open-source investigation notes by Nezr Kaan.",
    url: "https://nezrkaan.com/writeups",
    author: {
      "@type": "Person",
      name: "Nezr Kaan",
      url: "https://nezrkaan.com",
    },
  },
};
