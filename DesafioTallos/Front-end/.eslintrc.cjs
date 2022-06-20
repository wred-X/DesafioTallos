/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
    'plugin:prettier/recommended',
  ],
  env: {
    "vue/setup-compiler-macros": true,
  },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir : __dirname, 
      sourceType: 'module',
    },
    plugins: ["prettier"],
    ignorePatterns: ['.eslintrc.js'],
    rules: {
      "prettier/prettier": ["error",{
        "endOfLine": "auto"}
      ],
    },
};
