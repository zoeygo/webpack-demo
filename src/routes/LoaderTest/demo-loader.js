// demo-loader.js
const loaderUtils = require('loader-utils') 
// 接收options配置
module.exports = function(source) {    
    const options = loaderUtils.getOptions(this)    
    source = source.replace(/自定义loader替换测试/g, options.name)    
    return `module.exports = ${JSON.stringify(source)}`    
    // 最终需要返回一段可执行的js脚本
}
