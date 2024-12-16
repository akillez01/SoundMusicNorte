import pluginJs from "@eslint/js";
import airbnbBase from "eslint-config-airbnb-base";
import globals from "globals";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "no-undef": "off",
    },
  },
  pluginJs.configs.recommended,
  airbnbBase,
];