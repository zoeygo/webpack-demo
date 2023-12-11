const TerserPlugin = require('terser-webpack-plugin') // js压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') // css压缩
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: __dirname + '/../dist',
    // [contenthash:8] - 本应用打包输出文件级别的更新，导致输出文件名变化
    filename: '[name]-[contenthash:8].js',
    // chunkFilename: `[name]-[contenthash:8].js`, // 未配置chunkFilename则按照filename输出文件名？
    // 编译前清除目录
    clean: true,
  },
  // terser-webpack-plugin 默认开启了 parallel: true 配置，并发运行的默认数量： os.cpus().length - 1 ，
  // 配置的 parallel 数量为 4，使用多进程并发运行压缩以提高构建速度。
  optimization: {
    // 通过配置 optimization.runtimeChunk = true，为运行时代码创建一个额外的 chunk，减少 entry chunk 体积，提高性能。
    // runtimeChunk: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: 4,
      }),
    ],
  },
})
