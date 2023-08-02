// 创建扩展面板
console.log('chrome.devTools===', chrome.devtools);
chrome.devtools.panels.create(
    // 扩展面板显示名称
    "自定义扩展面板",
    // 扩展面板icon
    "icon.png",
    // 扩展面板页面
    "panel.html",
    function (panel) {
        console.log("自定义面板创建成功");
    }
);

// 创建自定义侧边栏
// chrome.devtools.panels.elements.createSidebarPane(
//     "Sidebar",
//     function (sidebar) {
//         sidebar.setPage("sidebar.html");
//     }
// );

// 通过chrome.devtools.panels.elements 在elements标签页下新建sidebar
chrome.devtools.panels.elements.createSidebarPane(
    "Element SideBar Test",
    function (sidebar) {
        sidebar.setExpression('document.querySelectorAll("img")', "All Images");
    }
);

// 通过chrome.devtools.panels.source 在source标签页下新建sidebar
function show_all_timing() {
    return { time: '1111' };
}
chrome.devtools.panels.sources.createSidebarPane(
    "Source SideBar Test",
    function (sidebar) {
        const { time } = show_all_timing() || { time: '2023/8/1' };
        sidebar.setExpression(time.toString(), "运行时间集合");
    }
);