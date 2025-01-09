import { ConfigOptions, Environment, Framework, Feature, IndentSize, QuoteStyle, SemicolonStyle, TrailingCommaStyle, LineEndingStyle, ConfigFormat } from '../types/index.js';

export const PRESETS: Record<string, ConfigOptions> = {
  'react-typescript': {
    configFormat: ConfigFormat.JSON,
    environment: Environment.Browser,
    typescript: true,
    framework: Framework.React,
    features: [
      Feature.Prettier,
      Feature.Import,
      Feature.Jest,
      Feature.A11y,
      Feature.Redux,
      Feature.AirbnbStyle
    ],
    style: {
      indent: IndentSize.Two,
      quotes: QuoteStyle.Single,
      semicolons: SemicolonStyle.Always,
      trailingComma: TrailingCommaStyle.ES5,
      lineEnding: LineEndingStyle.Unix,
      maxLineLength: 100
    }
  },
  'react-js': {
    configFormat: ConfigFormat.JSON,
    environment: Environment.Browser,
    typescript: false,
    framework: Framework.React,
    features: [
      Feature.Prettier,
      Feature.Import,
      Feature.Jest,
      Feature.A11y,
      Feature.Redux,
      Feature.AirbnbStyle
    ],
    style: {
      indent: IndentSize.Two,
      quotes: QuoteStyle.Single,
      semicolons: SemicolonStyle.Always,
      trailingComma: TrailingCommaStyle.ES5,
      lineEnding: LineEndingStyle.Unix,
      maxLineLength: 100
    }
  },
  'vue-modern': {
    configFormat: ConfigFormat.JSON,
    environment: Environment.Browser,
    typescript: true,
    framework: Framework.Vue,
    features: [
      Feature.Prettier,
      Feature.Import,
      Feature.Jest,
      Feature.A11y,
      Feature.Pinia,
      Feature.StandardStyle
    ],
    style: {
      indent: IndentSize.Two,
      quotes: QuoteStyle.Single,
      semicolons: SemicolonStyle.Never,
      trailingComma: TrailingCommaStyle.All,
      lineEnding: LineEndingStyle.Unix,
      maxLineLength: 80
    }
  },
  'node-backend': {
    configFormat: ConfigFormat.JSON,
    environment: Environment.Node,
    typescript: true,
    framework: Framework.Node,
    features: [
      Feature.Import,
      Feature.Jest,
      Feature.Security,
      Feature.GoogleStyle
    ],
    style: {
      indent: IndentSize.Two,
      quotes: QuoteStyle.Single,
      semicolons: SemicolonStyle.Always,
      trailingComma: TrailingCommaStyle.ES5,
      lineEnding: LineEndingStyle.Unix,
      maxLineLength: 120
    }
  },
  'next-app': {
    configFormat: ConfigFormat.JSON,
    environment: Environment.Both,
    typescript: true,
    framework: Framework.Next,
    features: [
      Feature.Prettier,
      Feature.Import,
      Feature.Jest,
      Feature.A11y,
      Feature.Performance,
      Feature.Redux,
      Feature.AirbnbStyle
    ],
    style: {
      indent: IndentSize.Two,
      quotes: QuoteStyle.Single,
      semicolons: SemicolonStyle.Always,
      trailingComma: TrailingCommaStyle.All,
      lineEnding: LineEndingStyle.Unix,
      maxLineLength: 100
    }
  }
}; 