module.exports = {
  parser: '@typescript-eslint/parser', // 指定ESLint解析器
  extends: [
    'react-app',
    'plugin:react/recommended', // 使用来自 @eslint-plugin-react 的推荐规则
    'plugin:@typescript-eslint/recommended', // 使用来自@typescript-eslint/eslint-plugin的推荐规则
    // "prettier/@typescript-eslint",  // 使用 ESLint -config-prettier 禁用来自@typescript-eslint/ ESLint 与 prettier 冲突的 ESLint 规则
    'plugin:prettier/recommended'
  ],
  env: {
    browser: true, // 此项指定环境的全局变量，下面的配置指定为浏览器环境
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['warn', 'never'],
    '@typescript-eslint/semi': ['warn', 'never'],
    'no-console': 'off',
    '@typescript-eslint/no-empty-interface': [
      'warn',
      {
        allowSingleExtends: true
      }
    ],
    'prettier/prettier': [
      'error',
      {
        // 字符串使用单引号
        singleQuote: true,
        // 大括号内的首尾需要空格
        bracketSpacing: true,
        // 末尾不需要逗号
        trailingComma: 'none',
        // 使用默认的折行标准
        proseWrap: 'preserve',
        // 根据显示样式决定 html 要不要折行
        htmlWhitespaceSensitivity: 'ignore',
        // jsx 标签的反尖括号需要换行
        jsxBracketSameLine: true,
        // 换行符使用 crlf/lf/auto
        endOfLine: 'lf'
      }
    ]
  }
}
