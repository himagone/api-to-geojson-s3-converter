// @ts-check

import eslint from '@eslint/js';

export default [
  {
    ignores: [
      'dist/**/*',
      'cdk/**/*',
    ],
    ...eslint.configs.recommended,  // JavaScriptの推奨設定を利用
    rules: {
      'array-callback-return': 'error',
      'arrow-parens': 'error',
      'arrow-spacing': 'error',
      'block-spacing': 'error',
      'indent': ['error', 2],
      'key-spacing': 'error',
      'keyword-spacing': 'error',
      'generator-star-spacing': 'error',
      'no-console': 'warn',
      'no-useless-computed-key': 'error',
      'no-useless-rename': 'error',
      'no-var': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'rest-spread-spacing': 'error',
      'semi-spacing': 'error',
      'sort-imports': 'off',
      'space-before-blocks': 'error',
      'template-curly-spacing': 'error',
      'yield-star-spacing': 'error'
    },
  },
];
