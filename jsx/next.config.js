module.exports = {
  webpack(config) {
    config.resolve.alias['~'] = __dirname;
    return config;
  },
  distDir: '../jsx-build',
  publicRuntimeConfig: {
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
  },
};
