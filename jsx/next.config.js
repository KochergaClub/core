module.exports = {
  webpack: (config, options) => {
    config.resolve.alias['~'] = __dirname;

    // via https://github.com/zeit/next.js/blob/canary/examples/with-sentry-simple/next.config.js
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    return config;
  },
  distDir: '../jsx-build',
  publicRuntimeConfig: {
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
    facebookPixelId: process.env.FACEBOOK_PIXEL_ID,
    yandexMetrikaId: process.env.YANDEX_METRIKA_ID,
    vkRetargetingId: process.env.VK_RETARGETING_ID,
    sentryDSN: process.env.SENTRY_DSN_FRONTEND,
    vkMessagesWidgetId: 99973027,
  },
  poweredByHeader: false,
};
