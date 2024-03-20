const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css抽离
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin') // 编译进度条
const { DllReferencePlugin } = require('webpack')

// const distPath = path.resolve(__dirname, '../dist')

module.exports = {
  resolve: {
    // 配置路径别名
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    mainFiles: ['index', 'main'],
  },
  module: {
    rules: [
      {
        // test: /\.jsx?$/,
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        // use: 'babel-loader',
        use: [
          // babel主要用来编译成js，编译工具，高版本语法编译成低版本语法。或根据自定义规则转换
          // webpack主要将js和引入的node_modules融合后用babel编译，打包工具]
          // ?cacheDirectory：开启缓存，只要是es6代码没有改动的部分，下次重新构建的时候可以使用缓存，不被重新编译
          {
            loader: 'babel-loader?cacheDirectory',
            options: {
              presets: [
                '@babel/preset-env',
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic',
                  },
                ],
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: false, // 禁用css module，antd.css在css_module下不生效
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: { lessOptions: { javascriptEnabled: true } },
          },
        ],
      },
      {
        // style-loader会将生成的css添加到html的header标签内形成内敛样式，这显然不是我们想要的。
        // 所以这里我们使用MiniCssExtractPlugin.loader的作用就是拆分生成的css成为独立的css文件。
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // 'css-loader',
          {
            loader: 'css-loader',
            options: {
              // modules: true, // 启用css module，加上后import styles from './index.less'写法ok
              modules: {
                // 加上auto: true编译报错
                // 编译后的类名
                localIdentName: 'index__[local]__[hash:base64:5]',
              },
              // esModule: true,
            },
          },
          'postcss-loader',
          // 当解析antd.less，必须写成下面格式，否则会报Inline JavaScript is not enabled错误
          {
            loader: 'less-loader',
            options: { lessOptions: { javascriptEnabled: true } },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
      // 自定义loader测试
      {
        test: /\.txt$/,
        use: [
          {
            loader: 'demo-loader',
            options: {
              name: '自定义loader测试', // 将要变更的通过配置项传入
            },
          },
        ],
      },
    ],
    // 代码中如果有xx.min.js之类的文件，基本已经采用模块化处理过的，无需在对类似文件进行递归解析处理，会引入进项目
    noParse: [/xx\.min\.js$/],
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    // 进度条
    // @ts-ignore
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
    }),
    // new DllReferencePlugin({
    //   //描述react动态链接库的文件内容
    //   // manifest: require(path.join(distPath, 'react.manifest.json')),
    //   manifest: path.resolve(__dirname, '../dist/react.manifest.json'),
    // }),
  ],
}
