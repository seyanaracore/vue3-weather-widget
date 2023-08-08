const baseConfig = require('./base-config')

const config = {
  ...baseConfig,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    project: 'tsconfig.json',
    // tsconfigRootDir: __dirname,
  },
  // settings: {
  //     'import/resolver': {
  //         alias: {
  //             map: [['@', path.resolve('frontend/vue/src')]],
  //             extensions: ['.js', '.ts', '.tsx', '.jsx', '.vue'],
  //         },
  //     },
  // },
}

module.exports = config
