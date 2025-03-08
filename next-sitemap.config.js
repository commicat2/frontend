/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://www.commicat.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'hourly',
  priority: 1,
  exclude: [
    '/disable-account',
    '/dm',
    '/edit-portfolio',
    '/followings',
    '/forgot-password',
    '/notifications',
    '/requests',
    '/sign-in',
    '/settings',
    '/update-password/**',
    '/verify-email/**',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/disable-account',
          '/dm',
          '/edit-portfolio',
          '/followings',
          '/forgot-password',
          '/notifications',
          '/requests',
          '/sign-in',
          '/settings',
          '/update-password/**',
          '/verify-email/**',
        ],
      },
    ],
  },
}
