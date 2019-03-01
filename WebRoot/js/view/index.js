//logo click
$('.logoImg').on('click', function () {
	setCookie('page', '', 1);
	window.location.reload();
});

//导航栏
layui.use('element', function () {
	var element = layui.element;

	//
	$('.home').on('click', function () {
		$(".content").load("./home.html");
	});

	$('.nav').on('click', function () {
		var _a = $(this).find('a').text();
		if (_a === '资质证') {
			$('.content').load('./FECertification/FEindex.html');
		}
		if (_a === '商店') {
			//对用户访问该页的计数
			$.ajax({
				url: addr + "/getHttpRequest/addRequestRecord",
				type: "post",
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify({
					"requesturl": "#", //商店跳转链接，客户提供
					"requestUser": "admin",
					"requesturlSimple": "Shop"
				}),
				success: function (res) {
					// console.log('success');
				},
				error: function (msg) {
					console.log(msg);
				}
			})
		}
		if (_a === '培训') {
			//对用户访问该页的计数
			$.ajax({
				url: addr + "/getHttpRequest/addRequestRecord",
				type: "post",
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify({
					"requesturl": "#", //培训跳转链接，客户提供
					"requestUser": "admin",
					"requesturlSimple": "Training"
				}),
				success: function (res) {
					// console.log('success');
				},
				error: function (msg) {
					console.log(msg);
				}
			})
		}
	})

	//刷新页面加载当前页
	var _cookieVal = getCookie('page');
	switch (_cookieVal) {
		case 'feIndex':
			$('.content').load('./FECertification/index.html');
			break;
		case 'feSearchY':
			$(".content").load("./FECertification/searchHaveData.html");
			break;
		case 'feSearchN':
			$(".content").load("./FECertification/searchNoData.html");
			break;
		default:
			$(".content").load("./home.html");
			break;
	}
});

//自适应手机横屏，1rem=100px;
(function (doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			if (clientWidth >= 640) {
				docEl.style.fontSize = '100px';
			} else {
				docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
			}
		};

	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);