layui.use('table', function () {
	var table = layui.table;
	table.render({
		elem: '#config',
		url: url + "/geNews/getAllHeardTitle",
		cellMinWidth: 80,
		cols: [
			[{
					type: 'checkbox'
				}, {
					field: 'title',
					title: '标题'
				}, {
					field: 'describe',
					title: '描述'
				}, {
					field: 'type',
					title: '滚动',
					templet: '#type'
				},
				// {
				//     field:'imgPath',
				//     title:'文件地址'
				// },
				{
					field: 'imgHttpUrl',
					title: '文件',
					templet: '#img',
					event: 'check'
				}, {
					field: 'content',
					title: '链接'
				}, {
					field: 'operating',
					title: '操作',
					templet: '#barDemo'
				}
			]
		],
		page: true
	})


	table.on('tool(config)', function (obj) {
		var data = obj.data;
		if (obj.event === 'check') {
			//videos,images后缀枚举
			var _img = ['.png', '.jpg', '.gif', '.jpeg'],
				_video = ['.mp4', '.rmvb', '.avi', '.ts'];
			//avi、wmv、mpeg、mp4、mov、mkv、flv、f4v、m4v、rmvb、rm、3gp、dat、ts、mts、vob；其他视频格式；后期需要可填充到数组_video
			//bmp,jpg,png,tiff,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw,WMF,webp；其他图片格式；后期需要可填充到数组_img

			//图片
			layui.each(_img, function (index, item) {
				if ((data.imgPath).indexOf(item) > 0) {
					layer.open({
						title: data.title,
						shadeClose: true,
						content: '<img style="width:100%;" src="' + data.imgPath + '" />'
					});
					return;
				}
			})
			//视频
			layui.each(_video, function (index, item) {
				if ((data.imgPath).indexOf(item) > 0) {
					layer.open({
						title: data.title,
						shadeClose: true,
						content: '<video style="width:100%;" src="' + data.imgPath + '" controls="controls"></video>'
					});
					return;
				}
			})

		} else if (obj.event === 'del') {
			layer.confirm("确认删除？", {
				title: "删除确认",
				btn: ["确定", "取消"]
			}, function (index) {
				//调用删除的方法
				var result = del(data.id);
				if (result) {
					obj.del();
				} else {
					layer.msg('删除失败')
				}
				layer.close(index);
			});
		} else if (obj.event === 'edit') {
			//自定页
			layer.open({
				id: "edit",
				type: 2,
				title: '编辑配置',
				closeBtn: 1,
				area: ['400px', '500px'],
				content: './config/editConfig.html?id=' + data.id + '&title=' + data.title + '&describe=' + data.describe +
					'&imgPath=' + data.imgPath + '&settop=' + data.settop + '&content=' + data.content
			});
		}

		//刷新表格:参数为表格ID
		// table.reload('table');
		// layer.close(index);
	});

	$('#btnDelConfig').click(function () {
		var checkStatus = table.checkStatus('config');
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
				layui.table.reload('config');
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
			data: {
				'id': parseInt(id)
			},
			success: function (data) {
				if (data.status == 200) {
					result = true;
					layer.msg("成功");
				}
			}
		});
		return result;
	}
})
$("#btnAddConfig").on("click", function () {
	layui.addConfigData();
});
layui.addConfigData = function () {
	layer.open({
		id: "add",
		type: 2,
		title: '添加',
		closeBtn: 1,
		area: ['400px', '500px'],
		content: './config/addConfig.html'
	});

}
