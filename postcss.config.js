module.exports = {
    plugins: [
        // 为css内容添加浏览器厂商前缀兼容
        require('autoprefixer'),
        // 压缩css代码
        require('cssnano')({
            preset: 'default',
        }),
    ],
}