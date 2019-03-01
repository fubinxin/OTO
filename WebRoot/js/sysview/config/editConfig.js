var config = {
	title:'',
	describe:'',
	imgPath:'',
	type:'2',
	id:'',
	settop:'',
    content:''
};

//初始化
function init() {
	
    var id=getQueryString('id');
	var title = getQueryString('title');
	var describe = getQueryString('describe');
	var imgPath = getQueryString('imgPath');
	var settop=getQueryString('settop');
    var content=getQueryString('content')

	//页面赋值
	$("#id").val(id);
    $("#title").val(title);
	$("#description").val(describe);
	$("#image").val(imgPath);
    $('#link').val(content);
    layui.use('form', function() {
		var form = layui.form;
		$("#roll").val(settop);
		form.render('select');
	})
	
}
//编辑确认
function editConfirm() {

	config.id = $("#id").val();
	config.title = $("#title").val();
	config.describe = $("#description").val();
	config.imgPath=$("#image").val();
	config.settop=$("#roll").val();
    config.content=$('#link').val();

	$.ajax({
		url: url + '/geNews/updateGeNews',
		type: "post",
		async: false,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: JSON.stringify(config),
		success: function(res) {
    if(res.status == 200) {
				layer.msg('Edit Success');
				// setTimeout(function() {
				// 	var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
				// 	console.log(index);
				// 	parent.layer.close(index);
				// 	parent.layui.table.reload('config');
				// }, 1000);

			}
			//console.log('update = ', res);
      	 closeCurrentLayer();
		 parent.layui.table.reload('config');

		}
	});
	
}
//关闭当前弹框
function closeCurrentLayer() {
	//当你在iframe页面关闭自身时
	var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(index); //再执行关闭
}

 layui.use(['form','upload'], function() {
	var form = layui.form;
    var upload = layui.upload;
	var uploadInst = upload.render({
        elem: '#image' //绑定元素
        ,url: url+'/file/upload' //上传接口
        ,accept:'file',
        field:'headUrl',
        done: function(res){
            //上传完毕回调
            //console.log(res);
            if(res.status === 200){
                $("#image").val(res.data.url);
            }else if(res.status === 505){
                layer.confirm(res.msg, {
                    btn: '确认'
                })
            }
        },error: function(msg){
            //请求异常回调
             // console.log(msg);
            layer.confirm('上传失败', {
                btn: '确认'
            })
        }
    });
});


$(function() {

	$("#editConfigConfirm").click(function() {
		editConfirm();

	});

	$("#editConfigCancel").click(function() {
		closeCurrentLayer();
	});

});

init();