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
	  alert("Đăng nhập thất bại")
	}
	else{
	  alert("Đăng nhập thành công")
	  window.location.href="index.html"
	}
  }






// function KT()
// 		{
// 			var flag= true;
// 			var fullname= document.getElementById("Name").value.trim();
// 			if(fullname == "" || fullname.length <10|| /^[a-zA-Z0-9]$/.test(fullname))
// 				{
// 					flag= false;
// 					document.getElementById("Name").innerHTML = "Vui long kiem tra lai Ten";
					
// 				}
// 			var Email= document.getElementById("Email").value.trim();
// 			var Mailformat= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zAZ0-9-]+)*$/;
// 			if(!Mailformat.test(Email))
// 				{
// 					flag = false;
// 					document.getElementById("Email").innerHTML ="Vui long kiem tra Email!";
// 				}
			
// 		}


// var inputUsername= document.getElementById('username');
// var inputUsername= document.getElementById('password');

// var inputUsername= document.getElementById('form-login');

// if(formLogin.attachEvent) {
// 	formLogin.attachEvent('submit' , onFormSubmit);
// } else {
// 	formLogin.attachEvent('submit' , onFormSubmit);
// }

// function onFormSubmit(e){
// 	if(e.preventDefault) e.preventDefault();


// 	var username= inputUsername.value;
// 	var password= inputPassword.value;

// 	if(username == CORRECT_USER && password == CORRECT_PASS ){
// 		window.location='';
// 	} else {
// 		alert('Dang nhap that bai!');

// 	}

// 	return false;
// }