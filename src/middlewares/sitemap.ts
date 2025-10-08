export default (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.path === '/sitemap.xml') {
      try {
        const articles = await strapi.entityService.findMany('api::article.article', {
          filters: { publishedAt: { $notNull: true } },
          fields: ['slug', 'updatedAt'],
          populate: {
            categories: {
              fields: ['slug'],
            },
          },
        });

        const categories = await strapi.entityService.findMany('api::category.category', {
          fields: ['slug', 'updatedAt'],
        });

        const baseUrl = 'https://arkadialabs.io';

        let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
        sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        // Homepage
        sitemap += `  <url>\n`;
        sitemap += `    <loc>${baseUrl}/blog</loc>\n`;
        sitemap += `    <changefreq>daily</changefreq>\n`;
        sitemap += `    <priority>1.0</priority>\n`;
        sitemap += `  </url>\n`;

        // Articles
        articles.forEach((article: any) => {
          const lastmod = new Date(article.updatedAt).toISOString().split('T')[0];
          sitemap += `  <url>\n`;
          sitemap += `    <loc>${baseUrl}/blog/${article.slug}</loc>\n`;
          sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
          sitemap += `    <changefreq>weekly</changefreq>\n`;
          sitemap += `    <priority>0.8</priority>\n`;
          sitemap += `  </url>\n`;
        });

        // Categories
        categories.forEach((category: any) => {
          const lastmod = new Date(category.updatedAt).toISOString().split('T')[0];
          sitemap += `  <url>\n`;
          sitemap += `    <loc>${baseUrl}/blog/category/${category.slug}</loc>\n`;
          sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
          sitemap += `    <changefreq>weekly</changefreq>\n`;
          sitemap += `    <priority>0.6</priority>\n`;
          sitemap += `  </url>\n`;
        });

        sitemap += '</urlset>';

        ctx.type = 'application/xml';
        ctx.body = sitemap;
        return;
      } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Failed to generate sitemap' };
        return;
      }
    }

    await next();
  };
};
