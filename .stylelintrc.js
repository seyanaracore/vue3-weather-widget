module.exports = {
  extends: [
    'stylelint-config-clean-order',
    'stylelint-config-standard-scss',
    'stylelint-config-html',
    'stylelint-config-recommended-vue',
    'stylelint-config-prettier',
  ],
  configBasedir: './node_modules/',
  plugins: ['stylelint-order'],
  overrides: [
    {
      files: ['*.css', '**/*.css'],
    },
    {
      files: ['*.scss', '**/*.scss'],
    },
    {
      files: ['*.vue', '**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'no-empty-source': null,
    'declaration-empty-line-before': null,
    'no-missing-end-of-source-newline': null,
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['function', 'if', 'each', 'include', 'mixin'],
      },
    ],
  },
}
