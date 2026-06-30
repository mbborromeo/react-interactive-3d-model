import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    rules: {
      // --- Code Quality & Logic ---
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'no-console': 'warn',
      'prefer-const': 'error',

      // --- Common Style & Formatting ---
      'semi': ['error', 'always'],                               // Enforces semicolons at the end of statements
      'quotes': ['error', 'single', { 'avoidEscape': true }],    // Enforces single quotes unless escaping
      'indent': ['error', 2],                                    // Enforces consistent 2-space indentation
      'comma-dangle': ['error', 'always-multiline'],             // Requires trailing commas on multiline arrays/objects
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }], // Prevents excessive whitespace blockages
      'arrow-spacing': ['error', { 'before': true, 'after': true }],  // Enforces spacing around arrow function arrows
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    
  },
]);
