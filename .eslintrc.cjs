module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser for TypeScript
    extends: [
      'plugin:react/recommended', // Uses the recommended rules from eslint-plugin-react
      'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
      'prettier', // Enables eslint-config-prettier to disable ESLint rules that conflict with Prettier
      'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays Prettier errors as ESLint errors
    ],
    plugins: ['react', '@typescript-eslint', 'prettier'],
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    rules: {
      // Place your custom rules here
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off', // Not required for React 17
      'react/prop-types': 'off', // Disable PropTypes validation since TypeScript is used
    },
    overrides: [
      {
        files: ['*.tsx'],
        rules: {
          '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable explicit return types for React components
        },
      },
    ],
  };
  