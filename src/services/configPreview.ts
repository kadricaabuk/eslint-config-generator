import chalk from 'chalk';
import { ConfigOptions, ConfigFormat } from '../types/index.js';
import yaml from 'js-yaml';

export class ConfigPreview {
  public static previewConfig(config: any, format: ConfigFormat): void {
    console.log(chalk.blue('\nConfiguration Preview:'));
    console.log(chalk.gray('─'.repeat(50)));

    const formattedConfig = this.formatConfig(config, format);
    console.log(formattedConfig);

    console.log(chalk.gray('─'.repeat(50)));
  }

  private static formatConfig(config: any, format: ConfigFormat): string {
    switch (format) {
      case ConfigFormat.JSON:
        return JSON.stringify(config, null, 2);
      case ConfigFormat.JavaScript:
        return `module.exports = ${JSON.stringify(config, null, 2)
          .replace(/"([^"]+)":/g, '$1:')
          .replace(/"/g, '\'')}`;
      case ConfigFormat.YAML:
        return yaml.dump(config);
      default:
        return JSON.stringify(config, null, 2);
    }
  }

  public static showConfigSummary(config: ConfigOptions): void {
    console.log(chalk.blue('\nConfiguration Summary:'));
    console.log(chalk.gray('─'.repeat(50)));

    console.log(chalk.yellow('Environment:'), config.environment);
    console.log(chalk.yellow('TypeScript:'), config.typescript ? 'Yes' : 'No');
    console.log(chalk.yellow('Framework:'), config.framework);
    
    if (config.features.length > 0) {
      console.log(chalk.yellow('Features:'));
      config.features.forEach(feature => {
        console.log(`  - ${feature}`);
      });
    }

    console.log(chalk.yellow('\nStyle Options:'));
    console.log(`  - Indent: ${config.style.indent}`);
    console.log(`  - Quotes: ${config.style.quotes}`);
    console.log(`  - Semicolons: ${config.style.semicolons}`);
    console.log(`  - Max Line Length: ${config.style.maxLineLength}`);

    console.log(chalk.gray('─'.repeat(50)));
  }
} 