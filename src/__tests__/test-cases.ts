import { Framework, Environment, Feature, ConfigFormat } from '../types/index.js';

export const TEST_CASES = {
  // Phase 1: Basic Functionality Tests
  cliBasicTests: {
    description: 'Basic CLI functionality tests',
    cases: [
      {
        name: 'CLI Startup',
        test: 'Should start CLI correctly and display version information',
        input: { version: true },
        expectedOutput: {
          success: true,
          version: '1.0.0'
        }
      },
      {
        name: 'Help Menu',
        test: 'Should display help menu with all commands and descriptions',
        input: { help: true },
        expectedOutput: {
          success: true,
          content: expect.stringContaining('ESLint Config Generator')
        }
      },
      {
        name: 'Interactive Mode',
        test: 'Should display all questions in sequence in interactive mode',
        input: { interactive: true },
        expectedPrompts: ['preset', 'format', 'preview', 'install'],
        expectedOutput: {
          success: true
        }
      }
    ]
  },

  configFormatTests: {
    description: 'Configuration format tests',
    cases: [
      {
        name: 'JSON Format',
        test: 'Should generate valid ESLint configuration in JSON format',
        input: {
          configFormat: ConfigFormat.JSON,
          environment: Environment.Browser,
          typescript: false,
          framework: Framework.None,
          features: [],
          style: {
            indent: 2,
            quotes: 'single',
            semicolons: 'always',
            trailingComma: 'es5',
            lineEnding: 'unix',
            maxLineLength: 80
          }
        },
        expectedFile: '.eslintrc.json',
        validateContent: (content: string) => {
          try {
            JSON.parse(content);
            return true;
          } catch {
            return false;
          }
        }
      },
      {
        name: 'JavaScript Format',
        test: 'Should generate valid ESLint configuration in JavaScript format',
        input: {
          configFormat: ConfigFormat.JavaScript,
          environment: Environment.Browser,
          typescript: false,
          framework: Framework.None,
          features: [],
          style: {
            indent: 2,
            quotes: 'single',
            semicolons: 'always',
            trailingComma: 'es5',
            lineEnding: 'unix',
            maxLineLength: 80
          }
        },
        expectedFile: '.eslintrc.js',
        validateContent: (content: string) => 
          content.startsWith('module.exports =') && content.endsWith(';')
      },
      {
        name: 'YAML Format',
        test: 'Should generate valid ESLint configuration in YAML format',
        input: {
          configFormat: ConfigFormat.YAML,
          environment: Environment.Browser,
          typescript: false,
          framework: Framework.None,
          features: [],
          style: {
            indent: 2,
            quotes: 'single',
            semicolons: 'always',
            trailingComma: 'es5',
            lineEnding: 'unix',
            maxLineLength: 80
          }
        },
        expectedFile: '.eslintrc.yaml',
        validateContent: (content: string) => content.includes('env:')
      }
    ]
  },

  environmentTests: {
    description: 'Environment configuration tests',
    cases: [
      {
        name: 'Browser Environment',
        test: 'Should set correct globals and rules for browser environment',
        input: {
          configFormat: ConfigFormat.JSON,
          environment: Environment.Browser,
          typescript: false,
          framework: Framework.None,
          features: [],
          style: {
            indent: 2,
            quotes: 'single',
            semicolons: 'always',
            trailingComma: 'es5',
            lineEnding: 'unix',
            maxLineLength: 80
          }
        },
        expectedConfig: {
          env: { browser: true, node: false }
        }
      },
      {
        name: 'Node.js Environment',
        test: 'Should set correct globals and rules for Node.js environment',
        input: {
          configFormat: ConfigFormat.JSON,
          environment: Environment.Node,
          typescript: false,
          framework: Framework.None,
          features: [],
          style: {
            indent: 2,
            quotes: 'single',
            semicolons: 'always',
            trailingComma: 'es5',
            lineEnding: 'unix',
            maxLineLength: 80
          }
        },
        expectedConfig: {
          env: { node: true, browser: false }
        }
      },
      {
        name: 'Both Environments',
        test: 'Should set correct settings for both environments',
        input: {
          configFormat: ConfigFormat.JSON,
          environment: Environment.Both,
          typescript: false,
          framework: Framework.None,
          features: [],
          style: {
            indent: 2,
            quotes: 'single',
            semicolons: 'always',
            trailingComma: 'es5',
            lineEnding: 'unix',
            maxLineLength: 80
          }
        },
        expectedConfig: {
          env: { browser: true, node: true }
        }
      }
    ]
  },

  // Phase 2: Framework and Language Support
  typescriptTests: {
    description: 'TypeScript integration tests',
    cases: [
      {
        name: 'TypeScript Parser',
        test: 'Should configure TypeScript parser and plugin correctly',
        input: {
          configFormat: ConfigFormat.JSON,
          environment: Environment.Browser,
          typescript: true,
          framework: Framework.None,
          features: [],
          style: {
            indent: 2,
            quotes: 'single',
            semicolons: 'always',
            trailingComma: 'es5',
            lineEnding: 'unix',
            maxLineLength: 80
          }
        },
        expectedConfig: {
          parser: '@typescript-eslint/parser',
          plugins: ['@typescript-eslint']
        }
      },
      {
        name: 'TypeScript Rules',
        test: 'Should set TypeScript-specific rules correctly',
        input: {
          configFormat: ConfigFormat.JSON,
          environment: Environment.Browser,
          typescript: true,
          framework: Framework.None,
          features: [],
          style: {
            indent: 2,
            quotes: 'single',
            semicolons: 'always',
            trailingComma: 'es5',
            lineEnding: 'unix',
            maxLineLength: 80
          }
        },
        expectedRules: {
          '@typescript-eslint/explicit-function-return-type': 'warn',
          '@typescript-eslint/no-explicit-any': 'warn'
        }
      }
    ]
  },

  frameworkTests: {
    description: 'Framework specific tests',
    cases: [
      {
        name: 'React Configuration',
        test: 'Should set all required settings for React',
        input: {
          configFormat: ConfigFormat.JSON,
          environment: Environment.Browser,
          typescript: false,
          framework: Framework.React,
          features: [],
          style: {
            indent: 2,
            quotes: 'single',
            semicolons: 'always',
            trailingComma: 'es5',
            lineEnding: 'unix',
            maxLineLength: 80
          }
        },
        expectedConfig: {
          plugins: ['react', 'react-hooks'],
          extends: ['plugin:react/recommended']
        }
      },
      {
        name: 'Vue Configuration',
        test: 'Should set all required settings for Vue',
        input: {
          configFormat: ConfigFormat.JSON,
          environment: Environment.Browser,
          typescript: false,
          framework: Framework.Vue,
          features: [],
          style: {
            indent: 2,
            quotes: 'single',
            semicolons: 'always',
            trailingComma: 'es5',
            lineEnding: 'unix',
            maxLineLength: 80
          }
        },
        expectedConfig: {
          plugins: ['vue'],
          extends: ['plugin:vue/vue3-recommended']
        }
      },
      {
        name: 'Next.js Configuration',
        test: 'Should set all required settings for Next.js',
        input: {
          configFormat: ConfigFormat.JSON,
          environment: Environment.Both,
          typescript: true,
          framework: Framework.Next,
          features: [],
          style: {
            indent: 2,
            quotes: 'single',
            semicolons: 'always',
            trailingComma: 'es5',
            lineEnding: 'unix',
            maxLineLength: 80
          }
        },
        expectedConfig: {
          extends: ['next', 'next/core-web-vitals']
        }
      }
    ]
  },

  // Phase 3: Feature and Style Tests
  featureTests: {
    description: 'Feature combination tests',
    cases: [
      {
        name: 'Prettier Integration',
        test: 'Should integrate ESLint with Prettier correctly',
        input: {
          configFormat: ConfigFormat.JSON,
          environment: Environment.Browser,
          typescript: false,
          framework: Framework.None,
          features: [Feature.Prettier],
          style: {
            indent: 2,
            quotes: 'single',
            semicolons: 'always',
            trailingComma: 'es5',
            lineEnding: 'unix',
            maxLineLength: 80
          }
        },
        expectedConfig: {
          plugins: ['prettier'],
          extends: ['plugin:prettier/recommended']
        }
      },
      {
        name: 'Import Rules',
        test: 'Should configure import/export rules correctly',
        input: {
          configFormat: ConfigFormat.JSON,
          environment: Environment.Browser,
          typescript: false,
          framework: Framework.None,
          features: [Feature.Import],
          style: {
            indent: 2,
            quotes: 'single',
            semicolons: 'always',
            trailingComma: 'es5',
            lineEnding: 'unix',
            maxLineLength: 80
          }
        },
        expectedConfig: {
          plugins: ['import'],
          rules: {
            'import/no-unresolved': 'error'
          }
        }
      },
      {
        name: 'Jest Support',
        test: 'Should configure Jest testing support correctly',
        input: {
          configFormat: ConfigFormat.JSON,
          environment: Environment.Node,
          typescript: false,
          framework: Framework.None,
          features: [Feature.Jest],
          style: {
            indent: 2,
            quotes: 'single',
            semicolons: 'always',
            trailingComma: 'es5',
            lineEnding: 'unix',
            maxLineLength: 80
          }
        },
        expectedConfig: {
          plugins: ['jest'],
          extends: ['plugin:jest/recommended']
        }
      }
    ]
  },

  stateManagementTests: {
    description: 'State management tests',
    cases: [
      {
        name: 'Redux Configuration',
        test: 'Should set required rules for Redux',
        input: {
          configFormat: ConfigFormat.JSON,
          environment: Environment.Browser,
          typescript: false,
          framework: Framework.React,
          features: [Feature.Redux],
          style: {
            indent: 2,
            quotes: 'single',
            semicolons: 'always',
            trailingComma: 'es5',
            lineEnding: 'unix',
            maxLineLength: 80
          }
        },
        expectedConfig: {
          plugins: ['react-redux'],
          rules: {
            'react-redux/connect-prefer-named-arguments': 'warn'
          }
        }
      },
      {
        name: 'Pinia Configuration',
        test: 'Should set Vue rules for Pinia correctly',
        input: {
          configFormat: ConfigFormat.JSON,
          environment: Environment.Browser,
          typescript: true,
          framework: Framework.Vue,
          features: [Feature.Pinia],
          style: {
            indent: 2,
            quotes: 'single',
            semicolons: 'always',
            trailingComma: 'es5',
            lineEnding: 'unix',
            maxLineLength: 80
          }
        },
        expectedConfig: {
          extends: ['@vue/eslint-config-typescript']
        }
      }
    ]
  },

  // Phase 4: Error and Edge Cases
  errorTests: {
    description: 'Error scenario tests',
    cases: [
      {
        name: 'Invalid Format',
        test: 'Should throw appropriate error for invalid format selection',
        input: {
          configFormat: 'invalid' as ConfigFormat,
          environment: Environment.Browser,
          typescript: false,
          framework: Framework.None,
          features: [],
          style: {
            indent: 2,
            quotes: 'single',
            semicolons: 'always',
            trailingComma: 'es5',
            lineEnding: 'unix',
            maxLineLength: 80
          }
        },
        expectedError: 'Invalid configuration format'
      },
      {
        name: 'Conflicting Features',
        test: 'Should warn when conflicting features are selected',
        input: {
          configFormat: ConfigFormat.JSON,
          environment: Environment.Browser,
          typescript: false,
          framework: Framework.None,
          features: [Feature.StandardStyle, Feature.AirbnbStyle],
          style: {
            indent: 2,
            quotes: 'single',
            semicolons: 'always',
            trailingComma: 'es5',
            lineEnding: 'unix',
            maxLineLength: 80
          }
        },
        expectedWarning: 'Conflicting style guides selected'
      }
    ]
  },

  // Phase 5: Integration and Performance
  presetTests: {
    description: 'Preset integration tests',
    cases: [
      {
        name: 'React TypeScript Preset',
        test: 'Should load React TypeScript preset correctly',
        input: { preset: 'react-typescript' },
        expectedConfig: {
          typescript: true,
          framework: Framework.React,
          features: [
            Feature.Prettier,
            Feature.Import,
            Feature.Jest,
            Feature.A11y,
            Feature.Redux,
            Feature.AirbnbStyle
          ]
        }
      },
      {
        name: 'Vue Modern Preset',
        test: 'Should load Vue Modern preset correctly',
        input: { preset: 'vue-modern' },
        expectedConfig: {
          typescript: true,
          framework: Framework.Vue,
          features: [
            Feature.Prettier,
            Feature.Import,
            Feature.Jest,
            Feature.A11y,
            Feature.Pinia,
            Feature.StandardStyle
          ]
        }
      }
    ]
  },

  performanceTests: {
    description: 'Performance tests',
    cases: [
      {
        name: 'Large Project Configuration',
        test: 'Should generate configuration quickly for large projects',
        input: {
          configFormat: ConfigFormat.JSON,
          environment: Environment.Both,
          typescript: true,
          framework: Framework.None,
          features: Object.values(Feature),
          style: {
            indent: 2,
            quotes: 'single',
            semicolons: 'always',
            trailingComma: 'es5',
            lineEnding: 'unix',
            maxLineLength: 80
          }
        },
        expectedTiming: 5000 // ms
      },
      {
        name: 'Memory Usage',
        test: 'Should maintain memory usage within reasonable limits',
        input: {
          configFormat: ConfigFormat.JSON,
          environment: Environment.Both,
          typescript: true,
          framework: Framework.None,
          features: Object.values(Feature),
          style: {
            indent: 2,
            quotes: 'single',
            semicolons: 'always',
            trailingComma: 'es5',
            lineEnding: 'unix',
            maxLineLength: 80
          }
        },
        maxMemoryUsage: 100 * 1024 * 1024 // 100MB
      }
    ]
  }
};

export default TEST_CASES; 