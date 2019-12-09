const webpack = require('webpack');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  webpack: (config, options) => {
    config.resolve.alias['~'] = __dirname;

    // via https://github.com/zeit/next.js/blob/canary/examples/with-sentry-simple/next.config.js
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

    return config;
  },
  distDir: '../jsx-build',
  experimental: {
    granularChunks: true,
  },
  publicRuntimeConfig: {
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
    facebookPixelId: process.env.FACEBOOK_PIXEL_ID,
    yandexMetrikaId: process.env.YANDEX_METRIKA_ID,
    vkRetargetingId: process.env.VK_RETARGETING_ID,
    sentryDSN: process.env.SENTRY_DSN_FRONTEND,
    vkMessagesWidgetId: 99973027,
    contacts: {
      map: {
        lat: '55.745606',
        lng: '37.560490',
      },
      googlePlaceId: 'ChIJY_hS-sZLtUYRxUzs_WrjCgY',
      address: 'ул.Большая Дорогомиловская, д.5 к.2',
      phone: '+7(499)350-20-42',
      email: 'info@kocherga-club.ru',
    },
    googleMapsKey: 'AIzaSyDTpyJfFT0Taz2DuiTJl5ng64Dn3st02TI',
  },
  poweredByHeader: false,
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 10,
  },
});
