import { 
  ConfigOptions, 
  Environment, 
  QuoteStyle, 
  Framework, 
  Feature,
  SemicolonStyle,
  TrailingCommaStyle,
  LineEndingStyle,
  RuleLevel
} from '../types/index.js';
import { ESLintConfig } from '../utils/file.js';
import {
  BASE_ESLINT_RULES,
  TYPESCRIPT_ESLINT_RULES,
  REACT_ESLINT_RULES,
  VUE_ESLINT_RULES,
  ANGULAR_ESLINT_RULES,
  SVELTE_ESLINT_RULES,
  A11Y_ESLINT_RULES,
  PERFORMANCE_ESLINT_RULES,
  SECURITY_ESLINT_RULES,
  FRAMEWORK_PACKAGES,
  FEATURE_PACKAGES
} from '../constants/index.js';

export function generateConfig(options: ConfigOptions): ESLintConfig {
  const config: ESLintConfig = {
    root: true,
    env: {
      es2021: true,
    },
    rules: {
      ...BASE_ESLINT_RULES,
      indent: ['error', options.style.indent],
      quotes: ['error', options.style.quotes === QuoteStyle.Single ? 'single' : 'double', 
        { avoidEscape: options.style.quotes === QuoteStyle.BothSingle || options.style.quotes === QuoteStyle.BothDouble }
      ],
      semi: ['error', options.style.semicolons === SemicolonStyle.Always ? 'always' : 'never'],
      'comma-dangle': ['error', getTrailingCommaConfig(options.style.trailingComma)],
      'max-len': ['error', { code: options.style.maxLineLength }],
      'linebreak-style': ['error', options.style.lineEnding === LineEndingStyle.Unix ? 'unix' : 'windows']
    },
  };

  applyEnvironmentConfig(config, options);
  applyTypeScriptConfig(config, options);
  applyFrameworkConfig(config, options);
  applyFeatureConfigs(config, options);

  return config;
}

function getTrailingCommaConfig(style: TrailingCommaStyle): 'none' | 'es5' | 'all' {
  switch (style) {
    case TrailingCommaStyle.None:
      return 'none';
    case TrailingCommaStyle.ES5:
      return 'es5';
    case TrailingCommaStyle.All:
      return 'all';
  }
}

function applyEnvironmentConfig(config: ESLintConfig, options: ConfigOptions): void {
  if (options.environment === Environment.Browser || options.environment === Environment.Both) {
    config.env = { ...config.env, browser: true };
  }
  if (options.environment === Environment.Node || options.environment === Environment.Both) {
    config.env = { ...config.env, node: true };
  }
}

function applyTypeScriptConfig(config: ESLintConfig, options: ConfigOptions): void {
  if (options.typescript) {
    config.extends = config.extends || [];
    config.extends.push('plugin:@typescript-eslint/recommended');
    config.parser = '@typescript-eslint/parser';
    config.plugins = ['@typescript-eslint'];
    config.rules = {
      ...config.rules,
      ...TYPESCRIPT_ESLINT_RULES
    };
  }
}

function applyFrameworkConfig(config: ESLintConfig, options: ConfigOptions): void {
  if (options.framework !== Framework.None) {
    const frameworkPlugins = FRAMEWORK_PACKAGES[options.framework];
    config.plugins = [...(config.plugins || []), ...frameworkPlugins.map(pkg => pkg.replace('eslint-plugin-', ''))];
  }

  switch (options.framework) {
    case Framework.React:
      config.extends = config.extends || [];
      config.extends.push('plugin:react/recommended', 'plugin:react-hooks/recommended');
      config.settings = {
        react: {
          version: 'detect',
        },
      };
      config.rules = {
        ...config.rules,
        ...REACT_ESLINT_RULES
      };
      break;

    case Framework.Vue:
      config.extends = config.extends || [];
      config.extends.push('plugin:vue/vue3-recommended');
      config.parser = 'vue-eslint-parser';
      config.rules = {
        ...config.rules,
        ...VUE_ESLINT_RULES
      };
      break;

    case Framework.Next:
      config.extends = config.extends || [];
      config.extends.push('next');
      if (options.typescript) {
        config.extends.push('next/core-web-vitals');
      }
      break;

    case Framework.Express:
      applyNodeConfig(config);
      config.rules = {
        ...config.rules,
        'node/exports-style': [RuleLevel.Error, 'module.exports'],
        'node/file-extension-in-import': [RuleLevel.Error, 'always'],
        'node/prefer-global/buffer': [RuleLevel.Error, 'always'],
        'node/prefer-global/console': [RuleLevel.Error, 'always'],
        'node/prefer-global/process': [RuleLevel.Error, 'always'],
        'node/prefer-global/url-search-params': [RuleLevel.Error, 'always'],
        'node/prefer-global/url': [RuleLevel.Error, 'always'],
        'node/prefer-promises/dns': RuleLevel.Error,
        'node/prefer-promises/fs': RuleLevel.Error,
      };
      break;

    case Framework.Node:
      applyNodeConfig(config);
      break;

    case Framework.Angular:
      config.extends = config.extends || [];
      config.extends.push('plugin:@angular-eslint/recommended');
      config.rules = {
        ...config.rules,
        ...ANGULAR_ESLINT_RULES
      };
      break;

    case Framework.Svelte:
      config.extends = config.extends || [];
      config.extends.push('plugin:svelte/recommended');
      config.rules = {
        ...config.rules,
        ...SVELTE_ESLINT_RULES
      };
      break;
  }
}

function applyNodeConfig(config: ESLintConfig): void {
  config.extends = config.extends || [];
  config.extends.push('plugin:node/recommended');
  config.plugins = [...(config.plugins || []), 'node'];
}

function applyFeatureConfigs(config: ESLintConfig, options: ConfigOptions): void {
  for (const feature of options.features) {
    const featurePlugins = FEATURE_PACKAGES[feature];
    config.plugins = [...(config.plugins || []), ...featurePlugins.map(pkg => pkg.replace('eslint-plugin-', ''))];
  }

  if (options.features.includes(Feature.Prettier)) {
    config.extends = config.extends || [];
    config.extends.push('prettier');
    config.rules = { ...config.rules, 'prettier/prettier': RuleLevel.Error };
  }

  if (options.features.includes(Feature.Import)) {
    config.extends = config.extends || [];
    config.extends.push('plugin:import/errors');
    if (options.typescript) {
      config.extends.push('plugin:import/typescript');
    }
  }

  if (options.features.includes(Feature.Jest)) {
    config.extends = config.extends || [];
    config.extends.push('plugin:jest/recommended');
  }

  if (options.features.includes(Feature.A11y)) {
    config.extends = config.extends || [];
    config.extends.push('plugin:jsx-a11y/recommended');
    config.rules = {
      ...config.rules,
      ...A11Y_ESLINT_RULES
    };
  }

  if (options.features.includes(Feature.Performance)) {
    config.extends = config.extends || [];
    config.extends.push('plugin:performance/recommended');
    config.rules = {
      ...config.rules,
      ...PERFORMANCE_ESLINT_RULES
    };
  }

  if (options.features.includes(Feature.Security)) {
    config.extends = config.extends || [];
    config.extends.push('plugin:security/recommended');
    config.rules = {
      ...config.rules,
      ...SECURITY_ESLINT_RULES
    };
  }
} 