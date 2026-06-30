import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "coverage/**",
      ".env",
    ],
  },

  js.configs.recommended,

  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module", // Usa "commonjs" si utilizas require()
      globals: globals.node,
    },

    rules: {
      // Posibles errores
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-unreachable": "error",
      "no-console": "off",

      // Buenas prácticas
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "prefer-const": "error",

      // Calidad del código
      "no-var": "error",
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
    },
  },
]);