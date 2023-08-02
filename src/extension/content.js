// 修改dom信息
if (document.getElementById("s_top_wrap")) {
    document.getElementById("s_top_wrap").style.background = "white";
}

/**
 * 用户点击插件图标时执行注入脚本，无需刷新页面
 * 在json文件配置为声明式，只会注入一次，需要刷新页面
 * 程序式不需要刷新页面，但可能会注入多次
 * 使用沙盒内的全局变量可以避免content.js重复执行带来的问题
 */
// 没生效，因为chrome.browserAction值为undefined
if (chrome.browserAction) {
    chrome.browserAction.onClicked.addListener(() => {
        chrome.tabs.executeScript({
            file: 'content.js',
        });
    });
}
// chrome.tabs.executeScript(tabs[0].id, {
//     file: 'content.js',
// });

// 向页面注入script
const script = document.createElement('script');
script.src = chrome.runtime.getURL("sdk.js");
document.body.appendChild(script);

// 向页面注入iframe
// const app = document.createElement('iframe');
// app.src = chrome.runtime.getURL("app.html");
// document.body.appendChild(app);

// 消息通信(content->background)
function initializeUI(target) {
    console.log(`得到目标值：${JSON.stringify(target)}, 执行定制化操作`);
}
// 1. 发送一条获取用户信息的命令
chrome.runtime.sendMessage('get-user-data', (response) => {
    // 3. 拿到后方提供的响应信息，进行定制化操作
    console.log('received user data', response);
    initializeUI(response);
});

// 从后台脚本向内容脚本发送请求
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('sender', sender, request);
    sendResponse(request);
    // 修改dom
    document.querySelector("#s-usersetting-top").innerText = '0801';
});