import chalk from 'chalk';

export class ErrorHandler {
  public static handleError(error: Error | unknown, context?: string): void {
    if (error instanceof Error) {
      console.error(chalk.red('Error:'), error.message);
      if (error.stack) {
        console.error(chalk.gray('Stack trace:'), error.stack);
      }
    } else {
      console.error(chalk.red('An unknown error occurred:'), error);
    }

    if (context) {
      console.error(chalk.yellow('Context:'), context);
    }

    console.log(chalk.blue('\nTroubleshooting tips:'));
    console.log('1. Make sure you have the required dependencies installed');
    console.log('2. Check if your ESLint configuration is valid');
    console.log('3. Verify that you have write permissions in the current directory');
    console.log('4. Ensure all required files are accessible\n');
  }

  public static handleValidationError(errors: string[]): void {
    console.error(chalk.red('Validation errors:'));
    errors.forEach(error => {
      console.error(chalk.yellow('- '), error);
    });
  }

  public static handleConfigurationError(configPath: string, error: Error): void {
    console.error(chalk.red('Configuration error:'));
    console.error(chalk.yellow(`Failed to process configuration file: ${configPath}`));
    console.error(chalk.gray('Details:'), error.message);
  }
} 