window.addEventListener("load", function () {
    function Showlogin() {
        let login = document.querySelector(".login-button");
        let logwrapper = this.document.querySelector(".login.wrapper");
        let regwrapper = this.document.querySelector(".register.wrapper");
        let img = this.document.querySelector(".login-image");
        let main = this.document.querySelector("main");
        let register = document.querySelector(".signup-button");
        console.log(document.querySelector(".no-js-on-mobile").offsetParent);
        //JS cho điện thoại
        if (document.querySelector(".no-js-on-mobile").offsetParent === null) {
            login.addEventListener("click", function () {
                logwrapper.classList.remove("center");
                regwrapper.classList.remove("show");
                logwrapper.classList.add("show");
            });
            register.addEventListener("click", function () {
                logwrapper.classList.remove("show");
                regwrapper.classList.add("show");
            });
        }
        //JS cho PC
        else {
            login.addEventListener("click", function () {
                regwrapper.classList.remove("show");
                logwrapper.classList.add("show");
                logwrapper.classList.add("overlay-login");
                img.classList.add("disabled");
            });
            register.addEventListener("click", function () {
                logwrapper.classList.remove("remove");
                logwrapper.classList.remove("show");
                regwrapper.classList.remove("off");
                regwrapper.classList.add("show");
                regwrapper.classList.add("overlay-register");
                img.classList.remove("disabled");
                img.classList.add("enabled");
            });
        }
        let loginbutton = document.querySelector(".login-button");
        let signupbutton = document.querySelector(".signup-button");
        let bckwrap = document.querySelector(".wrapall-login");
        loginbutton.addEventListener("click", function () {
            bckwrap.classList.add("box-off");
        });
        signupbutton.addEventListener("click", function () {
            bckwrap.classList.remove("box-off");
        });
    }
    Showlogin();
    let passfirst = document.querySelector("#password-input");
    let passsecond = document.querySelector("#repeatpswd-input");
    let waring = document.querySelector(".diff");
    let amount = document.querySelector(".font");

    function validatePasswordsMatch() {
        if (passfirst.value === passsecond.value) {
            waring.style.visibility = "hidden";
            waring.style.opacity = "0";
            waring.style.position = "absolute";
            return true;
        } else {
            waring.style.visibility = "visible";
            waring.style.opacity = "1";
            waring.style.position = "relative";
            return false;
        }
    }
    function validatePasswordsAMount() {
        if (passfirst.value.length >= 8) {
            amount.style.visibility = "hidden";
            amount.style.opacity = "0";
            amount.style.position = "absolute";
            return true;
        } else {
            amount.style.visibility = "visible";
            amount.style.opacity = "1";
            amount.style.position = "relative";
            return false;
        }
    }
    function KeyDown(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (validatePasswordsMatch() && validatePasswordsAMount()) {
                signup(event);
            }
        }
    }
    passsecond.addEventListener("keydown", KeyDown);
    function signup(e) {
        e.preventDefault();
        if (!validatePasswordsMatch() || !validatePasswordsAMount()) {
            return;
        }
        let username = document.getElementById("firstname-input").value;
        let email = document.getElementById("email-input").value;
        localStorage.setItem("islog", "false");
        let password = document.getElementById("repeatpswd-input").value;

        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Password:", password);

        let user = {
            username: username,
            email: email,
            password: password,
        };
        let json = JSON.stringify(user);
        localStorage.setItem("heheboiz", json);
        let prev = document.querySelector(".login-button");
        prev.click();
    }
    document.getElementById("signup-form").addEventListener("submit", signup);

    async function login(e) {
        e.preventDefault();
        let email = document.getElementById("email-input-login").value;
        let password = document.getElementById("password-input-login").value;

        // Lấy dữ liệu từ localStorage
        let user = localStorage.getItem("heheboiz");
        let data = JSON.parse(user);

        let userlog = {
            email: email,
            password: password,
        };
        let json = JSON.stringify(userlog);
        localStorage.setItem("log", json);
        // Lấy dữ liệu từ JSON
        let response = await fetch("./json/user.json"); 
        let usersFromJSON = await response.json();

        // Tìm người dùng trong JSON
        let userFromJSON = usersFromJSON.find(
            (user) => user.accountName === email
        );

        // Kiểm tra xem người dùng có tồn tại trong localStorage hoặc JSON không
        if (
            (data && password === data.password) ||
            (userFromJSON && password === userFromJSON.password)
        ) {
            localStorage.setItem("islog", "true");
            window.location.href = "./home.html";
        } else {
            let text = document.querySelector(".mk");
            text.style.visibility = "visible";
            text.style.opacity = "1";
            text.style.position = "relative";
        }
    }

    document.getElementById("login-form").addEventListener("submit", login);
});
