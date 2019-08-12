module.exports = {
  webpack(config) {
    config.resolve.alias['~'] = __dirname;
    return config;
  },
  // Will be available on both server and client
  publicRuntimeConfig: {
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
  },
};
