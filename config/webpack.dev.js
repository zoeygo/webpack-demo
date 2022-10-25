const { merge } = require('webpack-merge')
const common = require('./webpack.common')
module.exports = merge(common, {
  mode: 'development',
  // 开发工具，开启 source map，编译调试
  devtool: 'eval-cheap-module-source-map',
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
  entry: './src/index.js',
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