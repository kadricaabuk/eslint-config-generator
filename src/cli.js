#!/usr/bin/env node

const inquirer = require('inquirer');
const { generateConfig } = require('./index');
const fs = require('fs');
const path = require('path');

const questions = [
  {
    type: 'list',
    name: 'environment',
    message: 'What environment will your project run in?',
    choices: ['browser', 'node', 'both']
  },
  {
    type: 'list',
    name: 'typescript',
    message: 'Are you using TypeScript?',
    choices: ['Yes', 'No']
  },
  {
    type: 'list',
    name: 'styleGuide',
    message: 'Which style guide would you like to use?',
    choices: [
      { name: 'Airbnb (Popular and strict rules)', value: 'airbnb' },
      { name: 'Google (Google JavaScript Style Guide)', value: 'google' },
      { name: 'Standard (More flexible, no semicolons)', value: 'standard' },
      { name: 'XO (Close to ESLint defaults)', value: 'xo' },
      { name: 'None (I will set my own rules)', value: 'none' }
    ]
  },
  {
    type: 'checkbox',
    name: 'features',
    message: 'Which features would you like to enable?',
    choices: [
      { name: 'React and React Hooks rules', value: 'react' },
      { name: 'Import/Export rules', value: 'import' },
      { name: 'Prettier integration', value: 'prettier' },
      { name: 'Strict mode', value: 'strict' }
    ]
  },
  {
    type: 'list',
    name: 'stateManagement',
    message: 'Which state management library are you using?',
    choices: [
      { name: 'Redux (including Redux Toolkit)', value: 'redux' },
      { name: 'MobX', value: 'mobx' },
      { name: 'Zustand', value: 'zustand' },
      { name: 'Recoil', value: 'recoil' },
      { name: 'Jotai', value: 'jotai' },
      { name: 'None', value: 'none' }
    ],
    when: (answers) => answers.features.includes('react')
  },
  {
    type: 'list',
    name: 'indent',
    message: 'What is your indentation preference?',
    choices: [
      { name: 'Use tabs', value: 'tab' },
      { name: 'Use 2 spaces', value: '2-space' },
      { name: 'Use 4 spaces', value: '4-space' }
    ]
  },
  {
    type: 'list',
    name: 'quotes',
    message: 'Which quote style would you like to use for strings?',
    choices: [
      { name: "Single quotes (')", value: 'single' },
      { name: 'Double quotes (")', value: 'double' },
      { name: 'Consistent (either, but consistent)', value: 'consistent' }
    ]
  },
  {
    type: 'list',
    name: 'semicolons',
    message: 'What is your semicolon preference?',
    choices: [
      { name: 'Always require semicolons', value: 'always' },
      { name: 'Only when needed', value: 'as-needed' },
      { name: 'Never use semicolons', value: 'never' }
    ]
  },
  {
    type: 'list',
    name: 'brackets',
    message: 'What is your curly brace style preference?',
    choices: [
      { name: 'Same line (if () { })', value: 'same-line' },
      { name: 'New line (if () \n{ })', value: 'new-line' }
    ]
  },
  {
    type: 'list',
    name: 'maxLen',
    message: 'What should be the maximum line length?',
    choices: [
      { name: '80 characters (traditional)', value: 80 },
      { name: '100 characters (recommended)', value: 100 },
      { name: '120 characters (for wider screens)', value: 120 },
      { name: 'No limit', value: 'off' }
    ]
  },
  {
    type: 'confirm',
    name: 'trailingComma',
    message: 'Would you like to enforce trailing commas in multiline objects and arrays?',
    default: true
  }
];

async function run() {
  try {
    console.log('Welcome to ESLint Configuration Generator! 🚀');
    
    const answers = await inquirer.prompt(questions);
    const config = generateConfig(answers);
    
    // Save configuration to eslint.config.js
    // Clean up plugin references
    const cleanConfig = config.map(conf => ({
      ...conf,
      plugins: Object.keys(conf.plugins).reduce((acc, key) => {
        acc[key] = key; // Replace plugin object with just its name
        return acc;
      }, {})
    }));

    const configContent = `module.exports = ${JSON.stringify(cleanConfig, null, 2)};`;
    fs.writeFileSync(
      path.join(process.cwd(), 'eslint.config.js'),
      configContent
    );

    console.log('✅ ESLint configuration has been generated successfully!');
    console.log('📝 eslint.config.js has been added to your project.');
    
    // Instructions for installing required packages
    console.log('\nℹ️  Please install the following core packages:');
    console.log('npm install --save-dev eslint @babel/core @babel/eslint-parser');
    
    // Style guide packages
    switch (answers.styleGuide) {
      case 'airbnb':
        console.log('npm install --save-dev eslint-config-airbnb-base');
        break;
      case 'google':
        console.log('npm install --save-dev eslint-config-google');
        break;
      case 'standard':
        console.log('npm install --save-dev eslint-config-standard');
        break;
      case 'xo':
        console.log('npm install --save-dev eslint-config-xo');
        break;
    }

    if (answers.typescript === 'Yes') {
      console.log('npm install --save-dev typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin');
    }
    
    if (answers.features.includes('react')) {
      console.log('npm install --save-dev eslint-plugin-react eslint-plugin-react-hooks');
    }
    
    if (answers.features.includes('import')) {
      console.log('npm install --save-dev eslint-plugin-import');
    }

    // State management packages
    if (answers.stateManagement && answers.stateManagement !== 'none') {
      switch (answers.stateManagement) {
        case 'mobx':
          console.log('npm install --save-dev eslint-plugin-mobx');
          break;
      }
    }
    
    if (answers.features.includes('prettier')) {
      console.log('npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier');
    }

    console.log('\n🎉 All done! Your ESLint configuration is ready.');
  } catch (error) {
    console.error('❌ An error occurred:', error);
    process.exit(1);
  }
}

run(); 