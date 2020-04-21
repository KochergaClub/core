const rawConfig = require('./next.raw-config');
const withGraphql = require('next-plugin-graphql');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(withGraphql(rawConfig));
