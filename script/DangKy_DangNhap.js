const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});




function login(e){
	event.preventDefault();
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	if(email == null){
	  alert("Vui lòng nhập email và mật khẩu")
	}
	else if(email == DataTransfer.email && password == DataTransfer.password){
	  alert("Đăng nhập thất bại!!")
	}
	else{
	  alert("Đăng nhập thành công!1")
	  window.location.href="index.html"
	}
  }


