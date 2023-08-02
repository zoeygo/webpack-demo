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

document.getElementById("get_all_resources").addEventListener("click", function () {
    chrome.devtools.inspectedWindow.getResources(function (resources) {
        console.log(resources);
    });
});