import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Project overrides
  {
    rules: {
      // Allow apostrophes and other characters in JSX text without forcing HTML entities
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
