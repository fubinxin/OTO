//页面js

//添加
var add = {

    geCertifiedProduct: {
        name: "",
		parentId:2
    },
    //初始化
    init: function () {
		
    },
    //页面赋值
    setInitData: function (data) {

        $("#name").val("");

    },
    //确认
    addConfirm: function () {

        add.geCertifiedProduct.name = $("#name").val();

        $.ajax({
            url: addr + '/geCategory/add_category',
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
                        layer.confirm('名称重复', {
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
        name: "",
        id: null
    },
    //初始化
    init: function () {
        var id = getQueryString('id');
        $.ajax({
            url: addr + '/geCategory/queryCategoryById?id=' + id,
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
    },
    //页面赋值
    setInitData: function (data) {
        $("#id").val(data.id);

        $("#name").val(data.name);

    },
    //编辑确认
    editConfirm: function () {

        edit.geCertifiedProduct.id = $("#id").val();

        edit.geCertifiedProduct.name = $("#name").val();

        $.ajax({
            url: addr + '/geCategory/update_category',
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
                        layer.confirm('名称重复', {
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

layui.use(['form', 'layer'], function () {
    var form = layui.form;
    var layer = layui.layer;

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
