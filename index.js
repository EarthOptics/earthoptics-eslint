// ℹ️ For anyone modifying this file, be sure to keep it sorted with the array for consistency and
// be sure "never" goes at the bottom as needed, and that any order-specific requirements are
// documented in the comments. Overrides can be done in the "overrides" property.
//
// There may be slight redundancy across some rules, but overall this is working well (07/24/2023).

const PADDING = [
  /* eslint-disable object-curly-newline */
  // Add a new line BEFORE these, except as overriden by "never" and "order matters" rules
  { blankLine: 'always', prev: '*', next: 'function' },
  { blankLine: 'always', prev: '*', next: 'multiline-block-like' },
  { blankLine: 'always', prev: '*', next: 'multiline-const' },
  { blankLine: 'always', prev: '*', next: 'return' },
  { blankLine: 'always', prev: 'if', next: 'expression' },
  { blankLine: 'always', prev: 'let', next: 'const' },
  { blankLine: 'always', prev: 'expression', next: 'const' },
  { blankLine: 'always', prev: 'let', next: 'expression' },
  { blankLine: 'always', prev: 'var', next: 'block-like' },
  // Add a new line AFTER these, except as overriden by "never" and "order matters" rules
  { blankLine: 'always', prev: 'const', next: '*' },
  { blankLine: 'always', prev: 'directive', next: '*' },
  { blankLine: 'always', prev: 'export', next: '*' },
  { blankLine: 'always', prev: 'function', next: '*' },
  { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
  { blankLine: 'always', prev: 'multiline-const', next: '*' },
  { blankLine: 'always', prev: 'multiline-expression', next: '*' },
  // Keep the "never" rules after "always" to ensure overrides
  { blankLine: 'never', prev: '*', next: 'default' },
  { blankLine: 'never', prev: '*', next: 'empty' },
  { blankLine: 'never', prev: 'const', next: 'const' },
  { blankLine: 'never', prev: 'let', next: 'let' },
  { blankLine: 'never', prev: 'var', next: 'var' },
  // More where order matters:
  { blankLine: 'always', prev: 'const', next: 'multiline-const' },
  { blankLine: 'always', prev: 'multiline-const', next: 'const' },
  { blankLine: 'always', prev: 'multiline-expression', next: 'multiline-expression' },
  /* eslint-enable object-curly-newline */
]

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    'jest/globals': true,
  },
  parserOptions: {
    // project: './tsconfig.json', // TODO: not sure about this
    ecmaVersion: 2022, // allows for the parsing of modern ECMAScript features
    sourceType: 'module', // allows for the use of imports
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
  },
  // File- or directory-specific overrides, e.g. your `bin` directory or `*.test.ts` files.
  overrides: [
    {
      // ℹ️ This is a total Jason portal-ui-specific thing. If you don't need to enforce padding
      // between line statements for these scenarios, you can remove this.
      files: [
        'index.ts',
        'config*.ts',
        'types*.ts',
      ],
      rules: {
        'padding-line-between-statements': [
          2,
          ...PADDING,
          {
            blankLine: 'never',
            prev: 'const',
            next: 'const',
          },
          {
            blankLine: 'any',
            prev: 'export',
            next: 'const',
          },
          {
            blankLine: 'any',
            prev: 'export',
            next: 'export',
          },
          {
            blankLine: 'always',
            prev: 'export',
            next: 'multiline-const',
          },
          {
            blankLine: 'always',
            prev: 'const',
            next: 'multiline-const',
          },
          {
            blankLine: 'always',
            prev: 'multiline-const',
            next: 'const',
          },
        ],
      },
    },
  ],
  settings: {
    jest: {
      version: 'latest',
    },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules'], // ℹ️ not sure about this one
        extensions: [
          '.js',
          '.ts',
        ],
      },
    },
  },
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'import',
    'jest',
    'prettier',
    'ext',
    'no-relative-import-paths',
    'jsdoc',
  ],
  // These typically go from least to most specific. Last one wins, but ultimately `rules` wins.
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'plugin:jsdoc/recommended-typescript',
    'prettier', // always last!
  ],
  ignorePatterns: [
    'infrastructure/cdk.out',
    'cdk.out',
    // add any additional file or directory patterns that you want to ignore
  ],
  rules: {
    // This section contains all the ultra-specific rules that are not covered by the configs, or
    // that are covered but we want to override. For consistency, use only the numeric value instead
    // of the word when describing severity: 0 = off | 1 = warn | 2 = error

    // ------------------------------------------------------------------------------------------ \\
    // ****************************  BUILT-IN ESLINT RULES  ************************************* \\
    // ------------------------------------------------------------------------------------------ \\

    // NOTE: some of these may conflict with Prettier (Prettier wins). There is a way to see which
    // rules conflict via CLI, but it didn't seem to be totally accurate so I'm leaving them in.
    'array-bracket-newline': [2, { multiline: true }],
    'array-element-newline': [
      2,
      {
        ArrayExpression: 'consistent',
        ArrayPattern: { minItems: 3 },
      },
    ],
    'arrow-body-style': 0,
    'comma-dangle': [2, 'only-multiline'],
    'comma-spacing': 2,
    'comma-style': [2, 'last'],
    // This one is weird, especially in React `useEffect` cleanups. Try this if having issues:
    // https://stackoverflow.com/a/67658901/1048518
    // 'consistent-return': [2, { treatUndefinedAsUnspecified: false }],
    'consistent-return': 2,
    // "curly": 2, // prettier 😢
    'dot-location': [2, 'property'],
    // "function-paren-newline": [2, { "minItems": 3 }], // prettier 😢
    'max-len': [
      2,
      {
        code: 100,
        tabWidth: 2,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
        ignoreStrings: true,
      },
    ],
    'new-cap': 2,
    'no-console': 1,
    'no-multiple-empty-lines': [
      2,
      {
        max: 1,
        maxEOF: 1,
        maxBOF: 0,
      },
    ],
    // Allow `for..of` loops. // CRED: https://stackoverflow.com/a/42237667/1048518
    'no-restricted-syntax': [
      2,
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-trailing-spaces': 2,
    'no-underscore-dangle': 0,
    'no-whitespace-before-property': 2,
    'object-curly-newline': [
      2,
      {
        ObjectExpression: { consistent: true, minProperties: 3 },
        ImportDeclaration: { multiline: true },
      },
    ],
    'object-curly-spacing': [2, 'always'],
    'object-property-newline': [2, { allowAllPropertiesOnSameLine: true }],
    'one-var-declaration-per-line': [2, 'initializations'],
    'operator-linebreak': [2, 'after'],
    'padded-blocks': [2, 'never'],
    'prefer-template': 2,
    'prefer-destructuring': [2, { object: true, array: false }],
    'quote-props': [2, 'as-needed'],
    'space-before-blocks': 2,
    'space-before-function-paren': [
      2,
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'space-unary-ops': 2,
    'padding-line-between-statements': [2, ...PADDING],
    // ------------------------------------------------------------------------------------------ \\
    // ****************************   RULES FROM PLUGINS   ************************************** \\
    // ------------------------------------------------------------------------------------------ \\
    '@typescript-eslint/consistent-type-imports': [
      2,
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: false,
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      1,
      {
        allowExpressions: true,
      },
    ],
    '@typescript-eslint/naming-convention': [
      2,
      // Allow snake_case, which is super common in destructuring API stuff
      {
        selector: 'variable',
        modifiers: ['destructured'],
        format: null,
      },
    ],
    '@typescript-eslint/no-unused-vars': [1],
    '@typescript-eslint/padding-line-between-statements': [
      2,
      {
        blankLine: 'always',
        prev: ['interface', 'type'],
        next: ['interface', 'type'],
      },
    ],
    '@typescript-eslint/sort-type-constituents': [
      1,
      {
        checkIntersections: false,
      },
    ],
    'ext/lines-between-object-properties': [2, 'never'],
    'import/first': 2,
    'import/newline-after-import': 2,
    'import/no-default-export': 2,
    'import/no-duplicates': 2,
    'import/no-unresolved': 2,
    'import/order': 0, // conflicts with `simple-import-sort/imports`, which handles things fine
    'import/prefer-default-export': 0,
    'jsdoc/require-jsdoc': 0, // waaaay too crazy // "jsdoc"
    'no-relative-import-paths/no-relative-import-paths': [
      2,
      {
        allowSameFolder: true,
        rootDir: '.', // ℹ️ this (and the parent rule) may need to be overridden
      },
    ],
    'prettier/prettier': 2, // show Prettier errors as ESLint errors
    // Don't use these two if using `simple-import-sort/imports`:
    // "import/imports-first": [2, "absolute-first"], // "sort-imports": 2,
    'simple-import-sort/imports': [
      // CRED: for custom grouping 🚀🚀🚀
      // https://github.com/lydell/eslint-plugin-simple-import-sort/blob/main/examples
      2,
      {
        groups: [
          // Node.js builtins. You could also generate this regex if you use a
          // `.js` config. For example:
          // `^(${require("module").builtinModules.join("|")})(/|$)`
          // eslint-disable-next-line prettier/prettier
          ['^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)'],
          // Packages. `react` related packages come first. Leave in so Jason can use 💚
          ['^react', '^@?\\w'],
          // Internal packages.
          ['^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],
  },
}
