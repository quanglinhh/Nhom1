var btnSubmit = document.getElementById("btnSubmit");
if(btnSubmit!=null){
    btnSubmit.onclick = function (){
        validateForm();
    }
}

function validateForm(){

    //lay gia tri cac pt trong forms theo DOM

    //validate firstname
    var firstNameInput = document.forms["member"].elements["firstName"];
    var firstName = firstNameInput.value;
    //var firstNameInput = document.getElementsByName("firstName");
    //var firstName = firstNameInput.value;
    if(firstName.length === 0){
        firstNameInput.nextElementSibling.innerHTML ="Vui long dien thong tin firstName";
    }else if (firstName.length < 6){
        firstNameInput.nextElementSibling.innerHTML ="Vui long dien thong tin firstName phai > 6 ky tu";

    }else {
        firstNameInput.nextElementSibling.innerHTML ="";

    }
    //validate lastName
    var lastNameInput = document.forms["member"].elements["lastName"];
    var lastName = lastNameInput.value;
    if(lastName.length === 0){
        lastNameInput.nextElementSibling.innerHTML ="Vui long dien thong tin lastName";
    }else if (firstName.length < 6){
        lastNameInput.nextElementSibling.innerHTML ="Vui long dien thong tin firstName phai > 6 ky tu";

    }else {
        lastNameInput.nextElementSibling.innerHTML ="";

    }
    //validate Password
    var passwordInput = document.forms["member"].elements["password"];
    var password = passwordInput.value;
    if(password.length === 0){
        passwordInput.nextElementSibling.innerHTML ="Vui long dien mat khau";
    }else if (password.length < 6){
        passwordInput.nextElementSibling.innerHTML ="mat khau phai > 6 ky tu";

    }else {
        passwordInput.nextElementSibling.innerHTML ="";

    }
    //validate Address
    var addressInput = document.forms["member"].elements["address"];
    var address = addressInput.value;
    if(address.length === 0){
        addressInput.nextElementSibling.innerHTML ="Vui long dien dia chi";
    }
    else {
    addressInput.nextElementSibling.innerHTML ="";
    }
    //Validate Phone
    var phoneInput = document.forms["member"].elements["phone"];
    var phone = phoneInput.value;

    if(phone.length === 0){
        phoneInput.nextElementSibling.innerHTML ="Vui long nhap so dien thoai cua ban";
    }else if (phone.length !== 11){
        phoneInput.nextElementSibling.innerHTML ="nhap lai so dien thoai";

    }else {
        phoneInput.nextElementSibling.innerHTML ="";

    }


    //Validate avatar
    var avatarInpput = document.forms["member"].elements["avatar"];
    var avatar = avatarInpput.value;
    var genderInpput = document.forms["member"].elements["gender"];
    var gender = genderInpput.value;
    if(gender !== "0" && gender !== "1"){
        alert("Bat buoc phai chon gioi tinh");
    }
    var emailInpput = document.forms["member"].elements["email"];
    var email = emailInpput.value;
    var birthdayInpput = document.forms["member"].elements["birthDay"];
    var birthday = birthdayInpput.value;
    console.log(birthday);


    var object = {
        "firstName":firstName,
        "lastName":lastName,
        "password":password,
        "address":address,
        "phone":phone,
        "avatar":"http://google.com",
        "gender":gender,
        "email":email,
        "birthday":birthday,
    }
    var member_API = "https://music-i-like.herokuapp.com/api/v1/accounts";
    var xhr = new XMLHttpRequest();
    xhr.open("POST",member_API,true);
    xhr.send(JSON.stringify(object));
    console.log(object);

    xhr.onreadystatechange = function (){
        if(xhr.readyState === XMLHttpRequest.DONE && xhr === 201){
            document.getElementById("total-msg").classList ="success-msg";
            document.getElementById("total-msg").innerHTML ="Dang ky member thanh cong";
        }else {
            document.getElementById("total-msg").classList ="error-msg";
            //document.getElementById("total-msg").innerHTML = re.error[0].detail;
        }

    }


}