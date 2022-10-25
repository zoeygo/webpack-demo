const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css抽离
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin') // 编译进度条

module.exports = {
    resolve: {
        // 配置路径别名
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
        alias: {
            "@": path.resolve(__dirname, '../src'),
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
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                "@babel/preset-env",
                                [
                                    "@babel/preset-react",
                                    {
                                        runtime: 'automatic',
                                    }
                                ],
                                "@babel/preset-typescript",
                            ],
                        },
                    },
                ],
            },
            {
                // style-loader会将生成的css添加到html的header标签内形成内敛样式，这显然不是我们想要的。
                // 所以这里我们使用MiniCssExtractPlugin.loader的作用就是拆分生成的css成为独立的css文件。
                test: /\.(le|c)ss$/,
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
                                localIdentName: "index__[local]__[hash:base64:5]",
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
        ],
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
        new ProgressBarPlugin({
            format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
        }),
    ],
}
