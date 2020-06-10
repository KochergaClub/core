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

    // Not needed since we don't use moment.js anymore:
    // config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

    return config;
  },
  poweredByHeader: false, // https://nextjs.org/docs/api-reference/next.config.js/disabling-x-powered-by
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 10,
  },
};
