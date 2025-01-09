# ESLint Config Generator

[![CI](https://github.com/kadricaabuk/eslint-config-generator/actions/workflows/ci.yml/badge.svg)](https://github.com/kadricaabuk/eslint-config-generator/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/eslint-config-generator.svg)](https://badge.fury.io/js/eslint-config-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful CLI tool to generate customized ESLint configurations for your JavaScript and TypeScript projects. This tool helps you create optimal ESLint configurations based on your project requirements and coding style preferences.

## Features

- 🚀 Interactive CLI interface
- ✨ Support for JavaScript and TypeScript projects
- 🔧 Customizable coding style preferences
- 📦 Popular framework configurations (React, Vue, Node.js)
- 🎯 Best practices and recommended rules
- 🔄 Easy configuration updates
- 📝 Detailed documentation and examples

## Installation

You can install the package globally using npm:

```bash
npm install -g eslint-config-generator
```

Or use it directly with npx:

```bash
npx eslint-config-generator
```

## Usage

1. Navigate to your project directory:
```bash
cd your-project
```

2. Run the configuration generator:
```bash
eslint-config-generator
```

3. Follow the interactive prompts to configure:
   - Project type (JavaScript/TypeScript)
   - Framework selection
   - Coding style preferences
   - Additional plugins and rules

4. The tool will generate an `.eslintrc.json` file with your selected configurations.

## Configuration Options

### Project Types
- JavaScript (ES5, ES6+)
- TypeScript
- Mixed JavaScript/TypeScript

### Framework Support
- React
- Vue.js
- Node.js
- Express
- Next.js
- Vanilla JavaScript

### Style Customization
- Indentation (spaces/tabs)
- Quotes (single/double)
- Semicolons (always/never)
- Trailing commas
- Max line length
- And more...

## Example Configurations

### Basic JavaScript Project
```json
{
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "es2021": true
  },
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}
```

### TypeScript React Project
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "react"],
  "rules": {
    // Custom rules...
  }
}
```

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/kadricaabuk/eslint-config-generator.git
```

2. Install dependencies:
```bash
cd eslint-config-generator
npm install
```

3. Build the project:
```bash
npm run build
```

4. Run tests:
```bash
npm test
```

## Documentation

For detailed documentation, please visit our [Wiki](https://github.com/kadricaabuk/eslint-config-generator/wiki).

## Security

For security issues, please see our [Security Policy](SECURITY.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📫 Report bugs via [GitHub Issues](https://github.com/kadricaabuk/eslint-config-generator/issues)
- 💡 Request features via [Feature Request](https://github.com/kadricaabuk/eslint-config-generator/issues/new?template=feature_request.md)
- 📖 Read our [Documentation](https://github.com/kadricaabuk/eslint-config-generator/wiki)

## Author

**Kadri Çabuk**
- GitHub: [@kadricaabuk](https://github.com/kadricaabuk)

## Acknowledgments

- ESLint team for their amazing work
- All contributors who have helped improve this project 