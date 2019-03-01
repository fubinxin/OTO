//页面js

//手机号
$('#mobile').attr("maxlength", 11);

//添加
var add = {

    geCertifiedUser: {
        name: "",
        headUrl: "",
        grade: "",
        organization: "",
        entryTime: "",
        //validTime: "",
        area: "",
        mobile: ""
    },
    //初始化
    init: function () {
        $('img.previewImg').parent().css('display', 'none');
    },
    //页面赋值
    setInitData: function (data) {

        $("#name").val("");

        $("#headUrl").val("");

        $("#level").val("");

        $("#organization").val("");

        $("#entryTime").val("");

        //$("#validTime").val("");

        $("#area").val("");

        $("#mobile").val("");

    },
    //确认
    addConfirm: function () {
        add.geCertifiedUser.name = $("#name").val();
        add.geCertifiedUser.headUrl = $("#headUrl").val();
        add.geCertifiedUser.grade = $("#level").val();
        add.geCertifiedUser.organization = $("#organization").val();
        add.geCertifiedUser.entryTime = $("#entryTime").val();
        //add.geCertifiedUser.validTime = $("#validTime").val();
        add.geCertifiedUser.area = $("#province").val() + ' ' + $("#city").val();
        add.geCertifiedUser.mobile = $("#mobile").val();

        $.ajax({
            url: addr + '/geCertifiedUser/addGeCertifiedUser',
            type: "post",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(add.geCertifiedUser),
            success: function (data) {
                console.log('add = ' + data);
                add.closeCurrentLayer();
                parent.layui.table.reload('geCertifiedUserTable');
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

//编辑
var edit = {
    geCertifiedUser: {
        name: "",
        headUrl: "",
        grade: "",
        organization: "",
        entryTime: "",
        //validTime: "",
        area: "",
        mobile: "",
        id: null
    },
    //初始化
    init: function () {
        var id = getQueryString('id');
        $.ajax({
            url: addr + '/geCertifiedUser/getGeCertifiedUser?id=' + id,
            type: "get",
            async: false,
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

        $("#headUrl").val(data.headUrl);

        $('img.previewImg').attr('src', data.headUrl);

        $("#level").val(data.grade);

        $("#organization").val(data.organization);

        $("#entryTime").val(formatDate(data.entryTime));

        //$("#validTime").val(formatDate(data.validTime));

        //省
        $("#province").attr('txt', data.area.split(' ')[0]);

        //市
        $("#city").attr('txt', data.area.split(' ')[1]);

        $("#mobile").val(data.mobile);
    },
    //编辑确认
    editConfirm: function () {
        edit.geCertifiedUser.id = $("#id").val();

        edit.geCertifiedUser.name = $("#name").val();
        edit.geCertifiedUser.headUrl = $("#headUrl").val();
        edit.geCertifiedUser.grade = $("#level").val();
        edit.geCertifiedUser.organization = $("#organization").val();
        edit.geCertifiedUser.entryTime = $("#entryTime").val();
       // edit.geCertifiedUser.validTime = $("#validTime").val();
        edit.geCertifiedUser.area = $("#province").val() + ' ' + $("#city").val();
        edit.geCertifiedUser.mobile = $("#mobile").val();

        $.ajax({
            url: addr + '/geCertifiedUser/updateGeCertifiedUser',
            type: "post",
            async: false,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(edit.geCertifiedUser),
            success: function (data) {
                console.log('update = ' + data);
                edit.closeCurrentLayer();
                parent.layui.table.reload('geCertifiedUserTable');
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
})

layui.use(['form', 'laydate', 'upload', 'layer'], function () {
    var form = layui.form;
    var laydate = layui.laydate;
    var upload = layui.upload;
    var layer = layui.layer;

    //加载省份 加载城市 并 更新渲染
    loadPro();
    $("#province").val($('#province').attr('txt'));
    loadCity($('#province').val());
    $("#city").val($('#city').attr('txt'));
    form.render('select', 'certUserForm');

    //执行一个laydate实例
    //入职时间
    laydate.render({
        elem: '#entryTime' //指定元素
            ,
        type: 'date',
        max: formatDate((new Date()).getTime())
    });
   /* //认证有效时间
    laydate.render({
        elem: '#validTime' //指定元素
            ,
        type: 'date'
    });*/

    //上传图片
    var uploadInst = upload.render({
    	
        elem: '#headUrl' //绑定元素
            ,
        url: addr + '/file/upload' //上传接口
            ,
        accept: 'images',
        field: 'headUrl',
        done: function (res) {
            //上传完毕回调			
            if (res.status === 200) {
                $("#headUrl").val(res.data.url);
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

    form.on('select(province)', function (data) {
        //加载城市
        loadCity(data.value);
        form.render('select', 'certUserForm');
    })
});

function loadPro() {
    //加载地区
    $('#province').empty();
    $.ajax({
        url: addr + "/geCategory/get_category?categoryId=2",
        type: "get",
        dataType: "json",
        async: false,
        success: function (res) {
            if (res.status === 200) {
                if (res.data != null) {
                    $('#province').append('<option value="">--请选择地区--</option>');
                    for (var i = 0; i < res.data.length; i++) {
                        $('#province').append('<option value="' + res.data[i].id +
                            '">' + res.data[i].name +
                            '</option>')
                    }
                } else {
                    $('#province').append('<option>无数据</option>');
                }
            }
        },
        error: function (msg) {
            console.log(msg)
        }
    })
}

function loadCity(_val) {
    //加载市
    $('#city').empty();
    $.ajax({
        url: addr + "/geCategory/get_category?categoryId=" + _val,
        type: "get",
        dataType: "json",
        async: false,
        success: function (res) {
            if (res.status === 200) {
                if (res.data != null) {
                    $('#city').append('<option value="">--请选择城市--</option>');
                    for (var i = 0; i < res.data.length; i++) {
                        $('#city').append('<option value="' + res.data[i].id +
                            '">' + res.data[i].name + '</option>')
                    }
                } else {
                    $('#city').append('<option>无数据</option>');
                }
            }
        },
        error: function (msg) {
            console.log(msg)
        }
    })
}
