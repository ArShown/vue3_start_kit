module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    // "prettier",
    // "prettier/vue",
    /**
     * This does three things:
     * 1. Enables eslint-plugin-prettier.
     * 2. Sets the prettier/prettier rule to "error".
     * 3. Extends the eslint-config-prettier configuration.
     * @ref https://github.com/prettier/eslint-plugin-prettier
     */
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
  },
  plugins: ["vue", "@typescript-eslint"],
  ignorePatterns: ["public/**/*"],
  // add your custom rules here
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
