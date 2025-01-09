module.exports = {
  configFormat: 'json',
  environment: 'browser',
  typescript: true,
  framework: 'vue',
  features: [
    'prettier',
    'import',
    'jest',
    'a11y',
    'pinia',
    'standard-style'
  ],
  style: {
    indent: 2,
    quotes: 'single',
    semicolons: 'never',
    trailingComma: 'all',
    lineEnding: 'unix',
    maxLineLength: 80
  }
};