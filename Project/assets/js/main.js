const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


//Xử lí đăng nhập, đăng xuất
const loginBtn = $('.header__signInBtn')
const signUpBtn = $('.header__signUpBtn')
const btnAccount = $('.btn-account')
const signUpForm = $('.sigUp-form')
const logInForm = $('.login-form')
const returnBtn = $$('.auth-form__controls-back')
console.log(returnBtn)


function start(){
    HandleEvent()
}
start()
function HandleEvent(){
    //Login + đăng ký
    loginBtn.onclick = function(){
        signUpForm.style.display = "none"
        btnAccount.style.display = "block"
    }
    signUpBtn.onclick = function(){
        logInForm.style.display = "none"
        btnAccount.style.display = "block"
    }
    returnBtn[1].onclick=function(){
        btnAccount.style.display = "none"
        signUpForm.style.display = "block"
    }
    returnBtn[0].onclick=function(){
        btnAccount.style.display = "none"
        logInForm.style.display = "block"
    }
}


