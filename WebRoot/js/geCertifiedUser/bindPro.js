//绑定产品
var bindP = {
    geCertifiedP: {
        cid: getQueryString('id'),
        product: []
    },
    //初始化
    init: function () {
        var id = getQueryString('id');

        /* 产品列表 */
        var _datalist = '<select class="_datalist">';
        $.ajax({
            url: addr + '/geCertifiedProduct/queryGeCertifiedProduct?page=1&limit=100000',
            type: 'get',
            async: false,
            dataType: 'json',
            success: function (res) {
                _datalist += '<option value="">请选择产品：'
                for (var i = 0; i < res.data.length; i++) {
                    _datalist += '<option value="' + res.data[i].id + '" >' + res.data[i].name +
                        '</option>';
                }
                _datalist += '</option></select>';
            }
        })

        $.ajax({
            url: addr + '/geProductCuserRel/queryGeProductByCId',
            type: 'get',
            async: false,
            dataType: 'json',
            data: ('cid=' + id),
            success: function (res) {
                $('table#newProTable tr').not(':first').remove();
                bindP.setInitData(res.data, _datalist);
                bindP.eventFn(_datalist);
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    },
    //页面赋值
    setInitData: function (data, _datalist) {
        //表格渲染
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                $('table#newProTable').append(
                    '<tr id="' + data[i].ID + '"><td><input type="checkbox"/></td><td>' +
                    _datalist +
                    '</td><td><input placeholder="' + formatDate(data[i].VALID_TIME) +
                    '" value="' + formatDate(data[i].VALID_TIME) +
                    '" type="text" class="validDate"></td></tr>'
                );
                $('._datalist').eq(i).val(data[i].PID);
            }
        } else {
            $('table#newProTable').append(
                '<tr><td colspan="3" id="noRecordTd">无数据</td></tr>'
            );
        }

        $('table#newProTable input[type="text"],table#newProTable select').attr('disabled', true);

    },
    eventFn: function (_datalist) {
        //add
        $('#addProductBtn').click(function () {
            if ($('#noRecordTd')) {
                $('#noRecordTd').remove();
            }

            $('table#newProTable tr:first').after(
                '<tr><td><input type="checkbox" /></td><td>' +
                _datalist +
                '</td><td><input placeholder="添加日期" type="text" class="validDate"></td></tr>'
            );

            var _aaa = $('table#newProTable tr:first').next().next();
            if (_aaa.find('td input').eq(1).val() === '') {
                _aaa.remove()
            }

            bindP.getLayDate();
        })

        //edit
        $('#editProductBtn').click(function () {
            $('table#newProTable input[type="text"],table#newProTable select').attr('disabled',
                false);

            bindP.getLayDate();
        })

        //delete
        $('#deleteProductBtn').click(function () {
            $('table#newProTable input[type="text"],table#newProTable select').attr('disabled',
                true);
            $('table#newProTable input[type="checkbox"]').attr('disabled', false);

            var _ckBox = $('table#newProTable tr td input[type="checkbox"]');
            for (var i = 0; i < _ckBox.length; i++) {
                if (_ckBox.eq(i).is(':checked')) {
                    bindP.del(_ckBox.eq(i).parent('td').parent('tr').attr('id'));
                }
            }

            bindP.bindPConfirm();
        })
    },
    //绑定确认add
    bindPConfirm: function () {
        //遍历数据表格
        var _tr = $('table#newProTable tr'),
            _tdInp;
        bindP.geCertifiedP.product = [];
        var a = [];
        for (var i = 1; i < _tr.length; i++) {
            _tdInp = _tr.eq(i).find('td input[type="text"],td select');
            if (_tdInp.eq(0).val() != '' && _tdInp.eq(0).val() != undefined && _tdInp.eq(1).val() != '') {
                a.push({
                    pid: _tdInp.eq(0).val(),
                    validTime: _tdInp.eq(1).val()
                })
            } else if ((_tdInp.eq(0).val() != '' && _tdInp.eq(1).val() === '') || (_tdInp.eq(0).val() === '' &&
                    _tdInp.eq(1).val() != '')) {
                layui.use(['layer'], function () {
                    var layer = layui.layer;
                    layer.confirm('必填项不能为空', {
                        btn: '确认'
                    })
                })
                return;
            }
        }

        //去除重复项
        for (var i = 0; i < a.length; i++) {
            for (var j = i + 1; j < a.length; j++) {
                if (a[j].pid === a[i].pid) {
                    a.splice(j, 1);
                }
            }
        }
        bindP.geCertifiedP.product = a;

        $.ajax({
            url: addr + '/geProductCuserRel/relationProduct',
            type: "post",
            async: false,
            data: ('cid=' + bindP.geCertifiedP.cid + '&product=' + JSON.stringify(bindP.geCertifiedP
                .product)),
            success: function (res) {
                setTimeout(function () {
                    // bindP.closeCurrentLayer();
                    bindP.init();
                }, 500);
                layui.use(['layer'], function () {
                    var layer = layui.layer;
                    layer.msg('成功');
                });
            },
            error: function (msg) {
                console.log(msg)
            }
        });
        // debugger;
    }, //时间控件
    getLayDate: function () {
        layui.use(['laydate'], function () {
            var laydate = layui.laydate;
            //产品有效时间
            lay('.validDate').each(function () {
                laydate.render({
                    elem: this,
                    trigger: 'click',
                    type: 'date'
                });
            });
        });
    },
    //关闭当前弹框
    closeCurrentLayer: function () {
        //当你在iframe页面关闭自身时
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        parent.layer.close(index); //再执行关闭
    },
    del: function (_id) {
        var _ckDel = $('table#newProTable tr');
        for (var i = 0; i < _ckDel.length; i++) {
            if (_ckDel.eq(i).attr('id') === _id) {
                $('table#newProTable #' + _id).remove()
            }
        }
    }
};

$(function () {
    $("#bindPCancel").click(function () {
        bindP.closeCurrentLayer();
    });

    $("#bindPConfirm").click(function () {
        bindP.bindPConfirm();
    })
})
