# ESLint Config Generator

A powerful and flexible ESLint configuration generator with support for multiple frameworks, features, and coding styles.

## Features

- 🎯 **Framework Support**
  - React
  - Vue.js
  - Next.js
  - Express
  - Node.js
  - Angular
  - Svelte
  - Nuxt.js

- 🛠 **Additional Features**
  - Prettier Integration
  - Import/Export Rules
  - Jest Testing Support
  - Accessibility (A11y) Rules
  - Performance Rules
  - Security Rules

- 💅 **Customizable Style Options**
  - Indentation (spaces/tabs)
  - Quotes (single/double)
  - Semicolons (always/never)
  - Trailing Commas
  - Line Endings
  - Maximum Line Length
  - Bracket Style
  - Array/Object Formatting

## Installation

```bash
npm install -g eslint-config-generator
```

## Usage

### Basic Usage

Simply run the following command in your project directory:

```bash
eslint-config-generator
```

Follow the interactive prompts to configure your ESLint setup.

### Custom Rule Sets

You can create and manage custom rule sets:

1. Create a `.eslint-custom-rules.json` file
2. Add your custom rules:

```json
{
  "name": "MyCustomRules",
  "description": "Custom rules for my project",
  "rules": [
    {
      "name": "no-console",
      "level": "warn"
    },
    {
      "name": "max-len",
      "level": "error",
      "options": [{ "code": 100 }]
    }
  ]
}
```

### Importing Existing Config

You can import an existing ESLint configuration:

```bash
eslint-config-generator --import
```

This will detect and import settings from:
- .eslintrc
- .eslintrc.json
- .eslintrc.js
- .eslintrc.yaml
- .eslintrc.yml

## Configuration Options

### Environments

- Browser
- Node.js
- Both

### Frameworks

- React (with React Hooks rules)
- Vue.js (with Vue 3 recommended rules)
- Next.js (with Next.js specific rules)
- Express (with Node.js recommended rules)
- Node.js (with Node.js recommended rules)
- Angular (with Angular ESLint rules)
- Svelte (with Svelte recommended rules)
- Nuxt.js (with Nuxt.js recommended rules)

### Features

- **Prettier**: Integrates ESLint with Prettier
- **Import**: Adds rules for import/export syntax
- **Jest**: Adds support for Jest testing
- **A11y**: Adds accessibility rules
- **Performance**: Adds performance optimization rules
- **Security**: Adds security-related rules

### Style Options

- **Indent**: 2 spaces, 4 spaces, or tabs
- **Quotes**: Single or double quotes
- **Semicolons**: Required or optional
- **Trailing Commas**: None, ES5, or all
- **Line Endings**: Unix (LF) or Windows (CRLF)
- **Max Line Length**: Customizable character limit
- **Bracket Style**: Same line or new line
- **Array/Object Style**: Single line or multi-line

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 