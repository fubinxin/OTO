/** 简单表格 */
var limits = [10, 20, 30, 40, 50],
	limit = 10;
var requesturlSimple, startDate, endDate, _url;

layui.use(['table', 'laydate'], function () {
	var table = layui.table;
	var laydate = layui.laydate;

	requesturlSimple = getCookie('requesturlSimple');
	startDate = getCookie('startDate');
	endDate = getCookie('endDate');

	_url = (requesturlSimple === undefined || startDate === undefined || endDate === undefined) ? (addr +
		"/getHttpRequest/queryRecord?requesturlSimple=&startDate=&endDate=") : (addr +
		"/getHttpRequest/queryRecord?requesturlSimple=" + requesturlSimple + "&startDate=" + startDate + "&endDate=" +endDate);

	table.render({
		elem: '#geRecordTable',
		url: _url,
		method: 'post',
		cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
		cols: [
			[{
				field: 'REQUESTURL',
				title: '访问资源'
			}, {
				field: 'REMOTEADDR',
				title: '访问IP'
			}, {
				field: 'REQUEST_USER',
				title: '访问用户'
			}, {
				field: 'REQUESTURL_SIMPLE',
				title: '访问模块',
				templet: '#reqSimple'
			}, {
				field: 'CREATE_TIME',
				title: '访问时间',
				templet: '#createTime'
			}]
		],
		page: {
			layout: ['prev', 'page', 'next', 'skip', 'count', 'limit'],
			groups: 1,
			next: '<span class="layui-icon">&#xe602;</span>',
			prev: '<span class="layui-icon">&#xe603;</span>',
			limits: limits,
			limit: limit
		},
		done: function () {
			requesturlSimple = setCookie('requesturlSimple', '', 1);
			startDate = setCookie('startDate', '', 1);
			endDate = setCookie('endDate', '', 1);
		}
	})

	// 表格数据初始化
	$('#module').val(requesturlSimple);
	$('#startDate').val(startDate);
	$('#endDate').val(endDate);

	//时间选择器
	laydate.render({
		elem: '#startDate'
	});
	laydate.render({
		elem: '#endDate'
	});

	//搜索
	$('#search').on('click', function () {
		if ($('#startDate').val() === undefined) {
			$('#startDate').val('')
		}
		if ($('#endDate').val() === undefined) {
			$('#endDate').val('')
		}
		requesturlSimple = setCookie('requesturlSimple', $('#module').val(), 1);
		startDate = setCookie('startDate', $('#startDate').val(), 1);
		endDate = setCookie('endDate', $('#endDate').val(), 1);
		window.location.reload();
	});
});

//formatDate函数
function formatDate(timeStamp) {
	var day, mon, year, hour, min, sec, time, fullDateTime, formateTime;
	fullDateTime = new Date(timeStamp);
	day = (fullDateTime.getDate()) < 10 ? ('0' + (fullDateTime.getDate())) : (fullDateTime.getDate()),
		mon = (fullDateTime.getMonth() + 1) < 10 ? ('0' + (fullDateTime.getMonth() + 1)) : (fullDateTime.getMonth() + 1),
		year = fullDateTime.getFullYear(),
		hour = fullDateTime.getHours() < 10 ? ('0' + fullDateTime.getHours()) :
		fullDateTime.getHours(),
		min = fullDateTime.getMinutes() < 10 ? ('0' + fullDateTime.getMinutes()) : fullDateTime.getMinutes(),
		sec = fullDateTime.getSeconds() < 10 ? ('0' + fullDateTime.getSeconds()) : fullDateTime.getSeconds(),
		time = hour + ':' + min + ':' + sec;
	formateTime = year + '-' + mon + '-' + day + ' ' + time;
	return formateTime;
}
