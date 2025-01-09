export enum Environment {
  Browser = 'browser',
  Node = 'node',
  Both = 'both'
}

export enum Framework {
  React = 'react',
  Vue = 'vue',
  Next = 'next',
  Express = 'express',
  Node = 'node',
  Angular = 'angular',
  Svelte = 'svelte',
  Nuxt = 'nuxt',
  None = 'none'
}

export enum Feature {
  Prettier = 'prettier',
  Import = 'import',
  Jest = 'jest',
  A11y = 'a11y',
  Performance = 'performance',
  Security = 'security',
  Redux = 'redux',
  MobX = 'mobx',
  Pinia = 'pinia',
  AirbnbStyle = 'airbnb-style',
  GoogleStyle = 'google-style',
  StandardStyle = 'standard-style'
}

export enum IndentStyle {
  Space = 'space',
  Tab = 'tab'
}

export enum IndentSize {
  Two = 2,
  Four = 4,
  Tab = 'tab'
}

export enum QuoteStyle {
  Single = 'single',
  Double = 'double',
  BothSingle = 'both-single',
  BothDouble = 'both-double'
}

export enum ConfigFormat {
  JSON = 'json',
  JavaScript = 'javascript',
  YAML = 'yaml'
}

export enum SemicolonStyle {
  Always = 'always',
  Never = 'never'
}

export enum TrailingCommaStyle {
  None = 'none',
  All = 'all',
  ES5 = 'es5'
}

export enum LineEndingStyle {
  Unix = 'unix',
  Windows = 'windows'
}

export enum RuleLevel {
  Off = 'off',
  Warn = 'warn',
  Error = 'error'
}

export enum BracketStyle {
  SameLine = 'same-line',
  NewLine = 'new-line'
}

export enum ArrayStyle {
  SingleLine = 'single-line',
  MultiLine = 'multi-line'
}

export enum ObjectStyle {
  SingleLine = 'single-line',
  MultiLine = 'multi-line'
}

export enum TestConfigType {
  Valid = 'valid',
  Invalid = 'invalid',
  Empty = 'empty'
}

export enum FeatureCombination {
  None = 'none',
  Single = 'single',
  Multiple = 'multiple'
}

export enum ConfigValidation {
  Success = 'success',
  Error = 'error',
  Warning = 'warning'
}
