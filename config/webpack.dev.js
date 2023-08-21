const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')
module.exports = merge(common, {
  // 指定用哪种模式编译，默认production，会对代码进行压缩混淆。
  mode: 'development',
  // 开发工具，控制生成哪种粒度的source map，编译调试
  // 想要更好调试，就要更好更清晰的source map，但编译速度变慢
  devtool: 'eval-cheap-module-source-map',
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
  // 入口文件从./src/index.js开始编译
  entry: './src/index.js',
  // 编译后的输出文件目录dist/main.js
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    historyApiFallback: true,
    open: true, // 自动打开页面
    // 默认为true
    hot: true,
    // 是否开启代码压缩
    compress: true,
    // 启动的端口
    port: 8080,
    // 指定端口号
    host: 'localhost',
    proxy: {
      // 启用请求代理，可以解决前端跨域请求的问题
      '/api': 'www.baidu.com',
    },
  },
}) 