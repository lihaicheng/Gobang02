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

function showMyModal(title, content, fun) {
    setTimeout(function(){
        var myModal = "'#myModal";
        loadMyModal(myModal);
        $(myModal).find("#title").text(title);
        $(myModal).find("#content").text(content);
        $(myModal).on('hide.bs.modal', fun);
        $(myModal).modal('show');
    },0);
}

function loadMyModal(modal_div) {
	$.ajax({
		type: "get",
		url: "html/myModal.html",
		dataType: "text",
		async: false,
		success: function(data) {
			$(modal_div).html(data);
		}
	});
}

//全局Ajax错误处理
$(document).ajaxError(function(event, xhr, options, exc) {
	/*错误信息处理*/
	/*弹出jqXHR对象的信息*/
	console.log(xhr.status);
	console.log(xhr.readyState);
	console.log(xhr.statusText);
	console.log(exc);
});