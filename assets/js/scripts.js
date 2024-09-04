// let scriptMap = {
//     home: ["home.js", "goal.js", "button.js"],
//     practice: ["graphCircle.js","practice.js", "goal.js", "button.js"],
//     roadmap: ["roadmap.js", "button.js","tab-roadmap.js"],
// };

// function removeOldScripts() {
//     document
//         .querySelectorAll("script[data-dynamic='true']")
//         .forEach((script) => script.remove());
// }

// async function loadJS(jsFiles) {
//     removeOldScripts(); // Xóa script cũ
//     const scripts = scriptMap[jsFiles] || [];
//     for (let scriptName of scripts) {
//         let module = await import(`./${scriptName}`);

//         for (let [key, value] of Object.entries(module)) {
//             if (typeof value === "function") {
//                 value();
//             }
//         }
//     }
// }
// async function loadCSS(target) {
//     // Tìm tất cả các thẻ link có rel='stylesheet' nhưng không có class='default-css'
//     const oldLinks = document.querySelectorAll(
//         "link[rel='stylesheet']:not(.default-css)"
//     );

//     // Xóa các link không phải mặc định
//     oldLinks.forEach((link) => link.remove());

//     // Thêm file CSS mới
//     let newLink = document.createElement("link");
//     newLink.rel = "stylesheet";
//     newLink.href = `assets/css/${target}.css`;
//     newLink.classList.add("dynamic-css"); // Đánh dấu là CSS động
//     document.head.appendChild(newLink);
// }
// function navigateTo(page) {
//     document.querySelectorAll("[data-page]").forEach((element) => {
//         if (element.dataset.page === page) {
//             element.classList.add("active-page");
//             loadCSS(page);
//             loadJS(page);
//         } else {
//             element.classList.remove("active-page");
//         }
//     });

//     document.querySelectorAll("[data-link]").forEach((link) => {
//         if (link.dataset.link === page) {
//             link.classList.add("active-nav");
//         } else {
//             link.classList.remove("active-nav");
//         }
//     });

//     window.scrollTo(0, 0);
// }

// function init() {
//     document.querySelectorAll("[data-link]").forEach((link) => {
//         link.addEventListener("click", (e) => {
//             e.preventDefault();
//             navigateTo(link.dataset.link);
//         });
//     });

//     // Load initial page based on active-page class
//     const initialPage = document.querySelector(".active-page").dataset.page;
//     loadCSS(initialPage);
//     loadJS(initialPage);
// }

// // Initialize when DOM is ready
// document.addEventListener("DOMContentLoaded", init);

//=============== Chuyển code ==============
function copyNav() {
    const pcNav = document.querySelector(".pc-nav");
    const mobileNav = document.querySelector(".mobile-nav");

    mobileNav.innerHTML = pcNav.innerHTML;
}
copyNav();

//=============== Bật menu trên tablet và điện thoại ==============

let listIcon = document.querySelector(".toggle-menu");
let menuOverlay = document.querySelector(".menu-overlay");
function hiddenMenu() {
    console.log("thanh cong");
    let menu = document.querySelector(".menu-drawer");
    menu.classList.toggle("show-menu");
    menuOverlay.classList.toggle("show-menu-overlay");
}
listIcon.addEventListener("click", hiddenMenu);
menuOverlay.addEventListener("click", hiddenMenu);
let btnClose = document.querySelector(".btn-close");
btnClose.addEventListener("click", hiddenMenu);
// =============== Header ==============

const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll(".navbar .pc-nav a, .mobile-nav a");

function getPageNameFromPath(path) {
    // Lấy phần cuối cùng của đường dẫn (tên file)
    const parts = path.split("/");
    return parts[parts.length - 1];
}

const currentPageName = getPageNameFromPath(currentPath);
console.log("currentPageName", currentPageName);

navLinks.forEach((link) => {
    const linkPageName = link.getAttribute("href");
    if (linkPageName === currentPageName) {
        console.log("active-page", linkPageName);
        link.classList.add("active-page");
        link.href = "#";
    }
});
// =============== Sign in hoặc sign up ==============
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function opLog() {
    let login = document.querySelector(".login-button");
    let logwrapper = document.querySelector(".login.wrapper");
    let regwrapper = document.querySelector(".register.wrapper");
    let img = document.querySelector(".login-image");
    let main = document.querySelector("main");
    let register = document.querySelector(".signup-button");
    const action = getQueryParam("form");
    // Kiểm tra URL hiện tại
    const currentPath = window.location.pathname;
    console.log(currentPath.includes("Login.html"));

    if (action === "signIn") {
        if (currentPath.includes("Login.html")) {
            regwrapper.classList.add("off");
            logwrapper.classList.add("show");
            logwrapper.classList.add("center");
            img.classList.add("off");
            document.querySelector(".wrapall-login").classList.add("box-off");
        } else {
            console.log("chuyen");
            // Chuyển đến trang signIn nếu không ở đó
            window.location.href = "Login.html?form=signIn";
        }
    } else if (action === "signUp") {
        if (currentPath.includes("Login.html")) {
            console.log(currentPath);
            logwrapper.classList.remove("show");
            regwrapper.classList.add("show");
            regwrapper.classList.add("overlay-register");
            img.classList.remove("disabled");
            img.classList.add("enabled");
        } else {
            // Chuyển đến trang signUp nếu không ở đó
            window.location.href = "Login.html?form=signUp";
        }
    }
}
opLog();
//=============== Sau khi đăng nhập ==============
// Đảm bảo bạn bao quanh mã sử dụng `await` với một hàm `async`
// localStorage.clear();
let islog = localStorage.getItem("islog");
async function loadUserData() {

    if (islog === "true") {
        let signin = document.querySelector(".action-link");
        let signup = document.querySelector(".action-btn");
        let actions = document.querySelector(".actions");
        signin.style.display = "none";
        signup.style.display = "none";

        let response = await fetch("./json/user.json");
        let usersFromJSON = await response.json();

        let user = localStorage.getItem("log");
        let data = JSON.parse(user);
        let loggedInEmail = data.email; // Đảm bảo đã lưu email của người dùng khi đăng nhập
        let userFromJSON = usersFromJSON.find(
            (user) => user.accountName === loggedInEmail
        );
        const wrapDiv = document.createElement("div");
        wrapDiv.className = "wrap-userLog";

        // Giả sử bạn có một phần tử HTML để hiển thị ảnh đại diện

        if (userFromJSON) {
            console.log("thanh cong");
            

            if (userFromJSON.acc === "Premium") {
                console.log("Premium");
                // Người dùng là Premium, thêm biểu tượng crown
                wrapDiv.innerHTML = `
                <img class="avatar-user-afterLog user-premium" src="${userFromJSON.avatar}" alt="User Avatar"/>
                <img src="./assets/icons/crown-gold.svg" alt="Premium Icon" class="premium-acc">
            `;
            } else {
                // Người dùng không phải Premium, không thêm biểu tượng crown
                wrapDiv.innerHTML = `
                <img class="avatar-user-afterLog" src="${userFromJSON.avatar}" alt="User Avatar"/>
            `;
            }
        } else {
            console.log("ngheo");

            // Nếu không tìm thấy tài khoản, sử dụng ảnh mặc định
            wrapDiv.innerHTML = `
            <img class="avatar-user-afterLog" src="./assets/img/default_avatar.jpg" alt="Default Avatar"/>
        `;
        }
        actions.insertBefore(wrapDiv, actions.querySelector("a").nextSibling);
    }
}

loadUserData();
for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    console.log(`Key: ${key}, Value: ${value}`);
}
function setTimePut(time) {
    var interval = setInterval(function () {
        localStorage.setItem("islog", "false");
    }, time);
}

setTimePut(60000); // 10 phút
