window.addEventListener("load", function() {
    let login = document.querySelector(".login-button");
    let logwrapper = this.document.querySelector(".login.wrapper");
    let regwrapper = this.document.querySelector(".register.wrapper")
    let img = this.document.querySelector(".login-image");
    let main = this.document.querySelector("main");
    let register = document.querySelector(".signup-button");
    console.log(document.querySelector('.no-js-on-mobile').offsetParent)
    //JS cho điện thoại
    if (document.querySelector('.no-js-on-mobile').offsetParent === null) {
        login.addEventListener("click",function(){
            regwrapper.classList.remove("show");
            logwrapper.classList.add("show");
        });
        register.addEventListener("click",function(){
            logwrapper.classList.remove("show");
            regwrapper.classList.add("show");
        });
    }
    //JS cho PC
    else
    {
        login.addEventListener("click",function(){
            regwrapper.classList.remove("show");
            logwrapper.classList.add("show");
            logwrapper.classList.add("overlay-login");
            img.classList.add("disabled");
            main.style.backgroundColor = "gray";
            logwrapper.style.borderRadius = " 20px ";
        });
        register.addEventListener("click",function(){
            logwrapper.classList.remove("show");
            regwrapper.classList.add("show");
            regwrapper.classList.add("overlay-register");
            img.classList.remove("disabled");
            img.classList.add("enabled");
        });
    };
});

