import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist/**", "build/**", "node_modules/**", "env/**", "venv/**"],
  },

  // Base JavaScript rules
  js.configs.recommended,

  // React recommended rules
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
      // React Hooks recommended rules FIRST
      ...reactHooks.configs.recommended.rules,

      // React 17+ JSX transform
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // Disable prop-types for smaller JS projects
      "react/prop-types": "off",

      // Async fetching inside useEffect is valid
      "react-hooks/set-state-in-effect": "off",

      // Vite Fast Refresh
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],
    },
  },
]);
