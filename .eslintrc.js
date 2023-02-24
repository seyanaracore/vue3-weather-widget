module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/airbnb",
    "@vue/typescript/recommended",
    "@vue/eslint-config-typescript",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    project: ["tsconfig.json"]
  },
  ignorePatterns: ["src/main.ts", ".eslintrc.js", ".stylelintrc.js", 'dist/*'],
  parser: "vue-eslint-parser",
  rules: {
    "@typescript-eslint/no-floating-promises": "off",
    "no-restricted-exports": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "import",
        next: "*"
      },
      {
        blankLine: "any",
        prev: "import",
        next: "import"
      },
      {
        blankLine: "always",
        prev: "*",
        next: "block-like"
      },
      {
        blankLine: "always",
        prev: "block-like",
        next: "*"
      },
      {
        blankLine: "always",
        prev: "*",
        next: ["const", "let"]
      },
      {
        blankLine: "always",
        prev: ["const", "let"],
        next: "*"
      },
      {
        blankLine: "never",
        prev: ["singleline-const", "singleline-let"],
        next: ["singleline-const", "singleline-let"]
      },
      {
        blankLine: "always",
        prev: ["multiline-const", "multiline-let"],
        next: ["multiline-const", "multiline-let"]
      },
      {
        blankLine: "always",
        prev: ["cjs-import"],
        next: "*"
      },
      {
        blankLine: "any",
        prev: ["cjs-import"],
        next: ["cjs-import"]
      }
    ]
  }
};
