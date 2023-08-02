// jquery按钮
document.getElementById("check_jquery").addEventListener("click", function () {
    chrome.devtools.inspectedWindow.eval(
        "jQuery.fn.jquery",
        function (result, isException) {
            if (isException) {
                console.log("the page is not using jQuery");
            } else {
                console.log("The page is using jQuery v" + result);
            }
        }
    );
});

// resource按钮
document.getElementById("get_all_resources").addEventListener("click", function () {
    chrome.devtools.inspectedWindow.getResources(function (resources) {
        console.log(resources);
    });
});

// 获取请求体
chrome.devtools.network.onRequestFinished.addListener(res => {
    console.log('请求体:', res);
});