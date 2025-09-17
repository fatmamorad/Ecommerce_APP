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
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // 👇 ده هيحوّل الأخطاء لتحذيرات بدل ما توقف الـ build
      "prefer-const": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "react/jsx-key": "warn",
    },
  },
];

export default eslintConfig;
