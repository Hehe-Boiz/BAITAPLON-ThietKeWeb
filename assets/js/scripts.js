// // Map các script tương ứng với mỗi mục trong navbar
// let scriptMap = {
//     home: ["home.js", "goal.js","button.js"],
//     practice: ["practice.js", "graphCircle.js", "goal.js","button.js"],
//     roadmap: ["roadmap.js","button.js"],
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

// // Hàm tải CSS
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

// // Xử lý sự kiện khi nhấp vào các thành phần trong navbar
// document.querySelectorAll(".navbar li").forEach((li) => {
//     li.addEventListener("click", function () {
//         let targetClass = this.classList[0];
//         console.log("targetClass:", targetClass); // Xem giá trị của targetClass
//         let map = document.querySelector(".map");
//         if (map) {
//             map.remove();
//         }

//         // Tải nội dung HTML vào thẻ main và đợi cho việc tải hoàn tất
//         load("#main-content", `${targetClass}.html`);

//         if (targetClass === "roadmap") {
//             let divMap = document.createElement("div");
//             divMap.classList.add("map");
//             document.body.appendChild(divMap);
//             const mainElement = document.querySelector("#main-content");
//             mainElement.prepend(divMap);
//             load(".map", "map.html");
//         }

//         // Xóa phần tử footer nếu nó đã tồn tại
//         let Footer = document.querySelector("footer");
//         if (Footer) {
//             Footer.remove();
//         }

//         if (targetClass === "home" || targetClass === "practice") {
//             let footer = document.createElement("footer");
//             footer.classList.add("footer");
//             document.body.appendChild(footer);
//             load(".footer", "./templates/footer.html");
//         }
//         loadCSS(targetClass);
//         loadJS(targetClass);
//     });
// });

// // Mặc định tải trang home khi trang được tải lần đầu
// document.addEventListener("DOMContentLoaded", async () => {
//     await loadCSS("home");
//     // Tải nội dung trang Home vào thẻ main khi trang web được tải lần đầu và đợi cho việc tải hoàn tất
//     load("#main-content", "home.html");
//     let existingFooter = document.querySelector("footer");
//     if (existingFooter) {
//         existingFooter.remove();
//     }

//     // Tạo phần tử footer
//     const footer = document.createElement("footer");
//     // Thêm lớp 'footer' vào phần tử
//     footer.classList.add("footer");
//     // Thêm phần tử footer vào body
//     document.body.appendChild(footer);
//     load(".footer", "./templates/footer.html");
//     // Áp dụng CSS và JS cho trang Home sau khi nội dung HTML đã được tải
//     loadCSS("home");
//     loadJS("home");
// });

//=============== Chuyển code ==============
function copyNav() {
    const pcNav = document.querySelector(".pc-nav");
    const mobileNav = document.querySelector(".mobile-nav");

    mobileNav.innerHTML = pcNav.innerHTML;
}
copyNav();

//=============== Bật menu trên tablet và điện thoại ==============

let listIcon = document.querySelector(".toggle-menu")
let menuOverlay = document.querySelector(".menu-overlay") ;
function hiddenMenu() {
    console.log("thanh cong");
    let menu = document.querySelector(".menu-drawer");
    menu.classList.toggle("show-menu");
    menuOverlay.classList.toggle("show-menu-overlay");
}
listIcon.addEventListener("click",hiddenMenu);
menuOverlay.addEventListener("click",hiddenMenu);
let btnClose = document.querySelector(".btn-close");
btnClose.addEventListener("click",hiddenMenu);

