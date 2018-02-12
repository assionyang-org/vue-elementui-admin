$(function(){
	$(".message-btn").click(function(){
		var that = $(this);
		var num = 5;
	    $(this).html(num + "秒").attr("disabled","disabled");

	    var t = setInterval(function(){
	      if(num > 0){
	        num--
	        that.html(num + "秒").attr("disabled","disabled");
	      } else {
	        num = 0;
	        that.html("发送验证码").attr("disabled",false);
	        clearInterval(t);
	      }
	    },1000)
	})

	$("#login-btn").click(function(){
		var phone = $("input[name=phone]").val(),
		    mess = $("input[name=message]").val();
		$("#login-form").submit(false);
		if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))) {
	      // 手机号
	      alert("请输入正确的手机号")
	    } else if (mess.length !== 6) {
	      // 验证码
	      alert("验证码错误")
	    } else {
	      $("#login-form").submit(true);
	      window.location.href = "index.html"
	    }
	})
})