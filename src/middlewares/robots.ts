export default (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.path === '/robots.txt') {
      const robotsTxt = `# Allow all crawlers
User-agent: *
Allow: /

# Sitemap location
Sitemap: https://arkadialabs.io/sitemap.xml

# Disallow admin and API routes
User-agent: *
Disallow: /admin
Disallow: /api
Disallow: /_health
`;

      ctx.type = 'text/plain';
      ctx.body = robotsTxt;
      return;
    }

    await next();
  };
};
