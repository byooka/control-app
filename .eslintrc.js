module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/electron',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']], // 这里配置你的别名路径，例如将 '@' 映射到 './src'
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // 这里配置你的文件扩展名，例如支持 .js, .jsx, .ts, .tsx 文件
      },
    },
  },
}
