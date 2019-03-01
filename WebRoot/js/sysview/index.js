	//init
	var _a = decodeURI(getCookie('sysPage'));
	switchMenu(_a);

	//reload
	layui.each($('.menu'), function (index, item) {
		if ($(item).text() === _a) {
			$(item).addClass('layui-this');
			return;
		}
	});

	$('.menu').on('click', function () {
		switchMenu($(this).text());
	})

	//menu
	function switchMenu(_a) {
		switch (_a) {
			default:
				case '配置':
			{
				setCookie('sysPage', encodeURI('配置'), 1);
				$('.curPage').html(_a);
				$('.layui-fluid').load("./config/config.html");
			}
			break;
			case '模块':
				{
					setCookie('sysPage', encodeURI('模块'), 1);
					$('.curPage').html(_a);
					$('.layui-fluid').load('./module/module.html');
				}
				break;
			case '促销':
				{
					setCookie('sysPage', encodeURI('促销'), 1);
					$('.curPage').html(_a);
					$('.layui-fluid').load('./promotion/promotion.html');
				}
				break;
			case '资质产品':
				{
					setCookie('sysPage', encodeURI('资质产品'), 1);
					$('.curPage').html(_a);
					$('.layui-fluid').load("../view/geCertifiedProduct/queryGeCertifiedProductList.html");
				}
				break;
			case '资质':
				{
					setCookie('sysPage', encodeURI('资质'), 1);
					$('.curPage').html(_a);
					$('.layui-fluid').load("../view/geCertifiedUser/queryGeCertifiedUserList.html");
				}
				break;
			case '设备类型分类维护':
				{
					setCookie('sysPage', encodeURI('设备类型分类维护'), 1);
					$('.curPage').html(_a);
					$('.layui-fluid').load("../view/geProductCat/queryGeCertifiedProductList.html");
				}
				break;
			case '促销分类维护':
				{
					setCookie('sysPage', encodeURI('促销分类维护'), 1);
					$('.curPage').html(_a);
					$('.layui-fluid').load("../view/gePromotionCat/queryGeCertifiedProductList.html");
				}
				break;
			case '地区维护':
				{
					setCookie('sysPage', encodeURI('地区维护'), 1);
					$('.curPage').html(_a);
					$('.layui-fluid').load("../view/geDestrict/queryGeCertifiedProductList.html");
				}
				break;
			case '地区地址维护':
				{
					setCookie('sysPage', encodeURI('地区地址维护'), 1);
					$('.curPage').html(_a);
					$('.layui-fluid').load("../view/geProvince/queryGeCertifiedProductList.html");
				}
				break;
			case '访问记录':
				{
					setCookie('sysPage', encodeURI('访问记录'), 1);
					$('.curPage').html(_a);
					$('.layui-fluid').load("../view/geRecord/geRecordList.html");
				}
				break;
		}
	}

	//formatDate
	function formatDate(timeStamp) {
		var day, mon, year, hour, min, sec, time, fullDateTime, formateTime;
		fullDateTime = new Date(timeStamp);
		day = (fullDateTime.getDate()) < 10 ? ('0' + (fullDateTime.getDate())) : (fullDateTime.getDate());
		mon = (fullDateTime.getMonth() + 1) < 10 ? ('0' + (fullDateTime.getMonth() + 1)) : (fullDateTime.getMonth() + 1);
		year = fullDateTime.getFullYear();
		formateTime = year + '-' + mon + '-' + day;
		return formateTime;
	}
