module.exports = {
  webpack(config) {
    config.resolve.alias['~'] = __dirname;
    return config;
  },
  distDir: '../jsx-build',
  publicRuntimeConfig: {
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
    facebookPixelId: process.env.FACEBOOK_PIXEL_ID,
    yandexMetrikaId: process.env.YANDEX_METRIKA_ID,
    vkRetargetingId: process.env.VK_RETARGETING_ID,
  },
};
