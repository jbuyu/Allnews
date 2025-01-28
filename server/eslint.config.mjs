import { fixeupPluginRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import eslintprettierconfig from "eslint-config-prettier";
import drizzlePlugin from "eslint-plugin-drizzle";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintprettierconfig,
  {
    plugins: {
      drizzle: fixeupPluginRules(drizzlePlugin),
    },
  },
];
