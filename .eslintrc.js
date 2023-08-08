const config = require('./src/configs/ts-config')

module.exports = {
  ...config,
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb-with-typescript',
    '@vue/eslint-config-airbnb-with-typescript/allow-js-in-vue',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/recommended',
    'prettier',
  ],
}
