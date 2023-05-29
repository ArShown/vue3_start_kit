module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "@vue/eslint-config-typescript",
    "prettier",
    "prettier/vue",
    "plugin:prettier/recommended",
  ],
  parser: "vue-eslint-parser",
  plugins: ["prettier"],
  ignorePatterns: ["public/**/*"],
  // add your custom rules here
  rules: {},
};
