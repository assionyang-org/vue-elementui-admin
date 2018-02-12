<template>
<div class="container">
		<div class="login-bg"></div>
		<div class="login-box">
			<form action="" id="login-form">
				<div class="login-title">用户登录</div>
				<div class="login-bor">
					<input type="text" class="form-input bg" maxlength="11" name="phone" value="">
				</div>
				<div class="login-message">
					<dl>
						<dt><input type="text" class="form-input" maxlength="6" name="message" value=""></dt>
						<dd><button type="button" class="message-btn">发送验证码</button></dd>
					</dl>
				</div>
				<div class="login-sub">
					<button type="submit" class="btn btn-style" id="login-btn">登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
				</div>
			</form>
		</div>
	</div>
</template>