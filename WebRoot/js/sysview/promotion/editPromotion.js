var promotion = {
	title:'',
	describe:'',
	imgPath:'',
	settop:'',
	id:'',
	type:'1',
	content:'',
	categoryid:''
};

//初始化
function init() {
	
    var id=getQueryString('id');
	var title = getQueryString('title');
	var describe = getQueryString('describe');
	var imgPath = getQueryString('imgPath');
	var settop=getQueryString('settop');
	var content=getQueryString('content');
	// var categoryid=getQueryString('categoryid');

	//页面赋值
	$("#id").val(id);
    $("#title").val(title);
	$("#description").val(describe);
	$("#image").val(imgPath);
	$('#link').val(content);
    layui.use('form', function() {
		var form = layui.form;
		$("#setTop").val(settop);
		// $('#type').val(categoryid);
		form.render('select');
	})
	
}
//编辑确认
function editConfirm() {

	promotion.id = $("#id").val();
	promotion.title = $("#title").val();
	promotion.describe = $("#description").val();
	promotion.imgPath=$("#image").val();
	promotion.settop=$("#setTop").val();
	promotion.content = $('#link').val();
	promotion.categoryid = $('#type').val();

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
		data: JSON.stringify(promotion),
		success: function(res) {
    if(res.status == 200) {
				layer.msg('Edit Success');

			}
			//console.log('update = ', res);
      	 closeCurrentLayer();
		 parent.layui.table.reload('promotion');

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

    $.ajax({
		url:url+'/geCategory/get_category?categoryId=17',
		type:'get',
		data:{},
		dataType:'json',
		success:function(data){
			// console.log(data);
			for(let i=0;i<data.data.length;i++){
				$('#type').append('<option value='+data.data[i].id+'>'+data.data[i].name+'</option>');
			}
			$('#type').val(getQueryString('categoryid'));
			form.render('select');
		}

	})
	var uploadInst = upload.render({
        elem: '#image' //绑定元素
        ,url: url+'/file/upload' //上传接口
        ,accept:'images',
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
            layer.confirm('上传图片失败', {
                btn: '确认'
            })
        }
    });
});

$(function() {

	$("#editPromotionConfirm").click(function() {
		editConfirm();

	});

	$("#editPromotionCancel").click(function() {
		closeCurrentLayer();
	});

});

init();