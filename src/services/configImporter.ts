import fs from 'fs';
import path from 'path';
import { ConfigOptions, Environment, Framework, Feature } from '../types/index.js';
import { DEFAULT_CONFIG } from '../constants/index.js';
import { QuoteStyle, SemicolonStyle } from '../types/enums.js';

export class ConfigImporter {
  private readonly supportedFiles = ['.eslintrc', '.eslintrc.json', '.eslintrc.js', '.eslintrc.yaml', '.eslintrc.yml'];

  public findExistingConfig(): string | null {
    for (const file of this.supportedFiles) {
      const filePath = path.join(process.cwd(), file);
      if (fs.existsSync(filePath)) {
        return filePath;
      }
    }
    return null;
  }

  public async importConfig(filePath: string): Promise<ConfigOptions> {
    try {
      let config: any;

      if (filePath.endsWith('.js')) {
        config = require(filePath);
      } else {
        const content = fs.readFileSync(filePath, 'utf8');
        config = JSON.parse(content);
      }

      return this.parseConfig(config);
    } catch (error) {
      console.error('Error importing configuration:', error);
      return DEFAULT_CONFIG;
    }
  }

  private parseConfig(config: any): ConfigOptions {
    const options: ConfigOptions = { ...DEFAULT_CONFIG };

    // Parse environment
    if (config.env) {
      if (config.env.browser && config.env.node) {
        options.environment = Environment.Both;
      } else if (config.env.browser) {
        options.environment = Environment.Browser;
      } else if (config.env.node) {
        options.environment = Environment.Node;
      }
    }

    // Parse TypeScript
    options.typescript = config.parser === '@typescript-eslint/parser';

    // Parse framework
    if (config.extends) {
      const extends_ = Array.isArray(config.extends) ? config.extends : [config.extends];
      
      if (extends_.some((e: string) => e.includes('react'))) {
        options.framework = Framework.React;
      } else if (extends_.some((e: string) => e.includes('vue'))) {
        options.framework = Framework.Vue;
      } else if (extends_.some((e: string) => e.includes('next'))) {
        options.framework = Framework.Next;
      } else if (extends_.some((e: string) => e.includes('@angular-eslint'))) {
        options.framework = Framework.Angular;
      } else if (extends_.some((e: string) => e.includes('svelte'))) {
        options.framework = Framework.Svelte;
      } else if (extends_.some((e: string) => e.includes('@nuxtjs'))) {
        options.framework = Framework.Nuxt;
      }
    }

    // Parse features
    const features: Feature[] = [];
    if (config.extends) {
      const extends_ = Array.isArray(config.extends) ? config.extends : [config.extends];
      
      if (extends_.some((e: string) => e.includes('prettier'))) {
        features.push(Feature.Prettier);
      }
      if (extends_.some((e: string) => e.includes('import'))) {
        features.push(Feature.Import);
      }
      if (extends_.some((e: string) => e.includes('jest'))) {
        features.push(Feature.Jest);
      }
      if (extends_.some((e: string) => e.includes('jsx-a11y'))) {
        features.push(Feature.A11y);
      }
      if (extends_.some((e: string) => e.includes('performance'))) {
        features.push(Feature.Performance);
      }
      if (extends_.some((e: string) => e.includes('security'))) {
        features.push(Feature.Security);
      }
    }
    options.features = features;

    // Parse style options
    if (config.rules) {
      const rules = config.rules;
      
      if (rules.indent) {
        options.style.indent = rules.indent[1];
      }
      if (rules.quotes) {
        options.style.quotes = rules.quotes[1] === 'single' ? QuoteStyle.Single : QuoteStyle.Double;
      }
      if (rules.semi) {
        options.style.semicolons = rules.semi[1] === 'always' ? SemicolonStyle.Always : SemicolonStyle.Never;
      }
      if (rules['comma-dangle']) {
        options.style.trailingComma = rules['comma-dangle'][1];
      }
      if (rules['linebreak-style']) {
        options.style.lineEnding = rules['linebreak-style'][1];
      }
      if (rules['max-len']) {
        options.style.maxLineLength = rules['max-len'][1].code || rules['max-len'][1];
      }
    }

    return options;
  }
} 