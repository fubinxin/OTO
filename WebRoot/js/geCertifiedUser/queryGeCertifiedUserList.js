//页面js
layui.addGeCertifiedUserData = function () {
    //自定页
    layer.open({
        id: "add",
        type: 2,
        title: "添加",
        closeBtn: 1,
        area: ['450px', '380px'],
        content: addr + '/view/geCertifiedUser/addGeCertifiedUser.html'
    });

}

/** 简单表格 */
var limits = [10, 20, 30, 40, 50],
    limit = 10;
layui.use('table', function () {
    var table = layui.table;
    // 表格数据初始化
    table.render({
        elem: '#geCertifiedUserTable',
        url: addr + "/geCertifiedUser/queryGeCertifiedUser",
        cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            ,
        cols: [
            [{
                    type: 'checkbox'
                } //如果不要选择,可以去掉此列
                , {
                    field: 'name',
                    title: "姓名"
                }, {
                    field: 'grade',
                    title: "等级"
                }, {
                    field: 'organization',
                    title: "所属医院/机构"
                }, {
                    field: 'entryTime',
                    title: "入职时间",
                    templet: "#entryTime"
                }, /*{
                    field: 'validTime',
                    title: "有效时间",
                    templet: '#validTime'
                }*/ {
                    field: 'area',
                    title: "地区和城市",
                    templet: '#areaTemplet'
                }, {
                    field: 'mobile',
                    title: "手机号码"
                }, {
                    field: 'createTime',
                    title: "创建时间",
                    templet: '#createTime'
                }, {
                    field: 'operating',
                    title: '操作',
                    templet: '#barDemo',
                    width: 180
                }
            ]
        ],
        page: {
            layout: ['prev', 'page', 'next', 'skip', 'count', 'limit'],
            groups: 1,
            next: '<span class="layui-icon">&#xe602;</span>',
            prev: '<span class="layui-icon">&#xe603;</span>',
            limits: limits,
            limit: limit
        }
    });

    // 表格监听
    table.on('tool(tableFilter)', function (obj) {
        //获取数据
        var data = obj.data;
        if (obj.event === 'detail') {
            // open tab detail
        } else if (obj.event === 'del') {
            layer.confirm('真的删除行么', function (index) {
                //调用删除的方法
                var result = del(data.id);
                if (result) {
                    obj.del();
                    table.reload('geCertifiedUserTable');
                } else {
                    layer.msg('delete failure!')
                }
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            //自定页
            layer.open({
                id: "edit",
                type: 2,
                title: "编辑",
                closeBtn: 1,
                area: ['450px', '430px'],
                content: addr + '/view/geCertifiedUser/editGeCertifiedUser.html?id=' + data.id
            });
        } else if (obj.event === 'bindP') {
            layer.open({
                id: "bindP",
                type: 2,
                title: "绑定产品",
                closeBtn: 1,
                area: ['500px', '420px'],
                content: addr + '/view/geCertifiedUser/bindGeCertifiedProduct.html?id=' +
                    data.id
            })
        }
    });

    //批量删除
    $('#btnDelGroup').click(function () {
        //checkbox监听
        var ckStatus = table.checkStatus('geCertifiedUserTable'),
            ckdata = ckStatus.data;
        if (ckdata.length) {
            delGroup(ckdata);
        } else {
            layer.confirm('请至少选择一项！', {
                btn: ['确认']
            });
        }
    });

    function delGroup(ckdata) {
        layer.confirm('确认删除？', {
            btn: ['确认']
        }, function (index) {
            for (var i = 0; i < ckdata.length; i++) {
                del(ckdata[i].id);
            }
            table.reload('geCertifiedUserTable');
        })
    }

    //删除单条
    function del(id) {
        var result = false;
        $.ajax({
            url: addr + '/geCertifiedUser/deleteGeCertifiedUser?id=' + id,
            type: "post",
            async: false,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.status == 200) {
                    result = true;
                    layer.msg("成功");
                }
            }
        });
        return result;
    }
});

//地区城市格式化
function fn(_id) {
    var s = '';
    $.ajax({
        url: addr + "/geCategory/queryCategoryById?id=" + _id,
        type: "get",
        dataType: "json",
        async: false,
        success: function (res) {
            if (res.status === 200) {
                s = res.data.name;
            }
        },
        error: function (msg) {
            console.log(msg)
        }
    })
	return s;
}
