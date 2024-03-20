const { DllPlugin } = require("webpack"); // 动态链接库插件
const path = require('path')
const distPath = path.resolve(__dirname, '../dist');

module.exports = {
  mode: 'development',
  entry: {
    //把react相关模块放到一个单独的动态链接库
    react: ['react', 'react-dom'],
  },
  output: {
    //输出动态链接库的文件名称，[name]代表当前动态链接库的名称
    filename: '[name].dll.js',
    path: distPath,
    //存放动态链接库的全局变量名称，例如对应react来说就是 _dll_react
    //之所以在前面加上_dll_是为了防止全局变量冲突
    library: '_dll_[name]',
  },
  plugins: [
    new DllPlugin({
      //动态链接库的全局变量名称，需要和output.library中保持一致
      //该字段的值也就是输出的manifest.json文件中name字段的值
      name: '_dll_[name]',
      path: path.join(distPath, '[name].manifest.json'),
    }),
  ],
}
