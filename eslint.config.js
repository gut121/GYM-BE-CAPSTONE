// eslint.config.js
const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  {
    ignores: ['node_modules', 'dist'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        es5: true,
        node: true,
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: Object.assign({}, eslintConfigPrettier.rules, {
      'prettier/prettier': 'error',
    }),
  },
];
