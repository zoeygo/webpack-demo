console.log('content注入sdk');
/**
 * 实现一个可在控制台调试包的插件
 * 放在content.js是因为1.需要调试的场景和页面相关; 2.内容脚本可以读取修改浏览器访问网页的dom
 * 内容脚本与当前页面共享相同的dom，但它们不共享对变量的访问。解决办法：通过脚本标签注入(即content注入sdk.js)
 */

// 将请求到的js文件挂载到body下
function addYarn(src, cb) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = cb;
    document.querySelector("body").append(script);
}

// 挂载
window.yarn = function (str) {
    fetch(`https://api.cdnjs.com/libraries/${str}`)
        .then((res) => res.json())
        .then((res) => {
            if (res.error) {
                console.log(`下载${str}失败====`);
                return;
            }
            console.time("耗时");
            console.log("请稍后，加载中===");
            addYarn(res.latest, () => {
                console.log(`加载完成===${str}, @${res.version}`);
                console.timeEnd("耗时");
            });
        });
}