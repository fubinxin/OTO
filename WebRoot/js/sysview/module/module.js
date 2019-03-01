layui.use('table', function() {
    var table = layui.table;
    table.render({
        elem: '#module',
        url: url+"/geNews/getAllModel",
        cellMinWidth: 80
        ,
        cols: [
            [{
                type: 'checkbox'
            }
                , {
                field: 'title',
                title: '标题'
            }, {
                field: 'describe',
                title: '描述'
            },
            {
                field: 'settop',
                title: '首页显示',
                templet: '#settop'
            },
            {
                field:'imgHttpUrl',
                title:'图片',
                templet:'#img',
                event:'check'
            }
            ,{
                field:'content',
                title:'链接'
            }
            ,{
                field:'guide',
                title:'查看链接'
            }
            , {
                field: 'operating',
                title: '操作',
                templet: '#barDemo'
            }
            ]
        ],
        page: true
    })


    table.on('tool(module)', function(obj) {
        var data = obj.data;
        // console.log("data:",data)
        if(obj.event === 'check') {
            layer.open({
              title: data.title,
              area: ['750px', '300px'],
              content: '<img src="'+data.imgPath+'"/>'
            });    
        } else if(obj.event === 'del') {
            layer.confirm("确认删除？", {
                title: "删除确认",
                btn: ["确定", "取消"]
            }, function(index) {
                //调用删除的方法
                var result = del(data.id);
                if(result) {
                    obj.del();
                } else {
                    layer.msg('删除失败')
                }
                layer.close(index);
            });
        } else if(obj.event === 'edit') {
            //自定页
            layer.open({
                id: "edit",
                type: 2,
                title: '编辑配置',
                closeBtn: 1,
                area: ['400px', '500px'],
                content: './module/editModule.html?id=' + data.id + '&title=' + data.title+'&describe='+data.describe+'&imgPath='+data.imgPath+'&settop='+data.settop+'&content='+data.content+'&guide='+data.guide
            });
        }

        //刷新表格:参数为表格ID
        // table.reload('table');
        // layer.close(index);
    });
       
        $('#btnDelModule').click(function() {
            var checkStatus = table.checkStatus('module');
            data = checkStatus.data;
            if (data.length) {
                delGroup(data);
            } else {
                layer.confirm('请至少选择一项！', {
                    btn: ['确认']
                });
            }
            });


    function delGroup(data) {
         layer.confirm('确认删除？', {
            btn: ['确认']
        }, function (index) {
            for (var i = 0; i < data.length; i++) {
                del(data[i].id);
                layui.table.reload('module');
                layer.close(index);
            }
        })
    }
//删除单条
    function del(id) {
        var result = false;
        $.ajax({
            url: url + '/geNews/deleteGeNews',
            type: "get",
            async: false,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: {'id':parseInt(id)},
            success: function(data) {
                if(data.status == 200) {
                    result = true;
                    layer.msg("成功");
                }
            }
        });
        return result;
    }
})
$("#btnAddModule").on("click", function() {
    layui.addModuleData();
});
layui.addModuleData = function() {
    layer.open({
        id: "add",
        type: 2,
        title: '添加',
        closeBtn: 1,
        area: ['400px', '500px'],
        content: './module/addModule.html'
    });

}
