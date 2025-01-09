export interface ConfigOptions {
  environment: 'browser' | 'node' | 'both';
  typescript: boolean;
  framework: 'react' | 'vue' | 'node' | 'express' | 'next' | 'none';
  features: string[];
  style: {
    indent: 'tab' | 2 | 4;
    quotes: 'single' | 'double';
    semicolons: boolean;
    trailingComma: boolean;
    maxLineLength: number;
  };
}

export function generateConfig(options: ConfigOptions) {
  const config: any = {
    extends: ['eslint:recommended'],
    env: {
      es2021: true,
    },
    rules: {
      indent: ['error', options.style.indent],
      quotes: ['error', options.style.quotes],
      semi: ['error', options.style.semicolons ? 'always' : 'never'],
      'comma-dangle': ['error', options.style.trailingComma ? 'always-multiline' : 'never'],
      'max-len': ['error', { code: options.style.maxLineLength }],
    },
  };

  // Environment configuration
  if (options.environment === 'browser' || options.environment === 'both') {
    config.env.browser = true;
  }
  if (options.environment === 'node' || options.environment === 'both') {
    config.env.node = true;
  }

  // TypeScript configuration
  if (options.typescript) {
    config.extends.push(
      'plugin:@typescript-eslint/recommended'
    );
    config.parser = '@typescript-eslint/parser';
    config.plugins = ['@typescript-eslint'];
  }

  // Framework-specific configuration
  switch (options.framework) {
    case 'react':
      config.extends.push(
        'plugin:react/recommended',
        'plugin:react-hooks/recommended'
      );
      config.plugins = [...(config.plugins || []), 'react', 'react-hooks'];
      config.settings = {
        react: {
          version: 'detect',
        },
      };
      break;

    case 'vue':
      config.extends.push(
        'plugin:vue/vue3-recommended'
      );
      config.parser = 'vue-eslint-parser';
      config.plugins = [...(config.plugins || []), 'vue'];
      break;

    case 'next':
      config.extends.push(
        'plugin:@next/next/recommended'
      );
      if (options.typescript) {
        config.extends.push('plugin:@next/next/core-web-vitals');
      }
      break;

    case 'express':
      config.extends.push(
        'plugin:node/recommended'
      );
      config.plugins = [...(config.plugins || []), 'node'];
      config.rules = {
        ...config.rules,
        'node/exports-style': ['error', 'module.exports'],
        'node/file-extension-in-import': ['error', 'always'],
        'node/prefer-global/buffer': ['error', 'always'],
        'node/prefer-global/console': ['error', 'always'],
        'node/prefer-global/process': ['error', 'always'],
        'node/prefer-global/url-search-params': ['error', 'always'],
        'node/prefer-global/url': ['error', 'always'],
        'node/prefer-promises/dns': 'error',
        'node/prefer-promises/fs': 'error',
      };
      break;

    case 'node':
      config.extends.push(
        'plugin:node/recommended'
      );
      config.plugins = [...(config.plugins || []), 'node'];
      break;
  }

  // Additional features
  if (options.features.includes('prettier')) {
    config.extends.push('prettier');
    config.plugins = [...(config.plugins || []), 'prettier'];
    config.rules['prettier/prettier'] = 'error';
  }

  if (options.features.includes('import')) {
    config.extends.push('plugin:import/errors');
    config.plugins = [...(config.plugins || []), 'import'];
    if (options.typescript) {
      config.extends.push('plugin:import/typescript');
    }
  }

  if (options.features.includes('jest')) {
    config.extends.push('plugin:jest/recommended');
    config.plugins = [...(config.plugins || []), 'jest'];
  }

  return config;
} 