module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true, // 解决require和module报错
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      // 添加`prettier`拓展 用于和`prettier`冲突时覆盖`eslint`规则
      'prettier',
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['react'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // 'eslint-loader'
      // 'no-unused-vars': 0,
    },
  }