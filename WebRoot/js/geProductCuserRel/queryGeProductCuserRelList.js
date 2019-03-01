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
layui. addGeProductCuserRelData = function()
{
    debugger;
    //自定页
    layer.open({
        id : "add",
        type: 2,
        title: i18next.t("add"),
        closeBtn : 1,
        area: ['330px', '180px'],
        content: addr + '/view/geProductCuserRel/addGeProductCuserRel.html'
    });

}

/** 简单表格 */
var limits = [10, 20, 30, 40, 50],
	limit = 10;
layui.use('table', function(){
    var table = layui.table;
    // 表格数据初始化
    table.render({
        elem: '#geProductCuserRelTable'
        ,url: addr + "/geProductCuserRel/queryGeProductCuserRel"
        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,cols: [[
             {type:'checkbox'} ///如果不要选择,可以去掉此列

            ,  {field: 'id', title: i18next.t('id')}
                ,  {field: 'cid', title: i18next.t('cid')}
                ,  {field: 'pid', title: i18next.t('pid')}
                ,  {field: 'validTime', title: i18next.t('validTime')}
                ,  {field: 'createTime', title: i18next.t('createTime')}
                   
            ,{field:'operating',
            title: i18next.t('voperating'),
            templet: '#barDemo'}
        ]]
        done: function(res, curr, count) {
			$('.layui-laypage-skip')[0].innerHTML = i18next.t('toPage') + '<input type="text" min="1" value="1" class="layui-input">' + i18next.t('pageTrans') + '<button type="button" class="layui-laypage-btn">' + i18next.t('okBtn') + '</button>';
			$('.layui-laypage-count')[0].innerHTML = i18next.t('total') + count + i18next.t('item');
			var e = ['<span class="layui-laypage-limits"><select lay-ignore>'];
			layui.each(limits, function(t, n) {
				e.push('<option value="' + n + '"' + (n === limit ? "selected" : "") + ">" + n + i18next.t('rowPage') + "</option>")
			}), e.join("") + "</select></span>";
			$('.layui-laypage-limits')[0].innerHTML = e;
		},
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
    table.on('tool(tableFilter)', function(obj){
        //获取数据
        var data = obj.data;
        if(obj.event === 'detail'){
            // open tab detail
        } else if(obj.event === 'del'){
            layer.confirm('真的删除行么', function(index){
                //调用删除的方法
                var result = del(data.id);
                if (result){
                    obj.del();
                } else {
                    layer.msg('delete failure!')
                }
                layer.close(index);
            });
        } else if(obj.event === 'edit'){
            //自定页
            layer.open({
                id : "edit",
                type: 2,
                title: i18next.t("edit") ,
                closeBtn : 1,
                area: ['300px', '500px'],
                content: addr + '/view/geProductCuserRel/editGeProductCuserRel.html?id=' + data.id
            });
        }

        //刷新表格:参数为表格ID
        // table.reload('table');
        // layer.close(index);
    });

    function del(id) {
        var result = false;
        $.ajax(
        {
            url: addr + '/geProductCuserRel/deleteGeProductCuserRel?id='+id,
            type: "post",
            async: false,
            xhrFields: {withCredentials: true},
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.status == 200){
                    result = true;
                }
            }
        });
        return result;
    }
});

