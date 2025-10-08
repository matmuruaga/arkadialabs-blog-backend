export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('PUBLIC_URL', 'https://arkadialabs.io'),
  proxy: env.bool('IS_PROXIED', true), // Railway uses proxy
  cors: {
    enabled: true,
  },
});
