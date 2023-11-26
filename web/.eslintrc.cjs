module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    "node_modules",
    "build",
    "tsconfig.json",
    "tsconfig.node.json",
    "vite.config.ts",
    "postcss.config.js",
    "tailwind.config.js",
    // "prettier.config.js"
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {allowConstantExport: true},
    ],
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    'no-unused-vars': 'off',
    "no-explicit-any": "off",
    '@typescript-eslint/explicit-module-boundary-types': 'off',

  },
}
