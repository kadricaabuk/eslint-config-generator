import { generateConfig } from '../config/generator';
import { TEST_CASES } from './test-cases';
import { 
  ConfigOptions, 
  QuoteStyle, 
  SemicolonStyle, 
  TrailingCommaStyle, 
  LineEndingStyle, 
  ConfigFormat,
  Environment
} from '../types';
import fs from 'fs/promises';
import path from 'path';
import { run as cli, CLIOptions } from '../cli';

describe('ESLint Config Generator Integration Tests', () => {
  // Phase 1: Basic Functionality Tests
  describe('CLI Basic Tests', () => {
    TEST_CASES.cliBasicTests.cases.forEach(testCase => {
      it(testCase.test, async () => {
        // Simulate CLI commands
        const options: CLIOptions = {
          ...testCase.input,
          config: undefined
        };
        const result = await cli(options);
        expect(result).toEqual(testCase.expectedOutput);
      });
    });
  });

  describe('Config Format Tests', () => {
    TEST_CASES.configFormatTests.cases.forEach(testCase => {
      it(testCase.test, async () => {
        const config = await generateConfig({
          ...testCase.input,
          style: {
            ...testCase.input.style,
            quotes: QuoteStyle.Single,
            semicolons: SemicolonStyle.Always,
            trailingComma: TrailingCommaStyle.ES5,
            lineEnding: LineEndingStyle.Unix
          }
        });
        const filePath = path.join(process.cwd(), testCase.expectedFile);
        
        // Check file contents
        const content = await fs.readFile(filePath, 'utf-8');
        expect(testCase.validateContent(content)).toBe(true);
      });
    });
  });

  describe('Environment Tests', () => {
    TEST_CASES.environmentTests.cases.forEach(testCase => {
      it(testCase.test, async () => {
        const config = await generateConfig({
          ...testCase.input,
          style: {
            ...testCase.input.style,
            quotes: QuoteStyle.Single,
            semicolons: SemicolonStyle.Always,
            trailingComma: TrailingCommaStyle.ES5,
            lineEnding: LineEndingStyle.Unix
          }
        });
        expect(config.env).toEqual(testCase.expectedConfig.env);
      });
    });
  });

  // Phase 2: Framework and Language Support
  describe('TypeScript Integration Tests', () => {
    TEST_CASES.typescriptTests.cases.forEach(testCase => {
      it(testCase.test, async () => {
        const config = await generateConfig({
          ...testCase.input,
          style: {
            ...testCase.input.style,
            quotes: QuoteStyle.Single,
            semicolons: SemicolonStyle.Always,
            trailingComma: TrailingCommaStyle.ES5,
            lineEnding: LineEndingStyle.Unix
          }
        });
        if (testCase.expectedConfig) {
          expect(config).toMatchObject(testCase.expectedConfig);
        }
        if (testCase.expectedRules) {
          expect(config.rules).toMatchObject(testCase.expectedRules);
        }
      });
    });
  });

  describe('Framework Specific Tests', () => {
    TEST_CASES.frameworkTests.cases.forEach(testCase => {
      it(testCase.test, async () => {
        const config = await generateConfig({
          ...testCase.input,
          style: {
            ...testCase.input.style,
            quotes: QuoteStyle.Single,
            semicolons: SemicolonStyle.Always,
            trailingComma: TrailingCommaStyle.ES5,
            lineEnding: LineEndingStyle.Unix
          }
        });
        expect(config).toMatchObject(testCase.expectedConfig);
      });
    });
  });

  // Phase 3: Feature and Style Tests
  describe('Feature Combination Tests', () => {
    TEST_CASES.featureTests.cases.forEach(testCase => {
      it(testCase.test, async () => {
        const config = await generateConfig({
          ...testCase.input,
          style: {
            ...testCase.input.style,
            quotes: QuoteStyle.Single,
            semicolons: SemicolonStyle.Always,
            trailingComma: TrailingCommaStyle.ES5,
            lineEnding: LineEndingStyle.Unix
          }
        });
        expect(config).toMatchObject(testCase.expectedConfig);
      });
    });
  });

  describe('State Management Tests', () => {
    TEST_CASES.stateManagementTests.cases.forEach(testCase => {
      it(testCase.test, async () => {
        const config = await generateConfig({
          ...testCase.input,
          style: {
            ...testCase.input.style,
            quotes: QuoteStyle.Single,
            semicolons: SemicolonStyle.Always,
            trailingComma: TrailingCommaStyle.ES5,
            lineEnding: LineEndingStyle.Unix
          }
        });
        expect(config).toMatchObject(testCase.expectedConfig);
      });
    });
  });

  // Phase 4: Error and Edge Cases
  describe('Error Handling Tests', () => {
    TEST_CASES.errorTests.cases.forEach(testCase => {
      it(testCase.test, async () => {
        if (testCase.expectedError) {
          await expect(generateConfig({
            ...testCase.input,
            style: {
              ...testCase.input.style,
              quotes: QuoteStyle.Single,
              semicolons: SemicolonStyle.Always,
              trailingComma: TrailingCommaStyle.ES5,
              lineEnding: LineEndingStyle.Unix
            }
          })).rejects.toThrow(testCase.expectedError);
        }
        if (testCase.expectedWarning) {
          const spy = jest.spyOn(console, 'warn');
          await generateConfig({
            ...testCase.input,
            style: {
              ...testCase.input.style,
              quotes: QuoteStyle.Single,
              semicolons: SemicolonStyle.Always,
              trailingComma: TrailingCommaStyle.ES5,
              lineEnding: LineEndingStyle.Unix
            }
          });
          expect(spy).toHaveBeenCalledWith(expect.stringContaining(testCase.expectedWarning));
          spy.mockRestore();
        }
      });
    });
  });

  // Phase 5: Integration and Performance
  describe('Preset Integration Tests', () => {
    TEST_CASES.presetTests.cases.forEach(testCase => {
      it(testCase.test, async () => {
        // Convert preset input to full config
        const presetConfig: ConfigOptions = {
          configFormat: ConfigFormat.JSON,
          environment: Environment.Browser,
          typescript: testCase.expectedConfig.typescript || false,
          framework: testCase.expectedConfig.framework,
          features: testCase.expectedConfig.features || [],
          style: {
            indent: 2,
            quotes: QuoteStyle.Single,
            semicolons: SemicolonStyle.Always,
            trailingComma: TrailingCommaStyle.ES5,
            lineEnding: LineEndingStyle.Unix,
            maxLineLength: 80
          }
        };
        const config = await generateConfig(presetConfig);
        expect(config).toMatchObject(testCase.expectedConfig);
      });
    });
  });

  describe('Performance Tests', () => {
    TEST_CASES.performanceTests.cases.forEach(testCase => {
      it(testCase.test, async () => {
        const startTime = Date.now();
        const startMemory = process.memoryUsage().heapUsed;

        await generateConfig({
          ...testCase.input,
          style: {
            ...testCase.input.style,
            quotes: QuoteStyle.Single,
            semicolons: SemicolonStyle.Always,
            trailingComma: TrailingCommaStyle.ES5,
            lineEnding: LineEndingStyle.Unix
          }
        });

        const endTime = Date.now();
        const endMemory = process.memoryUsage().heapUsed;

        const duration = endTime - startTime;
        const memoryUsed = endMemory - startMemory;

        if (testCase.expectedTiming) {
          expect(duration).toBeLessThan(testCase.expectedTiming);
        }
        if (testCase.maxMemoryUsage) {
          expect(memoryUsed).toBeLessThan(testCase.maxMemoryUsage);
        }
      });
    });
  });
}); 