const path = require('path');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials'],
  typescript: {
    reactDocgen: 'none', // https://github.com/storybookjs/storybook/issues/15067
  },
  reactOptions: {
    strictMode: true,
  },

  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    for (const rule of config.module.rules) {
      if (!rule.use) {
        continue;
      }
      for (const loader of rule.use) {
        if (loader instanceof Object && loader.loader.match(/\bcss-loader\b/)) {
          loader.options.url = false; // without this storybook/webpack tries to load fonts at build time and fails
          rule.use.push({
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.join(__dirname, '../postcss.config.js'),
              },
            },
          });
        }
      }
    }

    return config;
  },
};
