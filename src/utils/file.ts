import * as fs from 'fs';
import * as path from 'path';
import { ConfigFormat } from '../types/index.js';

export interface ConfigFileResult {
  exists: boolean;
  format?: ConfigFormat;
}

export interface ESLintConfig {
  root?: boolean;
  extends?: string[];
  env?: Record<string, boolean>;
  parser?: string;
  plugins?: string[];
  rules?: Record<string, any>;
  settings?: Record<string, any>;
  parserOptions?: Record<string, any>;
}

export function writeConfigFile(config: ESLintConfig, format: ConfigFormat): void {
  const fileName = `.eslintrc.${format}`;
  const filePath = path.join(process.cwd(), fileName);
  const content = formatConfig(config, format);

  fs.writeFileSync(filePath, content, 'utf8');
}

export function checkExistingConfig(): ConfigFileResult {
  const jsonPath = path.join(process.cwd(), '.eslintrc.json');
  const jsPath = path.join(process.cwd(), '.eslintrc.js');

  if (fs.existsSync(jsonPath)) {
    return { exists: true, format: ConfigFormat.JSON };
  }

  if (fs.existsSync(jsPath)) {
    return { exists: true, format: ConfigFormat.JavaScript };
  }

  return { exists: false };
}

function formatConfig(config: ESLintConfig, format: ConfigFormat): string {
  if (format === ConfigFormat.JSON) {
    return JSON.stringify(config, null, 2);
  }

  return `module.exports = ${JSON.stringify(config, null, 2)
    .replace(/"([^"]+)":/g, '$1:')  // Convert "key": to key:
    .replace(/"/g, '\'')};  // Convert remaining double quotes to single quotes`;
}

export function getDependencyList(config: ESLintConfig): string[] {
  const dependencies = new Set<string>(['eslint']);

  if (config.parser === '@typescript-eslint/parser') {
    dependencies.add('@typescript-eslint/parser');
    dependencies.add('@typescript-eslint/eslint-plugin');
  }

  if (config.plugins) {
    for (const plugin of config.plugins) {
      switch (plugin) {
        case 'react':
          dependencies.add('eslint-plugin-react');
          if (config.plugins.includes('react-hooks')) {
            dependencies.add('eslint-plugin-react-hooks');
          }
          break;
        case 'vue':
          dependencies.add('eslint-plugin-vue');
          dependencies.add('vue-eslint-parser');
          break;
        case 'node':
          dependencies.add('eslint-plugin-node');
          break;
        case 'prettier':
          dependencies.add('eslint-plugin-prettier');
          dependencies.add('prettier');
          break;
        case 'import':
          dependencies.add('eslint-plugin-import');
          break;
        case 'jest':
          dependencies.add('eslint-plugin-jest');
          break;
      }
    }
  }

  return Array.from(dependencies);
}