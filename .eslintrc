// http://eslint.org/docs/user-guide/configuring

const config = require('./config')
const jsDocLevel = config.jsdocLevel || 0

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: 'standard',
  plugins: [
    'html',
  ],
  // add your custom rules here
  'rules': {
    // http://eslint.cn/docs/rules/valid-jsdoc
    'valid-jsdoc': [jsDocLevel, {
      // 允许返回标签缺少类型
      requireReturnType: false,
    }],
    'require-jsdoc': [jsDocLevel, {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: true,
      },
    }],
    // http://eslint.cn/docs/rules/
    'no-reserved-keys': [0],
    'no-debugger': [1],
    'no-alert': [1],
    'semi': [2, 'never'],
    'no-console': [1],
    'prefer-const': [1],
    'eol-last': [1],
    'object-shorthand': [1],
    'no-param-reassign': [0],
    'func-names': [0],
    'no-shadow': [1],
    'arrow-body-style': [0],
    'comma-dangle': [1, 'always-multiline'],
    'space-before-function-paren': [1],
    'prefer-template': [1],
    'no-new': [0],
    'consistent-return': [1],
    'quote-props': [1, 'as-needed'],
    'array-bracket-spacing': [1],
    'no-unused-vars': [1, { argsIgnorePattern: '^h|context$' }],
    'computed-property-spacing': [1],
    'max-len': [1],
    'global-require': [0],
    'arrow-parens': [0],
    'linebreak-style': [0],
    'no-plusplus': [0],
    'no-underscore-dangle': [0],
    'new-cap': [1],
    'no-restricted-syntax': [0],
    'class-methods-use-this': [0],
    // https://github.com/benmosher/eslint-plugin-import
    'import/no-extraneous-dependencies': [0],
    'import/no-unresolved': [0],
    'import/prefer-default-export': [0],
    'import/no-dynamic-require': [0],
    'import/imports-first': [0],
    // 明明import后面有空行还是一直提示缺少mmp,后期再研究下
    // 'import/newline-after-import': [1],
    'import/extensions': [0],
  }
}
