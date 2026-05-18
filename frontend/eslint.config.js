import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist"],
  },

  js.configs.recommended,

  // React recommended rules FIRST
  reactPlugin.configs.flat.recommended,

  {
    files: ["**/*.{js,mjs,cjs,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      globals: {
        ...globals.browser,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    rules: {
      // React 17+ JSX transform
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // Disable prop-types for now
      "react/prop-types": "off",

      // Hooks rules
      ...reactHooks.configs.recommended.rules,

      // Vite Fast Refresh
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
]);
