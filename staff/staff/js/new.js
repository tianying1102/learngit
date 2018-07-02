/*最多显示两行超出文本显示省略号*/
var hrefUrl="";
$(function () {
    /*数据请求参数*/
    function getSearchString(key) {
        // 获取URL中?之后的字符
        var str = location.search;
        str = str.substring(1, str.length);
        // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
        var arr = str.split("&");
        var obj = new Object();

        // 将每一个数组元素以=分隔并赋给obj对象
        for (var i = 0; i < arr.length; i++) {
            var tmp_arr = arr[i].split("=");
            // 如果url参数是Unicode编码将url解码
            obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
        }
        return obj[key];
    }
    var token = getSearchString("token");
    var client_id = getSearchString("client_id");
    var phone=getSearchString("phone");
    var appkey=getSearchString("appkey");
    var user_id=getSearchString('user_id');
    var appSource=getSearchString('appSource');
    var url="";
    function resm(){
        $('.name_mm').focus();
        $('#tan_1').removeClass('hide');
        $('.bac_jing').removeClass('hide');
    };
    /*获取姓名*/
    var rule_m = /^[\u4E00-\u9FA5]{2,4}$/;
    /*获取身份证*/
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    /*点击开通福利*/
    var name;
    var card;
    $('.name_mm').on('input', function(e) {
        //实时监听手机号码输入框变化
        name=$('.name_mm').val()
    });
    $('.i_card').on('input', function(e) {
        //实时监听手机号码输入框变化
        card=$('.i_card').val()
    });
    function close(res){
      $(".close").on("click",function () {
          console.log(res);
        window.location=res.url;
      })
    }
/*进入页面判断是否登录中调用原生方法*/
 function login(){
        if (appSource === "ios") {
            window.location.href = "ios://toLogin?needValideMobile=1";
        } else if(appSource==='android')
        {
         /*   alert(1)*/
            window.control.toLogin(1)
        };
    }
if(token == "null"||token==null||token==''){
              /*福利商城*/
                $('.fu_shop,.bill,.register,.mall,.netEase,.img_1,.img_2,#welfare_Center').click(function(){
                        login();
                   })
 } else{
     /*判断理财登陆成功*/
    /* $('.ti_jian,.money').click(function(){
         if (appSource === "ios") {
             window.location.href = "ios://toJumpTongLian";
         } else if(appSource === "android"){
             window.control.toTongLianPay();
         }
     })*/
     $.ajax({
        type: "post",
        dataType:"json",
        url:"/api/platform/v1/store/trade/zfl/login",
        data: {
            appkey:appkey,
            client_id:client_id,
            token:token,
            phone:phone,
            redirect:'',
            name:''
        },
        success:function (res) {
            console.log(res)
            /*用户未激活*/
          /*  if(res.status=="notfound"){
                /!*福利商城*!/
                $('.fu_shop,#welfare_Center,.bill,.register,.mall,.netEase').click(function () {
                    url = $(this).attr("data-url");
                    /!*这里暂时注释*!/
                   // resm();
                });
                close(res)
            }else{*/
                /*福利商城*/
                $('.fu_shop').click(function(){
                    getRedirectUrl('',appkey,client_id,token,phone); location.href = hrefUrl;
                    });
                /*福利中心*/
                $('#welfare_Center').click(function(){
                    getRedirectUrl('',appkey,client_id,token,phone); location.href = hrefUrl;
                });
                /*四个福利商城的福利商品板块个商品的*/
                $('.bill').click(function(){
                    getRedirectUrl($(this).attr("data-url"),appkey,client_id,token,phone); location.href = hrefUrl;
                });
                $('.register').click(function(){
                    getRedirectUrl($(this).attr("data-url"),appkey,client_id,token,phone); location.href = hrefUrl;
                });
                $('.mall').click(function(){
                    getRedirectUrl($(this).attr("data-url"),appkey,client_id,token,phone); location.href = hrefUrl;
                });
                $('.netEase').click(function(){
                    getRedirectUrl($(this).attr("data-url"),appkey,client_id,token,phone); location.href = hrefUrl;
                });
          /*  }*/
        },
        error:function (e) {
            alert('数据请求失败')
        }
    });
     /*赚积分*/
    $('.img_1').click(function(){
        //getRedirectUrl($(this).attr("data-url"),appkey,client_id,token,phone); //location.href = hrefUrl;
       window.location.href=$(this).attr("data-url")
    });
    $('.img_2').click(function(){
        //getRedirectUrl($(this).attr("data-url"),appkey,client_id,token,phone); location.href = hrefUrl;
        window.location.href=$(this).attr("data-url")
    });
    /*激活福利*/
    $('.ji_h').click(function(){
        /*激活账户接口*/
        if(name == "" || name == undefined || name == null){
            new Message().show({
                msg: '请输入姓名!',
                shade: false,
                'type': 1
            });
            $('.name_mm').val('');
            $('.name_mm').focus();
        }else if(!reg.test($('.i_card').val().trim())){
            new Message().show({
                msg: '请输入正确身份证号!',
                shade: false,
                'type': 1
            });
            $('.i_card').val('');
            $('.i_card').focus();
        }else{
            $.ajax({
                type: "post",
                dataType:"json",
                url:"/api/platform/v1/welfareAccount/activate",
                data: {
                    user_id:user_id,
                    name:name,
                    id_card :card,
                    activation_key:''
                },
                success:function (res) {
                    if(res.status=='success'){
                        $('#tan_1').addClass('hide');
                        $('#tan_2').removeClass('hide');
                        $('.cha_2').removeClass('close')
                    }else{
                        $('#tan_1').addClass('hide');
                        $(".name").html("姓名:&nbsp"+name);
                        $(".idcard").html("身份证:&nbsp"+card);
                        $('#tan_3').removeClass('hide');
                    }
                },
                error:function (e) {
                    console.log(e);
                }
            })
        }
    });
    /*随便逛逛*/
    $('.sui_b').click(function(){
        $('#tan_3').addClass('hide');
        $.ajax({
            type: "post",
            dataType:"json",
            url:"/api/platform/v1/store/trade/zfl/login",
            data: {
                appkey:appkey,
                client_id:client_id,
                token:token,
                phone:phone,
                redirect:'https://t-h5.zuifuli.com/withoutBalanceApp/home',
                name:''
            },
            success:function (res) {
                location.href = res.url;
            },
            error:function (e) {
                console.log(e);
            }
        })
    });
    /*重新激活*/
    $('.guang_g').click(function(){
        $('.name_mm').val('');
        $('.i_card').val('');
        $('.name_mm').focus();
        $('#tan_3').addClass('hide');
        $('#tan_1').removeClass('hide');
    });
    /*激活跳转首页商城*/
    $('.shop_f').click(function(){
        getRedirectUrl(url,appkey,client_id,token,phone);
        location.href = hrefUrl;
    });
}
    /*以下三个不做登陆判断*/
    /*薪资查询调用原生的方法*/
    $(".xin_z").click(function () {
        if (appSource === "ios") {
            window.location.href = "ios://toJumpUserCheckSalary";
        } else if(appSource === "android"){
            window.control.checkSalary();
        }
    });
  /*弹窗背景消失*/
      $('.cha').click(function(){
          $('#tan_1').addClass('hide');
          $('.bac_jing').addClass('hide');
      });
      $('.cha_2').click(function(){
            $('#tan_2').addClass('hide');
            $('.bac_jing').addClass('hide');
        });
      $('.cha_3').click(function(){
        $('#tan_3').addClass('hide');
        $('.bac_jing').addClass('hide');
    });
})
/**
 *
 */
function getRedirectUrl(url,appkey,client_id,token,phone){
	$.ajax({
		type: "post",
		dataType:"json",
		async:false,
		url:"/api/platform/v1/store/trade/zfl/login",
		data: {
			appkey:appkey,
			client_id:client_id,
			token:token,
			phone:phone,
			redirect: url,
			name:''
		},
		success:function (res) {
			console.log(res);
			hrefUrl = res.url;
          //  console.log(hrefUrl);
        },
		error:function (e) {
			console.log(e);
		}
	})
}
