const generateConfig = (options) => {
  const configs = [];

  // JavaScript/JSX Configuration
  const jsConfig = {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: '@babel/eslint-parser',
      parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {},
    rules: {
      // Basic code style rules
      indent: ['error', options.indent === 'tab' ? 'tab' : options.indent === '2-space' ? 2 : 4],
      quotes: ['error', options.quotes === 'double' ? 'double' : 'single', { 
        avoidEscape: true,
        allowTemplateLiterals: options.quotes === 'consistent'
      }],
      semi: ['error', options.semicolons === 'never' ? 'never' : 'always'],
      'brace-style': ['error', options.brackets === 'same-line' ? '1tbs' : 'stroustrup'],
      'max-len': options.maxLen === 'off' ? 'off' : ['error', { 
        code: options.maxLen,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }],
      'comma-dangle': ['error', options.trailingComma ? 'always-multiline' : 'never'],
      
      // Additional style rules
      'linebreak-style': ['error', 'unix'],
      'no-trailing-spaces': 'error',
      'eol-last': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'computed-property-spacing': ['error', 'never'],
      'space-in-parens': ['error', 'never'],
      'space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }],
      'keyword-spacing': ['error', { before: true, after: true }],
      'arrow-spacing': ['error', { before: true, after: true }],
      'object-shorthand': ['error', 'always'],
      'arrow-parens': ['error', 'always']
    }
  };

  // TypeScript/TSX Configuration
  const tsConfig = {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {},
    rules: { ...jsConfig.rules }
  };

  // Add style guide rules
  if (options.styleGuide !== 'none') {
    switch (options.styleGuide) {
      case 'airbnb':
        const airbnbRules = require('eslint-config-airbnb-base').rules;
        jsConfig.rules = { ...airbnbRules, ...jsConfig.rules };
        tsConfig.rules = { ...airbnbRules, ...tsConfig.rules };
        break;
      case 'google':
        const googleRules = require('eslint-config-google').rules;
        jsConfig.rules = { ...googleRules, ...jsConfig.rules };
        tsConfig.rules = { ...googleRules, ...tsConfig.rules };
        break;
      case 'standard':
        const standardRules = require('eslint-config-standard').rules;
        jsConfig.rules = { ...standardRules, ...jsConfig.rules };
        tsConfig.rules = { ...standardRules, ...tsConfig.rules };
        break;
      case 'xo':
        const xoRules = require('eslint-config-xo').rules;
        jsConfig.rules = { ...xoRules, ...jsConfig.rules };
        tsConfig.rules = { ...xoRules, ...tsConfig.rules };
        break;
    }
  }

  // React and React Hooks rules
  if (options.features.includes('react')) {
    jsConfig.plugins.react = require('eslint-plugin-react');
    jsConfig.plugins['react-hooks'] = require('eslint-plugin-react-hooks');
    tsConfig.plugins.react = require('eslint-plugin-react');
    tsConfig.plugins['react-hooks'] = require('eslint-plugin-react-hooks');

    const reactRules = {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    };

    jsConfig.rules = { ...jsConfig.rules, ...reactRules };
    tsConfig.rules = { ...tsConfig.rules, ...reactRules };
  }

  // State management rules
  if (options.stateManagement) {
    switch (options.stateManagement) {
      case 'mobx':
        tsConfig.plugins.mobx = require('eslint-plugin-mobx');
        const mobxRules = {
          'mobx/exhaustive-make-observable': 'warn',
          'mobx/unconditional-make-observable': 'error',
          'mobx/missing-make-observable': 'error',
          'mobx/missing-observer': 'off',
          'mobx/no-anonymous-observer': 'off'
        };
        tsConfig.rules = { ...tsConfig.rules, ...mobxRules };
        break;
      // No specific rules for other state management libraries yet
    }
  }

  // Import/Export rules
  if (options.features.includes('import')) {
    jsConfig.plugins.import = require('eslint-plugin-import');
    tsConfig.plugins.import = require('eslint-plugin-import');

    const importRules = {
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': 'error',
      'import/no-cycle': 'error',
      'import/order': ['error', {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        'alphabetize': { 'order': 'asc' }
      }]
    };

    jsConfig.rules = { ...jsConfig.rules, ...importRules };
    tsConfig.rules = { ...tsConfig.rules, ...importRules };
  }

  // TypeScript-specific rules
  if (options.typescript === 'Yes') {
    tsConfig.plugins['@typescript-eslint'] = require('@typescript-eslint/eslint-plugin');

    const tsRules = {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          'selector': 'interface',
          'format': ['PascalCase'],
          'prefix': ['I']
        },
        {
          'selector': 'typeAlias',
          'format': ['PascalCase']
        }
      ]
    };

    tsConfig.rules = { ...tsConfig.rules, ...tsRules };
  }

  // Common rules
  const commonRules = {
    'no-console': options.features.includes('strict') ? 'warn' : 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'max-len': ['error', { 'code': 100, 'ignoreComments': true, 'ignoreStrings': true }],
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'eol-last': ['error', 'always']
  };

  jsConfig.rules = { ...jsConfig.rules, ...commonRules };
  tsConfig.rules = { ...tsConfig.rules, ...commonRules };

  // Prettier integration
  if (options.features.includes('prettier')) {
    const prettierRules = require('eslint-config-prettier').rules;
    jsConfig.rules = { ...jsConfig.rules, ...prettierRules };
    tsConfig.rules = { ...tsConfig.rules, ...prettierRules };
  }

  configs.push(jsConfig);
  if (options.typescript === 'Yes') {
    configs.push(tsConfig);
  }

  return configs;
};

module.exports = { generateConfig }; 