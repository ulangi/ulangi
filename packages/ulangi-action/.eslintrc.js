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
    'jest'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended'
  ],
  rules: {
    //"@typescript-eslint/prefer-interface": "off",
    "@typescript-eslint/indent": ["warn", 2],
    "@typescript-eslint/no-explicit-any": "off",
    "simple-import-sort/sort": "error",
    "sort-imports": "off",
    "import/order": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error"
  }
}
