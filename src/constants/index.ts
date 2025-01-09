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
  RuleLevel,
  BracketStyle,
  ArrayStyle,
  ObjectStyle
} from '../types/index.js';

export const ENVIRONMENTS: Array<{ name: string; value: Environment }> = [
  { name: 'Browser', value: Environment.Browser },
  { name: 'Node.js', value: Environment.Node },
  { name: 'Both', value: Environment.Both }
];

export const FRAMEWORKS: Array<{ name: string; value: Framework }> = [
  { name: 'React', value: Framework.React },
  { name: 'Vue.js', value: Framework.Vue },
  { name: 'Next.js', value: Framework.Next },
  { name: 'Express', value: Framework.Express },
  { name: 'Node.js (plain)', value: Framework.Node },
  { name: 'Angular', value: Framework.Angular },
  { name: 'Svelte', value: Framework.Svelte },
  { name: 'Nuxt.js', value: Framework.Nuxt },
  { name: 'None (Vanilla JavaScript/TypeScript)', value: Framework.None }
];

export const FEATURES: Array<{ name: string; value: Feature }> = [
  { name: 'Prettier Integration', value: Feature.Prettier },
  { name: 'Import/Export Syntax Rules', value: Feature.Import },
  { name: 'Jest Testing Support', value: Feature.Jest },
  { name: 'Accessibility (A11y) Rules', value: Feature.A11y },
  { name: 'Performance Rules', value: Feature.Performance },
  { name: 'Security Rules', value: Feature.Security }
];

export const INDENT_STYLES: Array<{ name: string; value: IndentSize }> = [
  { name: '2 Spaces', value: IndentSize.Two },
  { name: '4 Spaces', value: IndentSize.Four },
  { name: 'Tab', value: IndentSize.Tab }
];

export const QUOTE_STYLES: Array<{ name: string; value: QuoteStyle }> = [
  { name: 'Single Quotes (\'example\')', value: QuoteStyle.Single },
  { name: 'Double Quotes ("example")', value: QuoteStyle.Double },
  { name: 'Allow Both (prefer single)', value: QuoteStyle.BothSingle },
  { name: 'Allow Both (prefer double)', value: QuoteStyle.BothDouble }
];

export const SEMICOLON_STYLES: Array<{ name: string; value: SemicolonStyle }> = [
  { name: 'Always Required', value: SemicolonStyle.Always },
  { name: 'Never (ASI)', value: SemicolonStyle.Never }
];

export const TRAILING_COMMA_STYLES: Array<{ name: string; value: TrailingCommaStyle }> = [
  { name: 'None', value: TrailingCommaStyle.None },
  { name: 'ES5 Compatible', value: TrailingCommaStyle.ES5 },
  { name: 'All Possible', value: TrailingCommaStyle.All }
];

export const LINE_ENDING_STYLES: Array<{ name: string; value: LineEndingStyle }> = [
  { name: 'Unix (LF)', value: LineEndingStyle.Unix },
  { name: 'Windows (CRLF)', value: LineEndingStyle.Windows }
];

export const BRACKET_STYLES: Array<{ name: string; value: BracketStyle }> = [
  { name: 'Same Line (e.g., if { })', value: BracketStyle.SameLine },
  { name: 'New Line (e.g., if\n{ })', value: BracketStyle.NewLine }
];

export const ARRAY_STYLES: Array<{ name: string; value: ArrayStyle }> = [
  { name: 'Single Line ([1, 2, 3])', value: ArrayStyle.SingleLine },
  { name: 'Multi Line ([\n  1,\n  2,\n  3\n])', value: ArrayStyle.MultiLine }
];

export const OBJECT_STYLES: Array<{ name: string; value: ObjectStyle }> = [
  { name: 'Single Line ({ a: 1, b: 2 })', value: ObjectStyle.SingleLine },
  { name: 'Multi Line ({\n  a: 1,\n  b: 2\n})', value: ObjectStyle.MultiLine }
];

export const DEFAULT_CONFIG = {
  configFormat: ConfigFormat.JSON,
  environment: Environment.Browser,
  typescript: false,
  framework: Framework.None,
  features: [] as Feature[],
  style: {
    indent: IndentSize.Two,
    quotes: QuoteStyle.Single,
    semicolons: SemicolonStyle.Always,
    trailingComma: TrailingCommaStyle.ES5,
    lineEnding: LineEndingStyle.Unix,
    maxLineLength: 80,
    brackets: BracketStyle.SameLine,
    arrays: ArrayStyle.MultiLine,
    objects: ObjectStyle.MultiLine
  }
} as const;

export const CONFIG_FILE_FORMATS = [
  { name: 'JSON (.eslintrc.json)', value: ConfigFormat.JSON },
  { name: 'JavaScript (.eslintrc.js)', value: ConfigFormat.JavaScript }
] as const;

// ESLint plugin packages mapping
export const FRAMEWORK_PACKAGES: Record<Framework, string[]> = {
  [Framework.None]: [],
  [Framework.React]: ['eslint-plugin-react', 'eslint-plugin-react-hooks'],
  [Framework.Vue]: ['eslint-plugin-vue'],
  [Framework.Next]: ['eslint-config-next'],
  [Framework.Express]: ['eslint-plugin-node'],
  [Framework.Node]: ['eslint-plugin-node'],
  [Framework.Angular]: ['@angular-eslint/eslint-plugin'],
  [Framework.Svelte]: ['eslint-plugin-svelte'],
  [Framework.Nuxt]: ['@nuxtjs/eslint-plugin']
};

export const FEATURE_PACKAGES: Record<Feature, string[]> = {
  [Feature.Prettier]: ['eslint-plugin-prettier'],
  [Feature.Import]: ['eslint-plugin-import'],
  [Feature.Jest]: ['eslint-plugin-jest'],
  [Feature.A11y]: ['eslint-plugin-jsx-a11y'],
  [Feature.Performance]: ['eslint-plugin-performance'],
  [Feature.Security]: ['eslint-plugin-security'],
  [Feature.Redux]: ['eslint-plugin-react-redux'],
  [Feature.MobX]: ['eslint-plugin-mobx'],
  [Feature.Pinia]: ['eslint-plugin-vue', '@vue/eslint-config-typescript'],
  [Feature.AirbnbStyle]: ['eslint-config-airbnb', 'eslint-config-airbnb-typescript'],
  [Feature.GoogleStyle]: ['eslint-config-google'],
  [Feature.StandardStyle]: ['eslint-config-standard']
};

// ESLint rule sets
export const BASE_ESLINT_RULES = {
  'no-console': [RuleLevel.Warn],
  'no-debugger': [RuleLevel.Error],
  'no-unused-vars': [RuleLevel.Warn],
  'no-undef': [RuleLevel.Error],
  'no-var': [RuleLevel.Error],
  'prefer-const': [RuleLevel.Warn]
};

export const TYPESCRIPT_ESLINT_RULES = {
  '@typescript-eslint/explicit-function-return-type': [RuleLevel.Warn],
  '@typescript-eslint/no-explicit-any': [RuleLevel.Warn],
  '@typescript-eslint/no-unused-vars': [RuleLevel.Warn]
};

export const REACT_ESLINT_RULES = {
  'react/prop-types': [RuleLevel.Off],
  'react/react-in-jsx-scope': [RuleLevel.Off],
  'react-hooks/rules-of-hooks': [RuleLevel.Error],
  'react-hooks/exhaustive-deps': [RuleLevel.Warn]
};

export const VUE_ESLINT_RULES = {
  'vue/no-unused-components': [RuleLevel.Warn],
  'vue/multi-word-component-names': [RuleLevel.Warn],
  'vue/no-v-html': [RuleLevel.Warn]
};

export const ANGULAR_ESLINT_RULES = {
  '@angular-eslint/component-selector': [RuleLevel.Error],
  '@angular-eslint/directive-selector': [RuleLevel.Error],
  '@angular-eslint/no-empty-lifecycle-method': [RuleLevel.Warn]
};

export const SVELTE_ESLINT_RULES = {
  'svelte/valid-compile': [RuleLevel.Error],
  'svelte/no-unused-svelte-ignore': [RuleLevel.Warn],
  'svelte/html-quotes': [RuleLevel.Warn]
};

export const A11Y_ESLINT_RULES = {
  'jsx-a11y/alt-text': [RuleLevel.Error],
  'jsx-a11y/aria-props': [RuleLevel.Error],
  'jsx-a11y/aria-role': [RuleLevel.Error],
  'vue-a11y/alt-text': [RuleLevel.Error]
};

export const PERFORMANCE_ESLINT_RULES = {
  'performance/no-array-push-push': [RuleLevel.Warn],
  'performance/no-delete': [RuleLevel.Warn],
  'performance/no-global-handle': [RuleLevel.Warn]
};

export const SECURITY_ESLINT_RULES = {
  'security/detect-eval-with-expression': [RuleLevel.Error],
  'security/detect-non-literal-regexp': [RuleLevel.Warn],
  'security/detect-unsafe-regex': [RuleLevel.Error]
};

export const TEST_FRAMEWORK_COMBINATIONS = [
  {
    framework: Framework.React,
    features: [Feature.A11y, Feature.Performance],
    plugins: ['eslint-plugin-react', 'eslint-plugin-react-hooks', 'eslint-plugin-jsx-a11y', 'eslint-plugin-performance'],
    extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:jsx-a11y/recommended', 'plugin:performance/recommended']
  },
  {
    framework: Framework.Vue,
    features: [Feature.Security, Feature.Import],
    plugins: ['eslint-plugin-vue', 'eslint-plugin-security', 'eslint-plugin-import'],
    extends: ['plugin:vue/vue3-recommended', 'plugin:security/recommended', 'plugin:import/errors']
  },
  {
    framework: Framework.Angular,
    features: [Feature.Prettier, Feature.Jest],
    plugins: ['@angular-eslint/eslint-plugin', 'eslint-plugin-prettier', 'eslint-plugin-jest'],
    extends: ['plugin:@angular-eslint/recommended', 'prettier', 'plugin:jest/recommended']
  }
] as const;

export const TEST_CONFIG_FORMATS = [
  {
    format: ConfigFormat.JSON,
    fileName: '.eslintrc.json',
    contentValidation: (content: string) => {
      try {
        JSON.parse(content);
        return true;
      } catch {
        return false;
      }
    }
  },
  {
    format: ConfigFormat.JavaScript,
    fileName: '.eslintrc.js',
    contentValidation: (content: string) => 
      content.startsWith('module.exports =') && content.endsWith(';')
  }
] as const;

export const TEST_ENVIRONMENT_COMBINATIONS = [
  {
    environment: Environment.Browser,
    expectedEnv: { browser: true, node: false }
  },
  {
    environment: Environment.Node,
    expectedEnv: { browser: false, node: true }
  },
  {
    environment: Environment.Both,
    expectedEnv: { browser: true, node: true }
  }
] as const;

export const TEST_STYLE_COMBINATIONS = [
  {
    name: 'Modern Style',
    config: {
      indent: IndentSize.Two,
      quotes: QuoteStyle.Single,
      semicolons: SemicolonStyle.Never,
      trailingComma: TrailingCommaStyle.All,
      lineEnding: LineEndingStyle.Unix,
      maxLineLength: 80,
      brackets: BracketStyle.SameLine,
      arrays: ArrayStyle.MultiLine,
      objects: ObjectStyle.MultiLine
    }
  },
  {
    name: 'Traditional Style',
    config: {
      indent: IndentSize.Four,
      quotes: QuoteStyle.Double,
      semicolons: SemicolonStyle.Always,
      trailingComma: TrailingCommaStyle.None,
      lineEnding: LineEndingStyle.Windows,
      maxLineLength: 100,
      brackets: BracketStyle.NewLine,
      arrays: ArrayStyle.SingleLine,
      objects: ObjectStyle.SingleLine
    }
  }
] as const;