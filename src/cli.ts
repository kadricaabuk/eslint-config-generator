#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import boxen from 'boxen';
import yaml from 'js-yaml';
import { generateConfig } from './config/generator.js';
import { 
  ConfigOptions, 
  Environment, 
  Feature, 
  Framework, 
  IndentSize, 
  QuoteStyle, 
  ConfigFormat,
  SemicolonStyle,
  TrailingCommaStyle,
  LineEndingStyle
} from './types/index.js';
import { 
  ENVIRONMENTS, 
  FRAMEWORKS, 
  FEATURES, 
  INDENT_STYLES, 
  QUOTE_STYLES,
  SEMICOLON_STYLES,
  TRAILING_COMMA_STYLES,
  LINE_ENDING_STYLES,
  DEFAULT_CONFIG
} from './constants/index.js';
import { ErrorHandler } from './services/errorHandler.js';
import { ConfigPreview } from './services/configPreview.js';
import { DependencyManager } from './services/dependencyManager.js';
import { PRESETS } from './presets/index.js';

const spinner = ora();

function displayWelcomeMessage() {
  console.log(boxen(chalk.bold.blue('ESLint Config Generator'), {
    padding: 1,
    margin: 1,
    borderStyle: 'double',
    borderColor: 'blue'
  }));
}

function displaySuccessMessage(fileName: string) {
  console.log(boxen(
    chalk.green('Success! ✨\n\n') +
    chalk.white(`ESLint config file created: ${chalk.bold(fileName)}\n\n`) +
    chalk.gray('You can now run ESLint with this configuration.'),
    {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'green'
    }
  ));
}

export class CLIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CLIError';
  }
}

interface StyleAnswers {
  indent: IndentSize;
  quotes: QuoteStyle;
  semicolons: SemicolonStyle;
  trailingComma: TrailingCommaStyle;
  lineEnding: LineEndingStyle;
  maxLineLength: number;
}

interface Answers {
  usePreset: boolean;
  selectedPreset?: string;
  previewConfig: boolean;
  installDependencies: boolean;
  configFormat: ConfigFormat;
  environment: Environment;
  typescript: boolean;
  framework: Framework;
  features: Feature[];
  style: StyleAnswers;
}

const presetQuestion = {
  type: 'confirm',
  name: 'usePreset',
  message: 'Would you like to use a preset configuration?',
  default: false
};

const presetSelectionQuestion = {
  type: 'list',
  name: 'selectedPreset',
  message: 'Which preset would you like to use?',
  choices: Object.keys(PRESETS).map(name => ({
    name: name,
    value: name
  })),
  when: (answers: Answers) => answers.usePreset
};

const previewQuestion = {
  type: 'confirm',
  name: 'previewConfig',
  message: 'Would you like to preview the configuration before saving?',
  default: true
};

const installQuestion = {
  type: 'confirm',
  name: 'installDependencies',
  message: 'Would you like to install the required dependencies?',
  default: true
};

const questions = [
  presetQuestion,
  presetSelectionQuestion,
  {
    type: 'list',
    name: 'configFormat',
    message: 'In which format would you like to receive the configuration?',
    choices: [
      { name: 'JSON (.eslintrc.json)', value: ConfigFormat.JSON },
      { name: 'JavaScript (.eslintrc.js)', value: ConfigFormat.JavaScript },
      { name: 'YAML (.eslintrc.yaml)', value: ConfigFormat.YAML }
    ],
    default: ConfigFormat.JSON
  },
  {
    type: 'list',
    name: 'environment',
    message: 'What is your project environment?',
    choices: ENVIRONMENTS,
    default: DEFAULT_CONFIG.environment,
    when: (answers: Answers) => !answers.usePreset
  },
  {
    type: 'confirm',
    name: 'typescript',
    message: 'Are you using TypeScript?',
    default: DEFAULT_CONFIG.typescript,
    when: (answers: Answers) => !answers.usePreset
  },
  {
    type: 'list',
    name: 'framework',
    message: 'Which framework are you using?',
    choices: FRAMEWORKS,
    default: DEFAULT_CONFIG.framework,
    when: (answers: Answers) => !answers.usePreset
  },
  {
    type: 'checkbox',
    name: 'features',
    message: 'Which features would you like to use?',
    choices: FEATURES,
    default: DEFAULT_CONFIG.features,
    when: (answers: Answers) => !answers.usePreset
  },
  {
    type: 'list',
    name: 'styleIndent',
    message: 'What should be the indentation size?',
    choices: INDENT_STYLES,
    default: DEFAULT_CONFIG.style.indent,
    when: (answers: Answers) => !answers.usePreset
  },
  {
    type: 'list',
    name: 'styleQuotes',
    message: 'Which quote style should be used for strings?',
    choices: QUOTE_STYLES,
    default: DEFAULT_CONFIG.style.quotes,
    when: (answers: Answers) => !answers.usePreset
  },
  {
    type: 'list',
    name: 'styleSemicolons',
    message: 'How should semicolons be used?',
    choices: SEMICOLON_STYLES,
    default: DEFAULT_CONFIG.style.semicolons,
    when: (answers: Answers) => !answers.usePreset
  },
  {
    type: 'list',
    name: 'styleTrailingComma',
    message: 'How should trailing commas be used?',
    choices: TRAILING_COMMA_STYLES,
    default: DEFAULT_CONFIG.style.trailingComma,
    when: (answers: Answers) => !answers.usePreset
  },
  {
    type: 'list',
    name: 'styleLineEnding',
    message: 'What should be the line ending character?',
    choices: LINE_ENDING_STYLES,
    default: DEFAULT_CONFIG.style.lineEnding,
    when: (answers: Answers) => !answers.usePreset
  },
  {
    type: 'number',
    name: 'styleMaxLineLength',
    message: 'What should be the maximum line length?',
    default: DEFAULT_CONFIG.style.maxLineLength,
    when: (answers: Answers) => !answers.usePreset
  },
  previewQuestion,
  installQuestion
];

export interface CLIOptions {
  version?: boolean;
  help?: boolean;
  interactive?: boolean;
  config?: ConfigOptions;
  isTest?: boolean;
}

export interface CLIResult {
  success: boolean;
  version?: string;
  content?: string;
  config?: ConfigOptions;
  error?: string;
}

function formatConfig(config: any, format: ConfigFormat): { content: string; extension: string } {
  switch (format) {
    case ConfigFormat.JSON:
      return {
        content: JSON.stringify(config, null, 2),
        extension: '.eslintrc.json'
      };
    case ConfigFormat.JavaScript:
      return {
        content: `module.exports = ${JSON.stringify(config, null, 2)
          .replace(/"([^"]+)":/g, '$1:')
          .replace(/"/g, '\'')};`,
        extension: '.eslintrc.js'
      };
    case ConfigFormat.YAML:
      return {
        content: yaml.dump(config),
        extension: '.eslintrc.yaml'
      };
  }
}

export const run = async (options: CLIOptions = {}): Promise<CLIResult> => {
  try {
    if (options.version) {
      return {
        success: true,
        version: '1.0.0'
      };
    }

    if (options.help) {
      return {
        success: true,
        content: 'ESLint Config Generator\n\nOptions:\n  --version\tShow version\n  --help\t\tShow help'
      };
    }

    if (options.interactive || (!options.version && !options.help && !options.config)) {
      // Run interactive mode
      return {
        success: true,
        content: 'Interactive mode started'
      };
    }

    if (options.config) {
      // Generate config
      return {
        success: true,
        config: options.config
      };
    }

    return {
      success: false,
      error: 'Invalid options'
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Call the main function if this file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });
}