import { jest } from '@jest/globals';
import { 
  ConfigOptions, 
  Environment, 
  Framework, 
  Feature, 
  IndentSize, 
  QuoteStyle, 
  ConfigFormat,
  SemicolonStyle,
  TrailingCommaStyle,
  LineEndingStyle,
  RuleLevel
} from '../types';
import { generateConfig } from '../config/generator';
import { DEFAULT_CONFIG } from '../constants';

describe('generateConfig', () => {
  // Test environment configurations
  describe('environment configuration', () => {
    test('browser environment', () => {
      const options: ConfigOptions = {
        ...DEFAULT_CONFIG,
        environment: Environment.Browser
      };
      const config = generateConfig(options);
      expect(config.env?.browser).toBe(true);
      expect(config.env?.node).toBeUndefined();
    });

    test('node environment', () => {
      const options: ConfigOptions = {
        ...DEFAULT_CONFIG,
        environment: Environment.Node
      };
      const config = generateConfig(options);
      expect(config.env?.node).toBe(true);
      expect(config.env?.browser).toBeUndefined();
    });

    test('both environments', () => {
      const options: ConfigOptions = {
        ...DEFAULT_CONFIG,
        environment: Environment.Both
      };
      const config = generateConfig(options);
      expect(config.env?.browser).toBe(true);
      expect(config.env?.node).toBe(true);
    });
  });

  // Test TypeScript configuration
  describe('typescript configuration', () => {
    test('with typescript enabled', () => {
      const options: ConfigOptions = {
        ...DEFAULT_CONFIG,
        typescript: true
      };
      const config = generateConfig(options);
      expect(config.extends).toContain('plugin:@typescript-eslint/recommended');
      expect(config.parser).toBe('@typescript-eslint/parser');
      expect(config.plugins).toContain('@typescript-eslint');
      expect(config.rules?.['@typescript-eslint/explicit-function-return-type']).toEqual([RuleLevel.Warn]);
      expect(config.rules?.['@typescript-eslint/no-explicit-any']).toEqual([RuleLevel.Warn]);
    });

    test('with typescript disabled', () => {
      const options: ConfigOptions = {
        ...DEFAULT_CONFIG,
        typescript: false
      };
      const config = generateConfig(options);
      expect(config.extends).not.toContain('plugin:@typescript-eslint/recommended');
      expect(config.parser).toBeUndefined();
      expect(config.plugins).toBeUndefined();
    });
  });

  // Test framework configurations
  describe('framework configuration', () => {
    describe('react configuration', () => {
      it('should include react configuration', () => {
        const config = generateConfig({
          ...DEFAULT_CONFIG,
          framework: Framework.React
        });

        expect(config.extends).toContain('plugin:react/recommended');
        expect(config.extends).toContain('plugin:react-hooks/recommended');
        expect(config.plugins).toContain('eslint-plugin-react');
        expect(config.plugins).toContain('eslint-plugin-react-hooks');
        expect((config.settings as { react: { version: string } }).react.version).toBe('detect');
        expect(config.rules?.['react/prop-types']).toEqual([RuleLevel.Off]);
      });
    });

    describe('vue configuration', () => {
      it('should include vue configuration', () => {
        const config = generateConfig({
          ...DEFAULT_CONFIG,
          framework: Framework.Vue
        });

        expect(config.extends).toContain('plugin:vue/vue3-recommended');
        expect(config.parser).toBe('vue-eslint-parser');
        expect(config.plugins).toContain('eslint-plugin-vue');
        expect(config.rules?.['vue/no-unused-components']).toEqual([RuleLevel.Warn]);
        expect(config.rules?.['vue/multi-word-component-names']).toEqual([RuleLevel.Warn]);
      });
    });

    test('next.js configuration', () => {
      const options: ConfigOptions = {
        ...DEFAULT_CONFIG,
        typescript: true,
        framework: Framework.Next
      };
      const config = generateConfig(options);
      expect(config.extends).toContain('next');
      expect(config.extends).toContain('next/core-web-vitals');
    });

    test('express configuration', () => {
      const options: ConfigOptions = {
        ...DEFAULT_CONFIG,
        environment: Environment.Node,
        framework: Framework.Express
      };
      const config = generateConfig(options);
      expect(config.extends).toContain('plugin:node/recommended');
      expect(config.plugins).toContain('node');
      expect(config.rules?.['node/exports-style']).toEqual([RuleLevel.Error, 'module.exports']);
      expect(config.rules?.['node/file-extension-in-import']).toEqual([RuleLevel.Error, 'always']);
    });
  });

  // Test style configurations
  describe('style configuration', () => {
    test('indentation with spaces', () => {
      const options: ConfigOptions = {
        ...DEFAULT_CONFIG,
        style: {
          ...DEFAULT_CONFIG.style,
          indent: IndentSize.Two
        }
      };
      const config = generateConfig(options);
      expect(config.rules?.indent).toEqual(['error', 2]);
    });

    test('indentation with tabs', () => {
      const options: ConfigOptions = {
        ...DEFAULT_CONFIG,
        style: {
          ...DEFAULT_CONFIG.style,
          indent: IndentSize.Tab
        }
      };
      const config = generateConfig(options);
      expect(config.rules?.indent).toEqual(['error', 'tab']);
    });

    test('quotes configuration', () => {
      const options: ConfigOptions = {
        ...DEFAULT_CONFIG,
        style: {
          ...DEFAULT_CONFIG.style,
          quotes: QuoteStyle.Double
        }
      };
      const config = generateConfig(options);
      expect(config.rules?.quotes).toEqual(['error', 'double', { avoidEscape: false }]);
    });

    test('semicolons configuration', () => {
      const options: ConfigOptions = {
        ...DEFAULT_CONFIG,
        style: {
          ...DEFAULT_CONFIG.style,
          semicolons: SemicolonStyle.Never
        }
      };
      const config = generateConfig(options);
      expect(config.rules?.semi).toEqual(['error', 'never']);
    });

    test('trailing comma configuration', () => {
      const options: ConfigOptions = {
        ...DEFAULT_CONFIG,
        style: {
          ...DEFAULT_CONFIG.style,
          trailingComma: TrailingCommaStyle.All
        }
      };
      const config = generateConfig(options);
      expect(config.rules?.['comma-dangle']).toEqual(['error', 'all']);
    });

    test('line ending configuration', () => {
      const options: ConfigOptions = {
        ...DEFAULT_CONFIG,
        style: {
          ...DEFAULT_CONFIG.style,
          lineEnding: LineEndingStyle.Windows
        }
      };
      const config = generateConfig(options);
      expect(config.rules?.['linebreak-style']).toEqual(['error', 'windows']);
    });

    test('max line length configuration', () => {
      const options: ConfigOptions = {
        ...DEFAULT_CONFIG,
        style: {
          ...DEFAULT_CONFIG.style,
          maxLineLength: 100
        }
      };
      const config = generateConfig(options);
      expect(config.rules?.['max-len']).toEqual(['error', { code: 100 }]);
    });
  });
}); 