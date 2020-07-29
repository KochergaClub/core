module.exports = {
  webpack: (config, options) => {
    config.resolve.alias['~'] = __dirname + '/src';

    // via https://github.com/zeit/next.js/blob/canary/examples/with-sentry-simple/next.config.js
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    // NOTE: uncomment for webpack 5
    // config.resolve.alias['path'] = false;

    // based on code from next-transpile-modules
    const nextCssLoaders = config.module.rules.find(
      (rule) => typeof rule.oneOf === 'object'
    );

    nextCssLoaders.oneOf.forEach((loader) => {
      if (
        loader.test &&
        loader.test == '/(?<!\\.module)\\.css$/' &&
        loader.issuer &&
        loader.issuer.and
      ) {
        delete loader.issuer;
      }
    });

    return config;
  },
  poweredByHeader: false, // https://nextjs.org/docs/api-reference/next.config.js/disabling-x-powered-by
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 10,
  },
};
