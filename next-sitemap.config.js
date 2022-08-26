/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.reost.de",
  generateRobotsTxt: true,
  autoLastmod: true,
  generateIndexSitemap: true,
};
