var add = {

	Promotion: {
        title:'',
		describe:'',
		imgPath:'',
		settop:'',
		type:'1',
		content:'',
		categoryid:''
	},
	//初始化
	init: function() {
		
	},
	//页面赋值
	setInitData: function(data) {
		//debugger;
        $('#title').val('');
		$('#description').val('');
		$('#image').val('');
		$('#setTop').val('');
        $('#link').val('');
        $('#type').val('');
	},
	//确认
	addConfirm: function() {
		//debugger;
		add.Promotion.title = $('#title').val();
		add.Promotion.describe = $('#description').val();
		add.Promotion.imgPath = $('#image').val();
		add.Promotion.settop = $('#setTop').val();
		add.Promotion.content = $('#link').val();
		add.Promotion.categoryid = $('#type').val();
		// console.log(add.Promotion);

		$.ajax({
			url: url + '/geNews/addGeNews',
			type: "post",
			async: false,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify(add.Promotion),
			success: function(data) {
				// console.log('add = ', data);
				add.closeCurrentLayer();
				parent.layui.table.reload('promotion');
			}
		});    
		
	},
	//关闭当前弹框
	closeCurrentLayer: function() {
		//当你在iframe页面关闭自身时
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		parent.layer.close(index); //再执行关闭
	}
};

//删除
var del = {

};

$(function() {
	/*$("#addConfirm").click(function() {
		debugger;
		add.addConfirm();

	});*/

	$("#addPromotionCancel").click(function() {
		add.closeCurrentLayer();
	});

});

layui.use(['form','upload'], function() {
	var form = layui.form;
    var upload = layui.upload;
	//自定义验证规则
	//form.verify({
	//    roleName: function(value){
	//        if(value.length < 4){
	//            return '请输入角色';
	//        }
	//    }
	//}); 
	$.ajax({
		url:url+'/geCategory/get_category?categoryId=17',
		type:'get',
		data:{},
		dataType:'json',
		success:function(data){
			// console.log(data);
			if(data.data.length>0){
				for(let i=0;i<data.data.length;i++){
					$('#type').append('<option value='+data.data[i].id+'>'+data.data[i].name+'</option>');
				}
				form.render('select');
			}
		
		}

	})
	var uploadInst = upload.render({
        elem: '#image' //绑定元素
        ,url: url+'/file/upload' //上传接口
        ,accept:'images',
        field:'headUrl',
        done: function(res){
            //上传完毕回调
            console.log(res);
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
    form.on('submit(addbtn)', function(data) {
	    //console.log($('#image').val());
		add.addConfirm();
		return false;

	});

});
