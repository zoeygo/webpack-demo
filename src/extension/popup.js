console.log('1==', window.document.querySelector("#button"), '2==', document.querySelector("#button"));
window.document.querySelector("#button").addEventListener("click", () => {
    const val1 = +document.querySelector("#input1").value || 0;
    const val2 = +document.querySelector("#input2").value || 0;
    // 1.发送一条获取用户信息的命令
    chrome.runtime.sendMessage({ val1, val2 }, (response) => {
        // 4.收到响应信息
        document.querySelector("#ans").innerHTML = response.res;
    });
});