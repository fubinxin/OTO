setCookie('page', '', 1);

//对用户访问该页的计数
$.ajax({
	url: addr + "/getHttpRequest/addRequestRecord",
	type: "post",
	dataType: "json",
	contentType: "application/json",
	data: JSON.stringify({
		"requesturl": "./home.html",
		"requestUser": "admin",
		"requesturlSimple": "Home"
	}),
	success: function (res) {
		// console.log('success');
	},
	error: function (msg) {
		console.log(msg);
	}
})

//轮播图
$.ajax({
	url: url + '/geNews/getHeardTitle?page=1&limit=100',
	data: {},
	dataType: 'json',
	type: 'get',
	success: function (data) {
		 console.log(data,"oopp");
		$('#carouselDiv').empty();
		if (data.count === 0) {
			$('#carouselDiv').append('<div>无图片展示</div>');
		} else if (data.count > 0) {
			//videos,images后缀枚举
			var _img=['.png','.jpg','.gif','.jpeg'],
			_video=['.mp4','.rmvb','.avi','.ts'];
			//avi、wmv、mpeg、mp4、mov、mkv、flv、f4v、m4v、rmvb、rm、3gp、dat、ts、mts、vob；其他视频格式；后期需要可填充到数组_video
			//bmp,jpg,png,tiff,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw,WMF,webp；其他图片格式；后期需要可填充到数组_img
			//轮播
			$('#carouselDiv').append('<div carousel-item id="cItem"></div>');
			for (var i = 0; i < data.count; i++) {
				//图片
				layui.each(_img,function(index,item){
					if ((data.data[i].imgPath).indexOf(item) > 0) {
						$('#carouselDiv #cItem').append(
							'<img class="sliderImg pointer" onclick="window.location.href=\''
							+data.data[i].content + '\'" src="' + data.data[i].imgPath + '" alt="">');
						return;
					}
				})
				//视频
				layui.each(_video,function(index,item){
					if ((data.data[i].imgPath).indexOf(item) > 0) {
						$('#carouselDiv #cItem').append(
							'<video class="sliderImg pointer" onclick="window.location.href=\'' 
							+data.data[i].content + '\'" src="' + data.data[i].imgPath
							+'" alt="" controls="controls"></video>');
						return;
					}
				})
			}
		}

		//轮播图
		layui.use('carousel', function () {
			var carousel = layui.carousel;
			//
			carousel.render({
				elem: '#carouselDiv',
				width: '100%',
				arrow: 'hover'
			})
		});
	}
})

//轮播图下第一行
$.ajax({
	url: url + '/geNews/getModel?page=1&limit=100',
	data: {},
	dataType: 'json',
	type: 'get',
	success: function (data) {
		// console.log(data);
		if (data.count > 0) {
			var listArr = data.data;
			var total = listArr.length;
			var div = '';
			var group = 4; //每组数据
			var r = Math.ceil(total / group); //行数数

			$('.modules').empty();
			for (let i = 0; i < r; i++) {
				div += '<div class="layui-row layui-col-space10">';
				for (let j = i * group; j < (i + 1) * group; j++) {
					if (j === total) {
						break;
					} else {
						div +=
							'<div class="layui-col-xs3 layui-col-sm3 layui-col-md3 layui-col-lg3 module"><img src="' 
							+data.data[j].imgPath + '"><h4>'+data.data[j].title + '</h4><p>' + data.data[j].describe 
							+ '</p><a href="' +data.data[j].content + '">' + data.data[j].guide + '</a><i class = "layui-icon layui-icon-triangle-r" style="color: blue"></i></div>';
					}
				}
				div += '</div>';
			}
			$('.modules').append(div);
		}
	}
})

//轮播图下第二行：热销商品
$.ajax({
	url: url + '/geNews/queryGeNews?page=1&limit=100',//
	data: {},
	dataType: 'json',
	type: 'get',
	success: function (data) {
		// console.log(data);
		if (data.count > 0) {
			var listArr = data.data;
			var total = data.count;
			var div = '';
			var group = 4; //每组数据
			var r = Math.ceil(total / group); //行数数

			$.ajax({
				url: url + '/geCategory/get_category?categoryId=17',//促销类下所有产品
				type: 'get',
				data: {},
				dataType: 'json',
				success: function (cat) {
					// console.log(cat);
					if (cat.status === 200) {
						$('.promotions').empty().append(
							'<h3 ><a href="#HotSale" name="HotSale" id = "Hot_sale">热 销 产 品</a></h3><div class="layui-carousel" id="carouselPdiv"><div carousel-item id="pItem"></div></div>'
						);

						if (cat.data != null) {
							for (let i = 0; i < data.count; i++) {
								for (let j = 0; j < cat.data.length; j++) {
									if (data.data[i].categoryid == cat.data[j].id) {
										var type = cat.data[j].name;
									} else {
										var type = '';
									}
								}
							}
							for (let m = 0; m < r; m++) {
								div += '<div class="p_item"><div class="layui-row layui-col-space10">';
								for (let n = m * group; n < (m + 1) * group; n++) {
									if (n === total) {
										break;
									} else {
										div +=
											'<div class="layui-col-xs3 layui-col-sm3 layui-col-md3 layui-col-lg3 item"><div class="promotion"><img src="' 
											+listArr[n].imgPath + '"><div class="discribtion">	 <h2 style="height:30px;">' + listArr[n].title
											 + '</h2><p style="width:100%;margin:0.15rem 0;font-size:0.13rem;line-height: 0.16rem;height:0.7rem;" >'+ listArr[n].describe 
											 +'<p/><br><a style="" href="' + listArr[n].content + '">去购买</a></div></div></div>';
									}
								}
								div += '</div></div>';
							}
							// $('.promotions #carouselPdiv #pItem').append(div);
							$('.promotions').append(div);

							//轮播图
// 							layui.use('carousel', function () {
// 								var carousel = layui.carousel;
// 								//
// 								var options = {
// 									elem: '#carouselPdiv',
// 									width: '100%',
// 									arrow: 'hover'
// 								};
// 								var ins2 = carousel.render(options);
// 								ins2.reload(options);
// 							});
						}
					}
				}

			})
		}
	}
})
