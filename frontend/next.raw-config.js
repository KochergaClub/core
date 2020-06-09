module.exports = {
  webpack: (config, options) => {
    config.resolve.alias['~'] = __dirname + '/src';

    // via https://github.com/zeit/next.js/blob/canary/examples/with-sentry-simple/next.config.js
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    // based on code from next-transpile-modules
    const nextCssLoaders = config.module.rules.find(
      rule => typeof rule.oneOf === 'object'
    );

    nextCssLoaders.oneOf.forEach(loader => {
      if (
        loader.sideEffects &&
        loader.issuer &&
        loader.issuer.include &&
        loader.issuer.include.endsWith('_app.tsx')
      ) {
        delete loader.issuer;
      }
    });

    // not needed since we don't use moment.js anymore
    // config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

    return config;
  },
  publicRuntimeConfig: {
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
    facebookPixelId: process.env.FACEBOOK_PIXEL_ID,
    yandexMetrikaId: process.env.YANDEX_METRIKA_ID,
    vkRetargetingId: process.env.VK_RETARGETING_ID,
    sentryDSN: process.env.SENTRY_DSN_FRONTEND,
    staticPrefix: process.env.STATIC_S3_BUCKET
      ? `https://${process.env.STATIC_S3_BUCKET}.s3.amazonaws.com/static/`
      : '/static/',
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
};
