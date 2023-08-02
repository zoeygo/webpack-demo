chrome.runtime.onInstalled.addListener(function () {
    console.log('插件已安装');
});

// 好像没生效
chrome.notifications.create(null, {
    type: 'basic',
    iconUrl: 'icon.png',
    title: 'test',
    message: 'chrome extension test',
})

// 消息通信(content->background)
const user = {
    username: 'demo-user'
};
// 监听信息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // sender 用于记录发送方的信息
    // 2. 收到暗号，响应告知用户信息
    if (message === 'get-user-data') {
        sendResponse(user.username);
    }
});

// 从后台脚本向内容脚本发送请求background->content
let count = 0;
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log('tabs[0].id===', tabs[0].id);
    chrome.tabs.sendMessage(tabs[0].id, { number: ++count }, function (response) {
        console.log("background to content,number", response);
    })
});

// popup向background发送消息
const add = (val1, val2) => val1 + val2;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { val1, val2 } = request;
    // 2.收到信息并返回处理后的信息
    sendResponse({ res: add(val1, val2) });
});