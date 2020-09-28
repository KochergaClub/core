const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const withSourceMaps = require('@zeit/next-source-maps')();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const rawConfig = {
  webpack: (config, options) => {
    config.resolve.alias['~'] = __dirname + '/src';

    // via https://github.com/vercel/next.js/blob/canary/examples/with-sentry/next.config.js
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/react';
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

    if (
      process.env.NODE_ENV === 'production' &&
      process.env.SENTRY_AUTH_TOKEN &&
      process.env.SENTRY_ORG &&
      process.env.SENTRY_PROJECT &&
      process.env.SENTRY_RELEASE
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: '.next',
          ignore: ['node_modules'],
          stripPrefix: ['webpack://_N_E/'],
          urlPrefix: `~/_next`,
          release: process.env.SENTRY_RELEASE,
        })
      );
    }

    return config;
  },
  poweredByHeader: false, // https://nextjs.org/docs/api-reference/next.config.js/disabling-x-powered-by
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 10,
  },
};

module.exports = withBundleAnalyzer(withSourceMaps(rawConfig));
