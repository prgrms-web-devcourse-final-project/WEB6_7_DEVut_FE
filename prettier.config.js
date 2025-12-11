/** @type {import("prettier").Config} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  printWidth: 100,
  bracketSameLine: false,
  tabWidth: 2,
  arrowParens: "avoid",
  bracketSpacing: true,
  tailwindFunctions: ["clsx", "cva", "twMerge"],
};

export default config;
