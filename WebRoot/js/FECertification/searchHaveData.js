setCookie('page', 'feSearchY', 1);

//连接
//首页
$('#_linkF').on('click', function () {
    setCookie('page', '', 1);
    window.location.reload();
})
//资质证
$('#_linkZ').on('click', function () {
    setCookie('page', 'feIndex', 1);
    window.location.reload();
})

//注意：导航 依赖 element 模块，否则无法进行功能性操作
layui.use(["element", "layer", "laypage"], function () {
    var element = layui.element,
        layer = layui.layer;
    var laypage = layui.laypage;

    //初始化搜索框
    $('#re-searchInpMid').val(decodeURI(getCookie('searchStr'), "utf-8"));

    //搜索条件声明
    var searchStr = '',
        area = '',
        model = '',
        url = '',
        data = '',
        page = 1,
        limit = 9;
    // limits = [9, 18, 27, 36, 45];

    //初始化
    initUrl();
    initCertiE();
    pagination(getCookie('count'));

    //初始化url
    function initUrl() {
        searchStr = $('#re-searchInpMid').val();

        data = (searchStr === '' || searchStr === null || searchStr === undefined) ? ("area=" + area +
            '&model=' + model) : ('searchStr=' + searchStr + '&area=' + area + '&model=' + model);
    }

    //渲染认证工程师列表
    function initCertiE() {
        $.ajax({
            url: addr + '/geCertifiedUser/queryVcategoryUserSimple?page=' + page + '&limit=' + limit,
            type: 'post',
            data: data,
            dataType: 'json',
            async: false,
            success: function (res) {
                if (res.status === 200) {
                    var listArr = res.data.pageInfo.list,
                        total = listArr.length,
                        div = '',
                        group = 3, //每组数据
                        r = Math.ceil(total / group); //行数数
                    setCookie('count', res.data.count, 1);

                    //认证产品
                    $('.productLi>div').empty()
                        .append(
                            '<div class="layui-row proIcon">'
                            +'<div class="layui-col-xs12 layui-col-sm12 layui-col-md12 layui-col-lg12">'
                            +'<a href="#"><span class="layui-icon layui-icon-down"></span>'
                            +'<span> 认证的产品</span></a></div></div>'
                        );
                    for (var i = 0; i < res.data.models.length; i++) {
                        $('.productLi>div').append(
                            '<div class="layui-row"><div class="layui-col-xs-offset1 layui-col-xs11 layui-col-sm-offset1 layui-col-sm11 layui-col-md-offset1 layui-col-md11 layui-col-lg-offset1 layui-col-lg11">'
                            +'<a href="#"><input class="product" type="checkbox" name="" title="' +res.data.models[i]
                            + '" lay-skin=""><span> ' + res.data.models[i] +'</span></a></div></div>');
                    }

                    //认证城市
                    $('.cityLi>div').empty()
                        .append(
                            '<div class="layui-row cityIcon"><div class="layui-col-xs12 layui-col-sm12 layui-col-md12 layui-col-lg12">'
                            +'<a href="#"><span class="layui-icon layui-icon-down"></span><span> 地区</span></a></div></div>'
                        );
						var _cc=[];
                    	
                    for (var i = 0; i < res.data.areas.length; i++) {
                    	if(_cc.indexOf((res.data.areas[i]).split(' ')[0])===-1){
                    		_cc.push((res.data.areas[i]).split(' ')[0]);
                    	$('.cityLi>div').append(
                    		'<div class="layui-row">'
                    		+'<div class="layui-col-xs-offset1 layui-col-xs11 layui-col-sm-offset1 layui-col-sm11 layui-col-md-offset1 layui-col-md11 layui-col-lg-offset1 layui-col-lg11">'
                    		+'<a href="#"><input class="city" type="checkbox" name="" title="' 
                    		+(res.data.areas[i]).split(' ')[0] + '" lay-skin=""><span> ' + fn((res.data.areas[i]).split(' ')[0])  
                    		+'</span></a></div></div>');
                    	}
                    }

                    //清空 认证工程师列表
                    $('.certifEngineer').empty();
                    //遍历
                    for (var i = 0; i < r; i++) {
                        div += '<div class="layui-row layui-col-space10">';
                        for (var j = i * group; j < (i + 1) * group; j++) {
                            if (j === total) {
                                break;
                            } else {
                                div +=
                                    '<div class="layui-col-xs4 layui-col-sm4 layui-col-md4 layui-col-lg4">'
                                    +'<div class="layui-row">'
                                    +'<div class="layui-col-xs12 layui-col-sm12 layui-col-md12 layui-col-lg12 pointer">' +
                                    '<div class="layui-row border ' + listArr[j].model + '">' +
                                    '<div class="layui-col-xs12 layui-col-sm12 layui-col-md12 layui-col-lg12">' +
                                    '<span>' + listArr[j].model +
                                    '</span></div></div><div class="layui-row">' +
                                    '<div class="layui-col-xs12 layui-col-sm12 layui-col-md12 layui-col-lg12">' +
                                    '<img id="' + listArr[j].id + '" src="' + listArr[j].headUrl +
                                    '" alt="Profile" /></div></div>' +
                                    '<div class="layui-row">' +
                                    '<div class="layui-col-xs12 layui-col-sm12 layui-col-md12 layui-col-lg12">' +
                                    '<span>' + listArr[j].categoryUserName +
                                    '</span></div></div><div class="layui-row">' +
                                    '<div class="layui-col-xs12 layui-col-sm12 layui-col-md12 layui-col-lg12">' +
                                    '<span>' + fn(listArr[j].area.split(' ')[1]) + '<br/>' + listArr[j].organiZation +
                                    '</span></div></div></div></div></div>';
                            }
                        }
                        div += '</div>';
                    }
                    $('.certifEngineer').append(div);

                    //checkbox监听
                    $('input[type="checkbox"]').on("click", function (e) {
                        if ($(this).is(':checked')) {
                            if ($(this).attr('class') === 'product') {
                                if (model === '') {
                                    model = $(this).attr('title');
                                    // area = '';
                                    setCookie("model", encodeURI(model, "utf-8"), 1);
                                    // setCookie("area", '', 1);
                                } else {
                                    model += ',' + $(this).attr('title');
                                    setCookie("model", encodeURI(model, "utf-8"), 1);
                                }
                            } else if ($(this).attr('class') === 'city') {
                                if (area === '') {
                                    area = $(this).attr('title');
                                    // model = '';
                                    setCookie("area", encodeURI(area, "utf-8"), 1);
                                    // setCookie("model", '', 1);
                                } else {
                                    area += ',' + $(this).attr('title');
                                    setCookie("area", encodeURI(area, "utf-8"), 1);
                                }
                            }
                        } else {
                            if ($(this).attr('class') === 'product') {
                                var arr = [];
                                arr = decodeURI(getCookie('model')).split(',');
                                var _a = $.inArray($(this).attr('title'), arr);
                                arr.splice(_a, 1);
                                model = arr.join(',');
                                setCookie("model", encodeURI(model), 1);
                            }
                            if ($(this).attr('class') === 'city') {
                                var arr = [];
                                arr = decodeURI(getCookie('area')).split(',');
                                var _a = $.inArray($(this).attr('title'), arr);
                                arr.splice(_a, 1);
                                area = arr.join(',');
                                setCookie("area", encodeURI(area), 1);
                            }
                        }

                        initUrl();
                        initCertiE();
                        pagination(getCookie('count'));
                    })

                    //checkbox checked
                    ckBox(decodeURI(getCookie('model'), 'utf-8'), '.productLi');
                    ckBox(decodeURI(getCookie('area'), 'utf-8'), '.cityLi');

                    //icon down 监听
                    iconEvent('.proIcon');
                    iconEvent('.cityIcon');

                    //个人详情
                    $('.certifEngineer img').click(function (e) {
                        var _id = $(this).attr('id'); //工程师ID
                        $.ajax({
                            url: addr + '/geCertifiedUser/queryProductById?id=' +
                                _id,
                            type: 'get',
                            dataType: 'json',
                            success: function (res) {
                                if (res.status === 200) {
                                    //工程师详情
                                    var jData = res.data;
                                    var _keys = [],
                                        _id = "",
                                        _categoryUserName = "",
                                        _area = "",
                                        _headUrl = "",
                                        _organiZation = "",
                                        _mobile = "",
                                        _productName = [],
                                        _validTime = [];

                                    $.each(jData, function (key, value) {
                                        _keys.push(key);
                                        $.each(value, function (index,
                                            item) {
                                            _productName.push(
                                                item.productName
                                            );
                                            _validTime.push(
                                                item.validTime
                                            );
                                        })
                                    })

                                    _id = jData[_keys[0]][0].id;

                                    layer.open({
                                        id: "detailEn",
                                        type: 2,
                                        title: "",
                                        closeBtn: 0,
                                        shadeClose: true,
                                        area: ['auto', '80%'],
                                        content: addr +
                                            '/view/FECertification/details.html?id=' + _id
                                    });
                                }
                            },
                            error: function (msg) {
                                console.log(msg);
                            }
                        })
                    })
                }
            },
            error: function (msg) {
                console.log(msg)
            }
        })
    }

    //查询资质证
    $("#re-searchInpMid").next('span').on("click", function () {
        if ($('#re-searchInpMid').val() === decodeURI(getCookie('searchStr'), "utf-8") && $('#re-searchInpMid').val() != '') {
            initUrl();
        } else {
            searchStr = $("#re-searchInpMid").val();
            area = '';
            model = '';
            setCookie("area", '', 1);
            setCookie("model", '', 1);
            data = (searchStr === '' || searchStr === null || searchStr === undefined) ? ("area=" +area + '&model=' + model) : ('searchStr=' + searchStr);

        }

        $.ajax({
            url: addr + '/geCertifiedUser/queryVcategoryUserSimple?page=1&limit=9',
            type: "post",
            data: data,
            dataType: "json",
            success: function (res) {
                if (res.status === 200) {
                    if (res.data.count > 0) {
                        setCookie("searchStr", encodeURI(searchStr, "utf-8"), 1);
                        $(".content").load("./FECertification/searchHaveData.html");
                    } else {
                        setCookie("searchStr", encodeURI(searchStr, "utf-8"), 1);
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
    $("#re-searchInpMid").on("keydown", function (e) {
        if (e.keyCode === 13) {
            $(this).next().trigger("click");
        }
    })

    //查看所有认证工程师
    $('#ckAllCertifi').on('click', function () {
        $('#re-searchInpMid').val('');
        area = '';
        model = '';
        setCookie("searchStr", '', 1);
        setCookie("area", '', 1);
        setCookie("model", '', 1);
        data = '';
        initCertiE();
        pagination(getCookie('count'));
    })

    //清除筛选条件
    $('#clearAllCondi').on('click', function () {
        $('#re-searchInpMid').val('');
        area = '';
        model = '';
        setCookie("searchStr", '', 1);
        setCookie("area", '', 1);
        setCookie("model", '', 1);
        data = '';
        initCertiE();
        pagination(getCookie('count'))
    })

    //icon监听
    function iconEvent(_icon) {
        $(_icon).click(function () {
            if ($(_icon + ' span').attr('class') === 'layui-icon layui-icon-down') {
                $(_icon + ' span').attr('class', 'layui-icon layui-icon-right');
                if ($(_icon).siblings().is(':visible')) {
                    $(_icon).siblings().hide();
                }
            } else {
                $(_icon + ' span').attr('class', 'layui-icon layui-icon-down');
                $(_icon).siblings().show();
            }
        })
    }

    //checkbox checked
    function ckBox(_cookie, aLi) {
        var items = $(aLi + ' input[type="checkbox"]');
        if (_cookie != '') {
            if (_cookie.split(',')) {
                for (var i = 0; i < _cookie.split(',').length; i++) {
                    for (var j = 0; j < items.length; j++) {
                        if (items.eq(j).attr('title') === _cookie.split(',')[i]) {
                            items.eq(j).attr('checked', true);
                            break;
                        }
                    }
                }
            }
        }
    }

    //分页
    function pagination(count) {
        //执行一个laypage实例
        laypage.render({
            elem: 'engineerPag', //注意，这里的 engineerPag 是 ID，不用加 # 号
            count: count, //数据总数，从服务端得到
            limit: limit,
            // limits: limits,
            layout: ['page'],
            jump: function (obj, first) {
                // console.log(obj)
                page = obj.curr;
                // limit = obj.limit;
                if (!first) {
                    initUrl();
                    initCertiE();
                }
            }
        });
        if (count > 0) {
            $('#engineerPag').show();
        } else {
            $('.certifEngineer').append(
                '<h2 style="color:red;margin-top: 10%;font-size:30%">抱歉，没有找到匹配的工程师... ...</h2>');
            $('#engineerPag').hide();
        }
    }

})

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
