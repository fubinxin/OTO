$('#submit').click(function(){
    var name = $('#name').val();
    var password = $('#password').val();
    $.cookie('userName','', { expires: 1 , path: '/'  });
    $.cookie('userId','', { expires: 1 , path: '/'  });
    $.ajax({
        url:url+'/geUser/login',
        data:{'username':name,'password':password},
        dataType:'json',
        type:'post',
        success:function(data){
            console.log(data);
            if(data.msg=='登陆成功'){
                $.cookie('userName',data.data.loginName, { expires: 1 , path: '/'  });
                $.cookie('userId',data.data.id, { expires: 1 , path: '/'  });
                window.location.href='./index.html';
            }else{
                // $('.msg').html(data.msg);
                $('.loginFail').css('display','block');
                setTimeout(function(){
                    $('.loginFail').css('display','none');
                },1000);
            }
        }
    })
})