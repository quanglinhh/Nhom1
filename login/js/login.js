var btnSubmit = document.getElementById("login");
if(btnSubmit!=null){
    btnSubmit.onclick = function (){
        loginForm();
    }
}
function loginForm(){
    //
    var emailInput = document.forms["login"].elements["email"];
    var email = emailInput.value;
    if(email.length === 0){
        emailInput.nextElementSibling.innerHTML ="vui long nhap thong tin cua ban";
    }
    else {
        emailInput.nextElementSibling.innerHTML ="";
    }
    //
    var passwordInput = document.forms["login"].elements["password"];
    var password = passwordInput.value;
    if(password.length === 0){
        passwordInput.nextElementSibling.innerHTML ="Vui long dien mat khau";
    }else if (password.length < 6){
        passwordInput.nextElementSibling.innerHTML ="mat khau phai > 6 ky tu";

    }else {
        passwordInput.nextElementSibling.innerHTML ="";
    }
    var object={
            "email": email,
            "password": password
    }
    var login_API = "https://music-i-like.herokuapp.com/api/v1/accounts/authentication";
    var xhr = new XMLHttpRequest();
    xhr.open("POST",login_API,true);
    xhr.send(JSON.stringify(object));
    console.log(object);

    xhr.onreadystatechange = function (){
        if(xhr.readyState === XMLHttpRequest.DONE && xhr === 201){
            document.getElementById("total-msg").classList ="success-msg";
            document.getElementById("total-msg").innerHTML ="Dang nhap thanh cong";
        }else {
            document.getElementById("total-msg").classList ="error-msg";
            //document.getElementById("total-msg").innerHTML = re.error[0].detail;
        }

    }

}