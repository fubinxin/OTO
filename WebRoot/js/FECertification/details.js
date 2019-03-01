//工程师详情
//初始化
initDetail();

//获取详情
var _dataMobile = '',
    _downLoadInfo = '';

function initDetail() {
    //获取数据初始化页面
    var _id = window.location.href.split('&')[0].split('?')[1].split('=')[1].slice(0, 3);

    $('.dContent').empty();

    $.ajax({
        url: addr + '/geCertifiedUser/queryProductById?id=' +
            _id,
        type: 'get',
        dataType: 'json',
        success: function (res) {
            // console.log(res);
            if (res.status === 200) {

                layui.each(res.data, function (key, value) {
                    $('.dContent').append(
                        '<div class="layui-row"><div class="layui-col-xs2 layui-col-xs-offset2 layui-col-sm2 layui-col-sm-offset2 layui-col-md1 layui-col-md-offset4 layui-col-lg1 layui-col-lg-offset4">' 
                        + key +'</div><div class="' + key + ' layui-col-xs6 layui-col-sm6 layui-col-md3 layui-col-lg3"></div></div>'
                    )
                    layui.each(value, function (index, item) {
                        if (index === 0) {
                            $("img#profileImg").attr("src", item.headUrl);
                            $("#nameD").text(item.categoryUserName);
                            $("#locationD").text(fn(item.area.split(' ')[1]));
                            $("#corpD").text(item.organiZation);
                            _dataMobile = item.mobile;
                            _downLoadInfo = encodeURI(item.categoryUserName);
                        }
                        $('.' + key).append(
                            '<div class="layui-row"><div class="layui-col-xs6 layui-col-sm6 layui-col-md6 layui-col-lg6">' 
                            +item.productName +'</div><div class="layui-col-xs6 layui-col-sm6 layui-col-md6 layui-col-lg6">' 
                            +formatDate(item.validTime) + '</div></div>')
                    })
                })
            }

        },
        error: function (msg) {
            console.log(msg)
        }
    })

}

//X 关闭
/* $('.btnClose').click(function () {
    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    parent.layer.close(index); //再执行关闭
}) */

//获取联系方式
$('#contactBtn').on('click', function (e) {
    var _id = window.location.href.split('&')[0].split('?')[1].split('=')[1].slice(0, 3);
    layui.use(['layer'], function () {
        var layer = layui.layer;
        layer.open({
            id: 'contactD',
            type: 1,
            title: "",
            closeBtn: 0,
            shadeClose: true,
            area: ['80%'],
            content: '<div class="layui-container"><div class="layui-row">'
            +'<div class="layui-col-xs9 layui-col-sm9 layui-col-md9 layui-col-lg9">'
            +'<h2 style="margin-top: 1em;">联系方式</h2><div class="layui-row">'
            +'<div class="layui-col-xs5 layui-col-sm5 layui-col-md5 layui-col-lg5">'
            +'<span style="width:100%;height:100%;">移动电话</span></div>'
            +'<div class="layui-col-xs7 layui-col-sm7 layui-col-md7 layui-col-lg7">'
            +'<span id="pMobile" style="width:100%;height:100%;">+86 13611111111</span></div></div></div>'
            +'<div class="layui-col-xs3 layui-col-sm3 layui-col-md3 layui-col-lg3">'
            +'<img id="qrCodeImg" style="width:60px;height:60px;margin-top:25px;"/></div></div></div>',
            success: function (layero, index) {
                $('#qrCodeImg').attr('src', addr +
                    '/file/qrCode?httpUrl=' + addr +
                    '/view/FECertification/details_server.html?id=' + _id);

                $('#pMobile').text(_dataMobile);
                $('.layui-layer-content').css({
                    'height': 'auto',
                    'padding': '10px 20px'
                });
                $('.layui-layer-content h2').css({
                    'line-height': '2em'
                });
                $('.layui-container').css({
                    'width': '100%'
                });
            }
        })
    })
})

//download
$('#downloadBtn').on('click', function () {
    //获取详情
    var _id = window.location.href.split('&')[0].split('?')[1].split('=')[1].slice(0, 3);
    $('#downloadBtn').children().eq(0).attr('download', decodeURI(_downLoadInfo));

    var v_httpUrl = encodeURIComponent(addr + '/view/FECertification/details_server.html?id=' + _id);
    var v_downName = encodeURIComponent(decodeURI(_downLoadInfo) + '_' + _id);
    $('#downloadBtn').children().eq(0).attr('href', addr + '/file/pdfConvert?httpUrl='+ v_httpUrl +'&downName=' + v_downName);

})

// 禁用右键菜单、复制、选择
$('.engineerD').bind("contextmenu copy selectstart", function () {
    return false;
});

// 禁用Ctrl+C和Ctrl+V（所有浏览器均支持）
$('.engineerD').keydown(
    function (e) {
        if (e.ctrlKey && (e.keyCode == 65 || e.keyCode == 67)) {
            return false;
        }
    });

//formatDate
function formatDate(timeStamp) {
    var day, mon, year, hour, min, sec, time, fullDateTime, formateTime;
    fullDateTime = new Date(timeStamp);
    day = (fullDateTime.getDate()) < 10 ? ('0' + (fullDateTime.getDate())) : (fullDateTime.getDate()),
        mon = (fullDateTime.getMonth() + 1) < 10 ? ('0' + (fullDateTime.getMonth() + 1)) : (fullDateTime.getMonth() + 1),
        year = fullDateTime.getFullYear();
    formateTime = year + '-' + mon + '-' + day;

    return formateTime;
}

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