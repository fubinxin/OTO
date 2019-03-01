//国际化
i18next.changeLanguage($.cookie('language'));
// 这一段也可以放在 统一的国际化信息里面

i18next.init({
  lng: i18next.lang,
  debug: true,
  resources: {
    en: {
      translation: {
                    "id" : "id",
            
                    "cid" : "cid",
            
                    "pid" : "pid",
            
                    "validTime" : "validTime",
            
                    "createTime" : "createTime",
            
                "add" : "add",
        "edit" : "edit"
	"addConfirm" : "addConfirm",
        "addCancel" : "addCancel"

      }
    },
    ch: {
      translation: {
                    "id" : "主键,自增",
                    "cid" : "认证资质用户ID",
                    "pid" : "认证资质产品id",
                    "validTime" : "有效期时间",
                    "createTime" : "创建时间",
                "add" : "增加",
        "edit" : "编辑",
	"addConfirm":"确认",
        "addCancel" : "取消"
      }
    }
  }
}, function(err, t) {
//	jqueryI18next.init(i18next, $);
  // init set content
  //updateContent();
});
// 这一段也可以放在 统一的国际化信息里面  end 

var settings = {
                 '#id':  i18next.t('id') ,
                 '#cid':  i18next.t('cid') ,
                 '#pid':  i18next.t('pid') ,
                 '#validTime':  i18next.t('validTime') ,
                 '#createTime':  i18next.t('createTime') ,
        	
}
for(var key in settings) {
	$(key).html(settings[key]);
}
//页面js

//添加
var add = {

    geProductCuserRel : {
        
                     
                               cid : "" ,
                               pid : "" ,
                               validTime : "" ,
                               createTime : "" ,
                   

        id : null
    },
    //初始化
    init : function () {
        
    },
    //页面赋值
    setInitData : function (data) {
        debugger;
        $("#id").val("");

                         
                                  $("#cid").val("");
           
                                      $("#pid").val("");
           
                                      $("#validTime").val("");
           
                                      $("#createTime").val("");
           
                    

    },
    //确认
    addConfirm : function () {
        debugger;

        add.geProductCuserRel.id = $("#id").val();
                         
                                  add.geProductCuserRel.cid = $("#cid").val();
                                      add.geProductCuserRel.pid = $("#pid").val();
                                      add.geProductCuserRel.validTime = $("#validTime").val();
                                      add.geProductCuserRel.createTime = $("#createTime").val();
                            
        $.ajax({
            url: addr + '/geProductCuserRel/addGeProductCuserRel',
            type: "post",
            async: false,
            xhrFields: {withCredentials: true},
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data : JSON.stringify(add.geProductCuserRel),
            success: function (data) {
                console.log('add = ' + data);
                 add.closeCurrentLayer();
                debugger;
                parent.location.reload();
            }
        });
    },
    //关闭当前弹框
    closeCurrentLayer : function () {
        //当你在iframe页面关闭自身时
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        parent.layer.close(index); //再执行关闭
    }
};


//删除
var del = {

};

//编辑
var edit = {
    geProductCuserRel : {
        
                     
                               cid : "" ,
                               pid : "" ,
                               validTime : "" ,
                               createTime : "" ,
                   

        id : null
    },
    //初始化
    init : function () {
        var id  = getQueryString('id');
        $.ajax({
            url: addr + '/geProductCuserRel/getGeProductCuserRel?id='+id ,
            type: "get",
            async: false,
            xhrFields: {withCredentials: true},
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                edit.setInitData(data.data);
            }
        });
    },
    //页面赋值
    setInitData : function (data) {
        debugger;
        $("#id").val(data.id);

                         
                                  $("#cid").val(data.cid);
           
                                      $("#pid").val(data.pid);
           
                                      $("#validTime").val(data.validTime);
           
                                      $("#createTime").val(data.createTime);
           
                    

    },
    //编辑确认
    editConfirm : function () {
        debugger;

        edit.geProductCuserRel.id = $("#id").val();
                         
                              edit.geProductCuserRel.cid = $("#cid").val();
                                  edit.geProductCuserRel.pid = $("#pid").val();
                                  edit.geProductCuserRel.validTime = $("#validTime").val();
                                  edit.geProductCuserRel.createTime = $("#createTime").val();
                            
        $.ajax({
            url: addr + '/geProductCuserRel/updateGeProductCuserRel',
            type: "post",
            async: false,
            xhrFields: {withCredentials: true},
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data : JSON.stringify(edit.geProductCuserRel),
            success: function (data) {
                console.log('update = ' + data);
                 edit.closeCurrentLayer();
                parent.layui.table.reload('geProductCuserRelTable');
               
            }
        });
    },
    //关闭当前弹框
    closeCurrentLayer : function () {
        //当你在iframe页面关闭自身时
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        parent.layer.close(index); //再执行关闭
    }
};

$(function () {
    $("#addConfirm").click(function () {
        debugger;
        add.addConfirm();

       
    });

    $("#addCancle").click(function () {
        add.closeCurrentLayer();
    });
    ////

    $("#editConfirm").click(function () {
        debugger;
        edit.editConfirm();

       
        
    });

    $("#editCancle").click(function () {
        edit.closeCurrentLayer();
    });


});


layui.use('form', function(){
    var form = layui.form;

    //自定义验证规则
    //form.verify({
    //    roleName: function(value){
    //        if(value.length < 4){
    //            return '请输入角色';
    //        }
    //    }
    //});

    //监听提交
    form.on('submit(editbtn)', function(data){
        debugger;

        edit.editConfirm();

        return false;

    });

    form.on('submit(addbtn)', function(data){
        debugger;

        add.addConfirm();

        return false;

    });
});

// edit.init();

