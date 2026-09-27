import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(js.configs.recommended, tseslint.configs.strict, {
  // Starter methods only throw "TODO", so their parameters are unused on purpose.
  files: ["src/**/starter.ts"],
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
  },
});
