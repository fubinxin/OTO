//页面js

//添加
var add = {

    geCertifiedProduct: {
        name: "",
        description: "",
        imgurl: "",
        category: ""
    },
    //初始化
    init: function () {
        $('img.previewImg').parent().css('display', 'none');
        intiCategory();
    },
    //页面赋值
    setInitData: function (data) {

        $("#category").val("");

        $("#name").val("");

        $("#description").val("");

        $("#imgurl").val("");

    },
    //确认
    addConfirm: function () {

        add.geCertifiedProduct.category = $("#category").val();
        add.geCertifiedProduct.name = $("#name").val();
        add.geCertifiedProduct.description = $("#description").val();
        add.geCertifiedProduct.imgurl = $("#imgurl").val();

        $.ajax({
            url: addr + '/geCertifiedProduct/addGeCertifiedProduct',
            type: "post",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(add.geCertifiedProduct),
            success: function (data) {
                if (data.status === 200) {
                    // console.log(data)
                    // console.log('add = ' + data);
                    add.closeCurrentLayer();
                    parent.layui.table.reload('geCertifiedProductTable');
                }
                if (data.status === 505) {
                    layui.use('layer', function () {
                        layer.confirm('产品名称重复', {
                            btn: ['确认']
                        })
                    })
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        });
    },
    //关闭当前弹框
    closeCurrentLayer: function () {
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
    geCertifiedProduct: {
        category: "",
        name: "",
        description: "",
        imgurl: "",
        id: null
    },
    //初始化
    init: function () {
        var id = getQueryString('id');
        $.ajax({
            url: addr + '/geCertifiedProduct/getGeCertifiedProduct?id=' + id,
            type: "get",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                edit.setInitData(data.data);
            }
        });
        intiCategory();
    },
    //页面赋值
    setInitData: function (data) {
        $("#id").val(data.id);

        $("#category").val(data.category);

        $("#name").val(data.name);

        $("#description").val(data.description);

        $("#imgurl").val(data.imgurl);

        $('img.previewImg').attr('src', data.imgurl);



    },
    //编辑确认
    editConfirm: function () {

        edit.geCertifiedProduct.id = $("#id").val();

        edit.geCertifiedProduct.category = $("#category").val();
        edit.geCertifiedProduct.name = $("#name").val();
        edit.geCertifiedProduct.description = $("#description").val();
        edit.geCertifiedProduct.imgurl = $("#imgurl").val();

        $.ajax({
            url: addr + '/geCertifiedProduct/updateGeCertifiedProduct',
            type: "post",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(edit.geCertifiedProduct),
            success: function (data) {
                if (data.status === 200) {
                    // console.log('update = ' + data);
                    edit.closeCurrentLayer();
                    parent.layui.table.reload('geCertifiedProductTable');
                }
                if (data.status === 505) {
                    layui.use('layer', function () {
                        layer.confirm('产品名称重复', {
                            btn: ['确认']
                        })
                    })
                }
            }
        });
    },
    //关闭当前弹框
    closeCurrentLayer: function () {
        //当你在iframe页面关闭自身时
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        parent.layer.close(index); //再执行关闭
    }
};

$(function () {

    $("#addCancel").click(function () {
        add.closeCurrentLayer();
    });

    $("#editCancel").click(function () {
        edit.closeCurrentLayer();
    });

});

layui.use(['form', 'upload', 'layer'], function () {
    var form = layui.form;
    var upload = layui.upload;
    var layer = layui.layer;


    //上传图片
    var uploadInst = upload.render({
        elem: '#imgurl' //绑定元素
            ,
        url: addr + '/file/upload' //上传接口
            ,
        accept: 'images',
        field: 'headUrl',
        done: function (res) {
            //上传完毕回调			
            if (res.status === 200) {
                $("#imgurl").val(res.data.url);
                $('img.previewImg').parent().css('display', 'block');
                $('img.previewImg').attr('src', res.data.url);
            } else if (res.status === 505) {
                layer.confirm(res.msg, {
                    btn: '确认'
                })
            }
        },
        error: function (msg) {
            //请求异常回调
            // console.log('error', msg);
            layer.confirm('上传图片失败', {
                btn: '确认'
            })
        }
    });

    //监听提交
    form.on('submit(editbtn)', function (data) {

        edit.editConfirm();

        return false;

    });

    form.on('submit(addbtn)', function (data) {

        add.addConfirm();

        return false;

    });
});

function intiCategory() {
    //产品分类list
    $('#category').empty();
    $('#category').append('<option value="">请选择产品分类</option>');

    $.ajax({
        url: addr + "/geCategory/get_category?categoryId=1",
        type: "get",
        dataType: "json",
        async: false,
        success: function (res) {
            if (res.status === 200) {
                if (res.data != null) {
                    for (var i = 0; i < res.data.length; i++) {
                        $('#category').append('<option value="' + res.data[i].id +
                            '">' + res.data[i].name +
                            '</option>')
                    }
                } else {
                    $('#category').append('<option>无数据</option>');
                }
            }
        },
        error: function (msg) {
            console.log(msg)
        }
    })
}
