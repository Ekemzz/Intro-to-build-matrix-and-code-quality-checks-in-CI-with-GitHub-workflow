import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";

export default [
  js.configs.recommended,

  {
    files: ["**/*.js", "**/*.jsx"],

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",

      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        console: "readonly", // explicitly add console
      },
    },

    plugins: {
      react: reactPlugin,
    },

    settings: {
      react: {
        version: "19.0",
      },
    },

    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      eqeqeq: "error",
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
];
