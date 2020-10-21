module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: [
    "plugin:vue/vue3-essential",
    "prettier",
    "prettier/vue",
    /**
     * This does three things:
     * 1. Enables eslint-plugin-prettier.
     * 2. Sets the prettier/prettier rule to "error".
     * 3. Extends the eslint-config-prettier configuration.
     * @ref https://github.com/prettier/eslint-plugin-prettier
     */
    "plugin:prettier/recommended",
    "eslint:recommended",
  ],
  plugins: ["prettier"],
  // add your custom rules here
  rules: {},
};
