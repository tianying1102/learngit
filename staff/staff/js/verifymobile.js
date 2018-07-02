var VM = {
  geetestCode: "",
  sendMobile: function (mobile) {
    noLoadGeetestViald(mobile);
  }
};
var time_sty1 = null;
var time_sty2 = null;
function noLoadGeetestViald(mobile) {
  var loadding = new Message().show({msg: '加载中...'});
  $("#btn_gain_val_key").attr("onclick", "");
  $("#btn_gain_val_key").addClass("disabled");
  $("#btn_gain_val_key").attr("disabled", true);
  $.post("/api/user/valmobile", {
    mobile: mobile
  }, function (data) {
    loadding.close();
    if (data.status == "success") {
      var thenum = 60;
      var timmer = setInterval(function () {
        $("#btn_gain_val_key").val('重新发送（' + thenum + 's）');
        thenum--;
        if (thenum == -1) {
          clearInterval(timmer);
          $('#btn_gain_val_key').removeAttr("disabled");
          $("#btn_gain_val_key").removeAttr("disabled");
          $("#btn_gain_val_key").removeClass("disabled");
          $("#btn_gain_val_key").val("发送验证码");
          $("#btn_gain_val_key").attr("onclick", "synLoadGeetest()");
        }
      }, 1000);
      time_sty1 = timmer;
    } else if (data.status == "failure") {
      synLoadGeetest();
    } else if (data.status == "frozen") {
      new Message().show({msg: '您的手机今天收到的短信条数已达到上限，明天再来吧！', 'type': 1})
      $("#btn_gain_val_key").removeClass("disabled");
      $('#btn_gain_val_key').removeAttr("disabled");
      $("#btn_gain_val_key").attr("onclick", "synLoadGeetest()");
      $(".mask-box,.tui-mask").not(".tui-mask-img").addClass("hide");
    }
  }, "json");
}
function synLoadGeetest() {
  $('.layer').show();
  $('.layer').css("transform", "none");
  s = document.createElement('script');
  s.src = 'http://api.geetest.com/get.php?callback=initGeetest';
  document.body.appendChild(s);
}
function initGeetest() {
  $.getJSON("/api/captcha/start", function (result) {
    if (result.success == 1) {
      window.gt_captcha_obj = new window.Geetest({
        gt: result.gt,
        challenge: result.challenge,
        product: 'embed'
      });
      $("#div_id_embed").empty();
      gt_captcha_obj.appendTo("#div_id_embed");

      gt_captcha_obj.onSuccess(function () {
        geetest_ajax_results()
      });

    } else {
      $("#div_id_embed").html('failback:gt-server is down ,please use your own captcha front');
    }
  });
}
function geetest_refresh() {
  gt_captcha_obj.refresh();
}
function geetest_ajax_results() {
  $.post("/api/captcha/verify", gt_captcha_obj.getValidate(), function (sdk_result) {
    if (sdk_result.indexOf("success") != -1) {
      gainkey(sdk_result.substr(8));
      // $("#reg_form").append('<input type="hidden" name="code"
      // value="'+sdk_result.substr(8)+'" />');
      $('.layer').hide();
    }
  });
}

var m_reg = /^1[3-9][0-9]{9}$/i;

function gainkey(code) {
  var loadding = new Message().show({msg: '加载中...'});
  var mobile = $("#input_phone").val();
  if (m_reg.test(mobile)) {
    $("#btn_gain_val_key").attr("onclick", "");
    $("#btn_gain_val_key").addClass("disabled");
    $("#btn_gain_val_key").attr("disabled", true);
    $.post("/api/user/valmobile", {
      mobile: mobile,
      geetestCode: code
    }, function (data) {
      loadding.close()
      if (data.status == "success") {
        var thenum = 60;
        var timmer = setInterval(function () {
          $("#btn_gain_val_key").val('重新发送（' + thenum + 's）');
          thenum--;
          if (thenum == -1) {
            clearInterval(timmer);
            $('#btn_gain_val_key').removeAttr("disabled");
            $("#btn_gain_val_key").removeAttr("disabled");
            $("#btn_gain_val_key").removeClass("disabled");
            $("#btn_gain_val_key").val("发送验证码");
            geetest_refresh();
            $("#btn_gain_val_key").attr("onclick", "synLoadGeetest()");
          }
        }, 1000);
        time_sty2 = timmer;
      } else if (data.status == "frozen") {
        // alert("您的手机今天收到的短信条数已达到上限，明天再来吧！")
        new Message().show({msg: '您的手机今天收到的短信条数已达到上限，明天再来吧！', 'type': 1})
        $("#btn_gain_val_key").removeClass("disabled");
        $('#btn_gain_val_key').removeAttr("disabled");
        geetest_refresh();
        $("#btn_gain_val_key").attr("onclick", "synLoadGeetest()");
      } else {
        console.log("验证失败")
      }
    }, "json");
  } else {
    $('.form-g-tip').hide();
    $("#err_loginname").show();
    $("#err_loginname").html("请输入正确的手机号");
    $("#input_phone").focus();
  }
}
