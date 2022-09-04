/**
 * @file eslint config
 * @author Mingze Ma
 */

const TS_OVERRIDE = {
  files: ['**/*.ts', '**/*.tsx'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],  // typescript语法检查
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variableLike',
        format: [
          'camelCase',
          'PascalCase',
          'UPPER_CASE',
        ],
        leadingUnderscore: 'allow', // for unused function parameter
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'typeLike',
        format: [
          'camelCase',
          'PascalCase',
          'UPPER_CASE',
        ],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
    ],
    '@typescript-eslint/adjacent-overload-signatures': ['error'],
    '@typescript-eslint/class-literal-property-style': [
      'error',
      'fields',
    ],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'never',
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['off'],
    '@typescript-eslint/explicit-member-accessibility': ['warn'],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'public-static-field',
          'protected-static-field',
          'private-static-field',
          'static-field',
          'public-static-method',
          'protected-static-method',
          'private-static-method',
          'static-method',
          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',
          'public-field',
          'protected-field',
          'private-field',
          'instance-field',
          'field',
          'constructor',
          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
          'public-method',
          'protected-method',
          'private-method',
          'instance-method',
          'method',
        ],
      },
    ],
    '@typescript-eslint/method-signature-style': ['off'],
    '@typescript-eslint/no-empty-interface': ['error'],
    '@typescript-eslint/no-inferrable-types': ['warn'],
    '@typescript-eslint/no-namespace': [
      'error',
      {
        allowDeclarations: true,
        allowDefinitionFiles: true,
      },
    ],
    '@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],
    '@typescript-eslint/no-parameter-properties': ['off'],
    '@typescript-eslint/no-require-imports': ['error'],
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: true,
      },
    ],
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    '@typescript-eslint/no-useless-constructor': ['warn'],
    '@typescript-eslint/prefer-for-of': ['warn'],
    '@typescript-eslint/prefer-function-type': ['warn'],
    '@typescript-eslint/prefer-namespace-keyword': ['error'],
    '@typescript-eslint/prefer-optional-chain': ['error'],
    '@typescript-eslint/triple-slash-reference': [
      'error',
      {
        path: 'never',
        types: 'always',
        lib: 'always',
      },
    ],
    '@typescript-eslint/type-annotation-spacing': ['error'],
    '@typescript-eslint/typedef': [
      'error',
      {
        arrayDestructuring: false,
        arrowParameter: false,
        memberVariableDeclaration: false,
        objectDestructuring: false,
        parameter: false,
        propertyDeclaration: true,
        variableDeclaration: false,
      },
    ],
    '@typescript-eslint/unified-signatures': ['error'],
  },
};

module.exports = {
  env: { // 指定要启用的环境，保证在进行代码检测时不会把这些环境预定义的全局变量识别成未定义的变量而报错
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [ // 数组中每个配置项继承它前面的配置
    "react-app",
    "react-app/jest"
  ],
  settings: {
    react: {
      version: 'detect', // 为eslint-plugin-react 指定 React version. "detect" automatically picks the version you have installed.
    },
  },
  overrides: [TS_OVERRIDE], // 为特定类型的文件指定处理器
  parserOptions: { // 设置语言选项
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react', // react语法检查
    'react-hooks', // hooks语法检查
  ],
  // 配置规则，优先级高于extends的共享规则，配置个别定制化规则
  // "off" 或 0 - 关闭规则
  // "warn" 或 1 - 将规则视为一个警告
  // "error" 或 2 - 将规则视为一个错误
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }], // 强制2格风格
    'no-unused-vars': 'off', // 关掉eslint no-unused-vars
    'import/no-unresolved': 'off',
    'import/order': 'off', // 不需要引入顺序验证
    'max-params': ['warn', 8], // 方法最多8个参数
    'no-use-before-define': ['error', { functions: false, variables: false}], // 方法和变量可以在使用之后定义
    'max-nested-callbacks': ['warn', 4], // 循环最多4层，超过4层警告
    /** code cc */
    'max-len': [ // 单行最长120
      'error',
      {
        code: 120,
        ignoreStrings: true,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'operator-linebreak': ['error', 'before'], // 要求把换行符放在操作符前面
    'no-mixed-operators': [ // 禁止混合使用操作符
      'error',
      {
        allowSamePrecedence: false,
      },
    ],
    /** react */
    'react/jsx-no-undef': 'error', // jsx中禁止使用未声明变量
    'react/jsx-uses-vars': 'error', // 防止在jsx中使用的变量被标记为未使用
    'react/jsx-uses-react': 'error', // 屏蔽'React' is defined but never used错误
    'react-hooks/rules-of-hooks': 'error', // 检查Hook的规则
    'react-hooks/exhaustive-deps': 'warn', // 检查effect的依赖
    'react/jsx-no-bind': [
      'warn',
      {
        allowArrowFunctions: true, // 允许箭头函数，来提升代码可读性
      },
    ],
    'react/require-default-props': 'off', // 组件的非必填属性不要求一定有默认值
    'react/no-find-dom-node': 'off', // 允许使用react-dom的findDOMNode方法
  },
};
