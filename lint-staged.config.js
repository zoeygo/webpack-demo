module.exports = {
    // 只让进入缓存区的文件做代码校验
    "src/**/*.{js,ts,vue}": [
        "eslint --fix --ext .js,.ts,.vue",
        "prettier --write",
    ],
};