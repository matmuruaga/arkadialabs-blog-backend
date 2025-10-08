export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('PUBLIC_URL', 'https://arkadialabs-blog-backend-production.up.railway.app'),
  proxy: {
    enabled: true,
    ssl: true,
    koa: {
      keys: env.array('APP_KEYS'),
    },
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
  },
});
