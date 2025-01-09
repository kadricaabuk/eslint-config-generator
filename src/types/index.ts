import {
  Environment,
  Framework,
  Feature,
  IndentSize,
  QuoteStyle,
  ConfigFormat,
  SemicolonStyle,
  TrailingCommaStyle,
  LineEndingStyle,
  BracketStyle,
  ArrayStyle,
  ObjectStyle,
  RuleLevel,
  TestConfigType,
  FeatureCombination,
  ConfigValidation
} from './enums';

export {
  Environment,
  Framework,
  Feature,
  IndentSize,
  QuoteStyle,
  ConfigFormat,
  SemicolonStyle,
  TrailingCommaStyle,
  LineEndingStyle,
  BracketStyle,
  ArrayStyle,
  ObjectStyle,
  RuleLevel,
  TestConfigType,
  FeatureCombination,
  ConfigValidation
};

export interface ConfigOptions {
  configFormat: ConfigFormat;
  environment: Environment;
  typescript: boolean;
  framework: Framework;
  features: Feature[];
  style: StyleOptions;
}

export interface StyleOptions {
  indent: IndentSize;
  quotes: QuoteStyle;
  semicolons: SemicolonStyle;
  trailingComma: TrailingCommaStyle;
  lineEnding: LineEndingStyle;
  maxLineLength: number;
}

export interface CustomRule {
  name: string;
  level: RuleLevel;
  options?: any[];
}

export interface CustomRuleSet {
  name: string;
  description: string;
  rules: CustomRule[];
}

export interface CLIOptions {
  version?: boolean;
  help?: boolean;
  interactive?: boolean;
  config?: ConfigOptions;
}

export interface CLIResult {
  success: boolean;
  version?: string;
  content?: string;
  config?: ConfigOptions;
  error?: string;
}