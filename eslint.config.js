import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint, { configs as tsConfigs } from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

// Extend the default typescript settings for import plugin
// It will only understand the ALIAS defined in tsconfig.app.json when it
// is included in `project` array. Even though tsconfig.json has `references`.
const tsImportConfig = importPlugin.flatConfigs.typescript;
tsImportConfig.settings["import/resolver"].typescript = {
  alwaysTryTypes: true,
  // project: ["tsconfig.json", "tsconfig.*.json"],
};

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tsConfigs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },

  // -- below has been added to default vite config

  importPlugin.flatConfigs.recommended,

  {
    name: "test-import-alias-ts",
    ...tsImportConfig,
  }
);
