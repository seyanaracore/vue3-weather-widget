// eslint-disable-next-line import/no-extraneous-dependencies
require('@rushstack/eslint-patch/modern-module-resolution')

const config = {
  env: {
    node: true,
    browser: true,
  },
  extends: ['eslint:recommended', 'plugin:import/errors', 'plugin:import/recommended', 'prettier'],
  plugins: ['prettier', 'import'],
  rules: {
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-irregular-whitespace': 'off',
    'class-methods-use-this': 'off',
    'no-new': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-restricted-exports': 'off',
    'vue/html-button-has-type': 'off',
    'vue/multi-word-component-names': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
    'prettier/prettier': ['error'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: 'import',
        next: '*',
      },
      {
        blankLine: 'any',
        prev: 'import',
        next: 'import',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'block-like',
      },
      {
        blankLine: 'always',
        prev: 'block-like',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['const', 'let'],
      },
      {
        blankLine: 'always',
        prev: ['const', 'let'],
        next: '*',
      },
      {
        blankLine: 'never',
        prev: ['singleline-const', 'singleline-let'],
        next: ['singleline-const', 'singleline-let'],
      },
      {
        blankLine: 'always',
        prev: ['multiline-const', 'multiline-let'],
        next: ['multiline-const', 'multiline-let'],
      },
      {
        blankLine: 'always',
        prev: ['cjs-import'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['cjs-import'],
        next: ['cjs-import'],
      },
    ],
  },
}

module.exports = config
