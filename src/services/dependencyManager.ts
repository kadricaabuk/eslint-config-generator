import { exec } from 'child_process';
import { promisify } from 'util';
import chalk from 'chalk';
import ora from 'ora';
import { ConfigOptions, Framework, Feature } from '../types/index.js';
import { FRAMEWORK_PACKAGES, FEATURE_PACKAGES } from '../constants/index.js';

const execAsync = promisify(exec);

export class DependencyManager {
  public static getRequiredPackages(config: ConfigOptions): string[] {
    const packages = new Set<string>(['eslint']);

    // TypeScript packages
    if (config.typescript) {
      packages.add('@typescript-eslint/parser');
      packages.add('@typescript-eslint/eslint-plugin');
    }

    // Framework packages
    if (config.framework !== Framework.None) {
      const frameworkPackages = FRAMEWORK_PACKAGES[config.framework];
      frameworkPackages.forEach(pkg => {
        // Handle Next.js package differently
        if (config.framework === Framework.Next) {
          packages.add('eslint-config-next');
        } else {
          packages.add(pkg);
        }
      });
    }

    // Feature packages
    config.features.forEach(feature => {
      FEATURE_PACKAGES[feature].forEach(pkg => packages.add(pkg));
    });

    return Array.from(packages);
  }

  public static async installDependencies(config: ConfigOptions): Promise<void> {
    const packages = this.getRequiredPackages(config);
    const spinner = ora('Installing dependencies...').start();

    try {
      const command = `npm install --save-dev ${packages.join(' ')}`;
      await execAsync(command);
      
      spinner.succeed('Dependencies installed successfully');
      console.log(chalk.green('\nInstalled packages:'));
      packages.forEach(pkg => {
        console.log(chalk.gray(`- ${pkg}`));
      });
    } catch (error) {
      spinner.fail('Failed to install dependencies');
      if (error instanceof Error) {
        console.error(chalk.red('Error:'), error.message);
      }
      
      console.log(chalk.yellow('\nYou can manually install the required packages:'));
      console.log(chalk.gray(`npm install --save-dev ${packages.join(' ')}`));
    }
  }

  public static async checkDependencies(config: ConfigOptions): Promise<boolean> {
    const packages = this.getRequiredPackages(config);
    const spinner = ora('Checking dependencies...').start();

    try {
      for (const pkg of packages) {
        try {
          require.resolve(pkg);
        } catch {
          spinner.warn(`Missing dependency: ${pkg}`);
          return false;
        }
      }
      
      spinner.succeed('All dependencies are installed');
      return true;
    } catch (error) {
      spinner.fail('Failed to check dependencies');
      return false;
    }
  }
}