module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'import',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "simple-import-sort/sort": "error",
    "sort-imports": "off",
    "import/order": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error"
  }
}
