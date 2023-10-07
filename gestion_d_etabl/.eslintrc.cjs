module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    "no-unused-vars": "off",
    "react/no-unescaped-entities" : "off",
    "react/no-unknown-property" : "off",
    "react/jsx-no-target-blank" :"off", 
    "react-hooks/rules-of-hooks" : "off",
    "no-unused-labels" : "off",
    "react/jsx-key": "off",
    "no-undef": "off",
    "react/prop-types" :"off" 
  },
}
