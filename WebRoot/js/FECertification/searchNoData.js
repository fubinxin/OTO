setCookie('page', 'feSearchN', 1);//连接//首页$('#_linkF').on('click', function () {    setCookie('page', '', 1);    window.location.reload();})//资质证$('#_linkZ').on('click', function () {    setCookie('page', 'feIndex', 1);    window.location.reload();})//注意：导航 依赖 element 模块，否则无法进行功能性操作layui.use(["element"], function () {    var element = layui.element;})
//初始化搜索$('#re-searchInpMid').val(decodeURI(getCookie('searchStr'), "utf-8"));
var data = '';
$("#re-searchInpMid").next('span').on("click", function () {    var searchStr = $("#re-searchInpMid").val();    data = (searchStr === '' || searchStr === null || searchStr === undefined) ? ('') : ('searchStr=' +searchStr);    $.ajax({        url: addr + '/geCertifiedUser/queryVcategoryUserSimple?page=1&limit=9',        type: "post",        dataType: "json",        data: data,        success: function (res) {            if (res.status === 200) {                if (res.data.count > 0) {                    setCookie("searchStr", encodeURI(searchStr, "utf-8"), 1);                    setCookie("area", '', 1);                    setCookie("model", '', 1);                    $(".content").load("./FECertification/searchHaveData.html");                } else {                    setCookie("searchStr", encodeURI(searchStr, "utf-8"), 1);                    setCookie("area", '', 1);                    setCookie("model", '', 1);                    $(".content").load("./FECertification/searchNoData.html");                }            }        },        error: function (msg) {            console.log(msg)        }    })})
//回车监听$("#re-searchInpMid").on("keydown", function (e) {    if (e.keyCode === 13) {        $(this).next().trigger("click");    }})
//查看所有认证工程师$('#ckAllCertifi').on('click', function () {    $('#re-searchInpMid').val('');    area = '';    model = '';    setCookie("searchStr", '', 1);    setCookie("area", '', 1);    setCookie("model", '', 1);    data = '';    $("#re-searchInpMid").next('span').click();})
//清除筛选条件$('#clearAllCondi').on('click', function () {    $('#re-searchInpMid').val('');    area = '';    model = '';    setCookie("searchStr", '', 1);    setCookie("area", '', 1);    setCookie("model", '', 1);    data = '';    $("#re-searchInpMid").next('span').click();})