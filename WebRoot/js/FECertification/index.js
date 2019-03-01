setCookie('page', 'feIndex', 1);

//对用户访问该页的计数
$.ajax({
    url: addr + "/getHttpRequest/addRequestRecord",
    type: "post",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({
        "requesturl": "./FECertification/index.html",
        "requestUser": "admin",
        "requesturlSimple": "FE Certification"
    }),
    success: function (res) {
        // console.log('success');
    },
    error: function (msg) {
        console.log(msg)
    }
})

//tab
layui.use(['element'], function () {
    var element = layui.element;

    //获取'通过设备类型查找'tab
    $.ajax({
        url: addr + "/geCategory/get_category?categoryId=1",
        type: "get",
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            // console.log("设备类型：", res);
            $('.srchDeviTabTitle').empty();
            if (res.status === 200) {
                if (res.data != null) {
                    $('.srchDeviTabTitle').append('<li id="' + res.data[0].id +'" class="layui-this" style="font-size: 0.14rem">' +res.data[0].name + '</li>');
                    if (res.data.length > 1) {
                        for (var i = 1; i < res.data.length; i++) {
                            $('.srchDeviTabTitle').append('<li id="' + res.data[i].id + '" style="font-size: 0.14rem">' +res.data[i].name + '</li>')
                        }
                    }

                    element.init();
                }

                //对tab选项卡进行初始化渲染
                var categoryIdD = $('.srchDeviTabTitle li.layui-this').attr('id');
                initDev(categoryIdD);

            }
        },
        error: function (msg) {
            console.log(msg)
        }
    })

    //获取'通过地区查找'tab
    $.ajax({
        url: addr + "/geCategory/get_category?categoryId=2",
        type: "get",
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            // console.log("地区:", res);
            $('.srchRegTabTitle').empty();
            if (res.status === 200) {
                if (res.data != null) {
                    $('.srchRegTabTitle').append('<li id="' + res.data[0].id +'" class="layui-this" style="font-size: 0.14rem">' +res.data[0].name + '</li>');
                    if (res.data.length > 1) {
                        for (var i = 1; i < res.data.length; i++) {
                            $('.srchRegTabTitle').append('<li id="' + res.data[i].id + '" style="font-size: 0.14rem">' + res.data[i].name + '</li>')
                        }
                    }
                    element.init();
                }

                //对tab选项卡进行初始化渲染
                var categoryIdR = $('.srchRegTabTitle li.layui-this').attr('id');
                initR(categoryIdR);
            }
        },
        error: function (msg) {
            console.log(msg)
        }
    })

    //获取'通过设备类型查找'内容 tab监听
    element.on('tab(srchDevi)', function (data) {
        // console.log($(this).attr('id'));

        //获取该tab内容
        var categoryIdD = $(this).attr('id');
        initDev(categoryIdD);
    });

    //获取'通过地区查找'内容 tab监听
    element.on('tab(srchReg)', function (data) {
        // console.log($(this).attr('id'));

        //获取该tab内容
        var categoryIdR = $(this).attr('id');
        initR(categoryIdR);
    })
});

//获取'通过设备类型查找'内容 查询
function initDev(categoryIdD) {
    $.ajax({
        url: addr + "/geCertifiedProduct/getProductByCategory?categoryId=" +
            categoryIdD,
        type: "get",
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            $('.srchDeviTabCont').empty();
            if (res.status === 200) {
                if (res.data.length != 0) {
                    $('.srchDeviTabCont').append(
                        '<div class="layui-tab-item layui-show"><ul><li id="' + res.data[0].id + '"><a href="#"><ul><li><img class="pointer" src="' + res.data[0].imgurl +'" alt="device" /></li><li><span>' + res.data[0].name +'</span></li></ul></a></li></ul></div>');
                    if (res.data.length > 1) {
                        for (var i = 1; i < res.data.length; i++) {
                            $('.srchDeviTabCont>div>ul').append('<li id="' + res.data[i].id +'"><a href="#"><ul><li><img class="pointer" src="' + res.data[i].imgurl +'" alt="device" /></li><li><span>' + res.data[i].name +'</span></li></ul></a></li>')
                        }
                    }
                } else {
                    $('.srchDeviTabCont').append('<span>无数据</span>');
                }

                //点击产品查看认证工程师
                $('.srchDeviTabCont a').click(function () {
                    var _productName = $(this).find("img").parent().next().children().eq(0).text();
                    $("#searchInpMid").val(_productName);
                    setCookie("model", encodeURI(_productName, "utf-8"), 1);
                    $("#searchInpMid").next('span').click();
                })
            }
        },
        error: function (msg) {
            console.log(msg);
        }
    })
}

//获取'通过地区查找'内容 查询
function initR(categoryIdR) {
    $.ajax({
        url: addr + "/geCategory/get_category?categoryId=" + categoryIdR,
        type: "get",
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            $('.srchRegTabCont').empty();
            if (res.status === 200) {
                if (res.data != null) {
                    $('.srchRegTabCont').append(
                        '<div class="layui-tab-item layui-show"><ul><li id="' +res.data[0].id + '"><a href="#">' + res.data[0].name +'</a></li></ul></div>')
                    if (res.data.length > 1) {
                        for (var i = 1; i < res.data.length; i++) {
                            $('.srchRegTabCont>div>ul').append('<li id="' +res.data[i].id + '"><a href="#">' + res.data[i].name +'</a></li>')
                        }
                    }
                } else {
                    $('.srchRegTabCont').append('<span>无数据</span>');
                }

                //点击地区查看认证工程师
                $('.srchRegTabCont>div>ul li').click(function () {
                    var _areaName = $(this).children().eq(0).text();
                    $("#searchInpMid").val(_areaName);
                    setCookie("area", encodeURI(_areaName, "utf-8"), 1);
                    $("#searchInpMid").next('span').click();
                })
            }
        },
        error: function (msg) {
            console.log(msg);
        }
    })
}

//查询资质证
$("#searchInpMid").next('span').on("click", function () {
    var searchStr = $("#searchInpMid").val(),
        data = (searchStr === '' || searchStr === null || searchStr === undefined) ? ('') : ('searchStr=' + searchStr);

    $.ajax({
        url: addr + '/geCertifiedUser/queryVcategoryUserSimple?page=1&limit=9',
        type: "post",
        data: data,
        dataType: "json",
        success: function (res) {
            // console.log(res);
            if (res.status === 200) {
                if (res.data.count > 0) {
                    setCookie("searchStr", encodeURI(searchStr, "utf-8"), 1);
                    setCookie("area", '', 1);
                    setCookie("model", '', 1);
                    $(".content").load("./FECertification/searchHaveData.html");
                } else {
                    setCookie("searchStr", encodeURI(searchStr, "utf-8"), 1);
                    setCookie("area", '', 1);
                    setCookie("model", '', 1);
                    $(".content").load("./FECertification/searchNoData.html");
                }
            }
        },
        error: function (msg) {
            console.log(msg)
        }
    })
})

//回车监听
$("#searchInpMid").on("keydown", function (e) {
    if (e.keyCode === 13) {
        $(this).next().trigger("click");
    }
})
