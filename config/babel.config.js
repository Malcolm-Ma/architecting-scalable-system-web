module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage', // Adds specific imports for polyfills when they are used in each file.
        corejs: 3, // defaults to "2.0"
        targets: {
          chrome: '58',
          ie: '11',
        },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime', // 运行时依赖
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from', // export * from
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-function-bind',
  ],
  // 使用@babel/plugin-transform-runtime同时又在某个commonJS文件里使用这个插件
  // babel会默认这个文件是ES6文件，然后使用import导入了这个插件
  // 产生混淆错误Cannot assign to read only property ‘exports’ of object '#'
  sourceType: 'unambiguous',
};
