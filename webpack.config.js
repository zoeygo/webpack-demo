const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "[name]-[contenthash:8].js",
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
        mainFiles: ["index", "main"],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: "babel-loader",
            },
            {
                // style-loader会将生成的css添加到html的header标签内形成内敛样式，这显然不是我们想要的。
                // 所以这里我们使用MiniCssExtractPlugin.loader的作用就是拆分生成的css成为独立的css文件。
                test: /\.(sa|sc|le|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                    "postcss-loader",
                    // 当解析antd.less，必须写成下面格式，否则会报Inline JavaScript is not enabled错误
                    { loader: "less-loader", options: { lessOptions: { javascriptEnabled: true } } },
                    {
                        loader: "resolve-url-loader",
                        options: {
                            keepQuery: true,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                type: "asset/inline",
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[hash][ext][query]",
                },
            },
        ],
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "./public/index.html"),
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "assets/[name].css",
        }),
        // 进度条
        new ProgressBarPlugin({
            format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                // 多线程并发运行压缩以提高构建速度
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
        ]
    },
    devServer: {
        // 当使用HTML5 History API时，任意的404响应被替代为index.html
        historyApiFallback: true,
        // 自动打开浏览器
        open: true,
        // 默认为true
        hot: true,
        // 是否开启代码压缩
        compress: true,
        // 启动的端口
        port: 9000,
    },
};