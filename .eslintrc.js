module.exports = {
  extends: [
    "react-app",
    "plugin:prettier/recommended"
  ],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    semi: 2,
    'space-in-parens': 2,
    'max-len': 150,
    'comma-dangle': 2,
    'max-lines': ['error', 1000],
    'max-depth': ['error', 5],
    '@typescript-eslint/no-unused-expressions': 0,
    'no-underscore-dangle': 0,
    'react/jsx-pascal-case': 0,
    'react-hooks/exhaustive-deps': 2,
    'key-spacing': 2,
    'no-multiple-empty-lines': 2,
    'comma-spacing': 2,
    'no-nested-ternary': 0,
  },
};
