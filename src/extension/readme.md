## 添加扩展相关文档
https://juejin.cn/post/7005598387634438175
https://juejin.cn/post/7114959554709815326#heading-7
https://doc.yilijishu.info/chrome/devtools_panels.html
*** https://www.zhihu.com/tardis/zm/art/438896257?source_id=1003

## manifest.json配置项
"content_script": {
    <!-- 内容脚本 -->
    "run_at": "", --- 控制文件注入时机
}
"background": {
    "service_worker": "background.js" --- v3
    or
    "scripts": ["background.js"],  ---v3不支持
    "persistent": true
},
"permissions": 给插件注册使用权限
<!-- 扩展面板 -->
"devtools_page": ""
options_page: 选项页面

亮点
弹窗拖拽--加入组件库
图形验证--加入组件库
快捷回复--加入组件库
iframe加载完后定位
跨页通信
多tab轮询优化---websocket
富文本目录解析定位
参与过开源项目c7n---脱敏组件


