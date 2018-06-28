var myModal_div = "#myModal-div";
$(function () {
    //存在模态框id则异步加载模态框
    if ($(myModal_div).length > 0) {
        loadMyModal(myModal_div);
        console.log("加载模态框")
    }
});

/* 提示框 */
function alertBox(parent, tip, color) {
    var box = document.createElement("div");
    box.setAttribute("id", "warningTip");
    box.setAttribute("class", "alert alert-" + color + " alert-dismissible");
    box.setAttribute("role", "alert");
    box.innerHTML = "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><spanaria-hidden='true'>&times;</span></button>" + tip;

    $("#warningTip").remove();
    $(parent).children(':first').before(box);
}

//模态框
function showMyModal(title, content, fun) {
    var myModal = $("#myModal");
    myModal.find("#title").text(title);
    myModal.find("#content").text(content);
    myModal.on('hide.bs.modal', fun);
    myModal.modal('show');
}

function loadMyModal(modal_div) {
    $.ajax({
        type: "get",
        url: "html/myModal.html",
        dataType: "text",
        async: true,
        success: function (data) {
            $(modal_div).html(data);
        }
    });
}

//全局Ajax错误处理
$(document).ajaxError(function (event, xhr, options, exc) {
    showMyModal("网络错误！", "服务器响应错误,请检查网络，或联系网站管理员。");

    /*错误信息处理*/
    /*弹出jqXHR对象的信息*/
    console.log(xhr.status);
    console.log(xhr.readyState);
    console.log(xhr.statusText);
    console.log(exc);
});