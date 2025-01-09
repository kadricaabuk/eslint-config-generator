#!/usr/bin/env node

import inquirer from 'inquirer';
import { generateConfig, ConfigOptions } from './index';
import * as fs from 'fs';
import * as path from 'path';

const questions = [
  {
    type: 'list',
    name: 'environment',
    message: 'What is your project environment?',
    choices: [
      { name: 'Browser', value: 'browser' },
      { name: 'Node.js', value: 'node' },
      { name: 'Both', value: 'both' }
    ]
  },
  {
    type: 'confirm',
    name: 'typescript',
    message: 'Are you using TypeScript?',
    default: false
  },
  {
    type: 'list',
    name: 'framework',
    message: 'Which framework are you using?',
    choices: [
      { name: 'React', value: 'react' },
      { name: 'Vue.js', value: 'vue' },
      { name: 'Next.js', value: 'next' },
      { name: 'Express', value: 'express' },
      { name: 'Node.js (plain)', value: 'node' },
      { name: 'None (Vanilla JavaScript/TypeScript)', value: 'none' }
    ]
  },
  {
    type: 'checkbox',
    name: 'features',
    message: 'Select additional features:',
    choices: [
      { name: 'Prettier Integration', value: 'prettier' },
      { name: 'Import/Export Syntax Rules', value: 'import' },
      { name: 'Jest Testing', value: 'jest' }
    ]
  },
  {
    type: 'list',
    name: 'style.indent',
    message: 'Select indentation style:',
    choices: [
      { name: '2 Spaces', value: 2 },
      { name: '4 Spaces', value: 4 },
      { name: 'Tabs', value: 'tab' }
    ]
  },
  {
    type: 'list',
    name: 'style.quotes',
    message: 'Select quote style:',
    choices: [
      { name: 'Single Quotes (\'example\')', value: 'single' },
      { name: 'Double Quotes ("example")', value: 'double' }
    ]
  },
  {
    type: 'confirm',
    name: 'style.semicolons',
    message: 'Require semicolons?',
    default: true
  },
  {
    type: 'confirm',
    name: 'style.trailingComma',
    message: 'Use trailing commas in multiline?',
    default: true
  },
  {
    type: 'number',
    name: 'style.maxLineLength',
    message: 'Maximum line length:',
    default: 80
  }
];

async function run() {
  try {
    console.log('Welcome to ESLint Config Generator! 🚀\n');
    
    const answers = await inquirer.prompt(questions);
    const config = generateConfig(answers as ConfigOptions);
    
    // Write configuration to .eslintrc.json
    fs.writeFileSync(
      path.join(process.cwd(), '.eslintrc.json'),
      JSON.stringify(config, null, 2)
    );

    console.log('\n✨ ESLint configuration has been generated successfully!');
    
    // Framework-specific package installation instructions
    console.log('\n📦 Please install the following packages:');
    
    const packages = ['eslint'];
    
    if (answers.typescript) {
      packages.push('@typescript-eslint/parser', '@typescript-eslint/eslint-plugin');
    }
    
    switch (answers.framework) {
      case 'react':
        packages.push('eslint-plugin-react', 'eslint-plugin-react-hooks');
        break;
      case 'vue':
        packages.push('eslint-plugin-vue', 'vue-eslint-parser');
        break;
      case 'next':
        packages.push('@next/eslint-plugin-next');
        break;
      case 'express':
      case 'node':
        packages.push('eslint-plugin-node');
        break;
    }
    
    if (answers.features.includes('prettier')) {
      packages.push('eslint-plugin-prettier', 'prettier');
    }
    
    if (answers.features.includes('import')) {
      packages.push('eslint-plugin-import');
    }
    
    if (answers.features.includes('jest')) {
      packages.push('eslint-plugin-jest');
    }
    
    console.log(`\nnpm install --save-dev ${packages.join(' ')}`);
    
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

run(); 