// // ============ Thay đổi kích thước ===============
function adjustSVG() {
    const svg = document.querySelector(".graph");
    // Lấy kích thước hiện tại của SVG
    const heightSVG = 1700;
    const viewportHeight = window.innerHeight ;
    let scaleY = viewportHeight / heightSVG;

    // console.log(`viewportWidth: ${viewportWidth}`)
    console.log(`viewportHeight: ${viewportHeight}`)
    // console.log(`scaleX: ${scaleX}`)
    console.log(`scaleY: ${scaleY}`)
    let scale = scaleY
    if (heightSVG < viewportHeight){
        scale = scale + 1
    }
    else {
        scale = scale + 0.05
    }
    console.log(`scale: ${scale}`)
    const matrix = `matrix(${scale} 0 0 ${scale} 0 0)`;

    svg.setAttribute("transform", matrix);
}

// Gọi hàm khi trang tải và khi cửa sổ thay đổi kích thước
window.addEventListener("load", adjustSVG);
window.addEventListener("resize", adjustSVG);

// ============= Tab ==============
// ẩn tab
let esc = document.querySelector(".esc");
esc.addEventListener("click", function () {
    let tab = esc.closest(".tab");
    let bck = document.querySelector(".wrap-all");
    tab.classList.remove("active");
    tab.classList.add("off");

    bck.style.visibility = "hidden";
});

let bck = document.querySelector(".wrap-all");
bck.addEventListener("click", function () {
    let tab = esc.closest(".tab");
    // tab.style.opacity = "0";
    // tab.style.visibility = "hidden";
    // tab.style.transform = "translate(100%)";
    // tab.style.transition = "all  .4s ease";
    tab.classList.remove("active");
    tab.classList.add("off");
    bck.style.visibility = "hidden";
});

// hiện tab tương ứng
const cards = document.querySelectorAll(".card-all");
document.addEventListener("DOMContentLoaded", function () {
    // Duyệt qua từng thẻ card và gắn sự kiện click
    cards.forEach((card) => {
        card.addEventListener("click", function () {
            let bck = document.querySelector(".wrap-all");

            // Hiện sidebar tương ứng với card được click
            // let targetSidebar = document.querySelector(`.${this.dataset.target}`);
            let tab = document.getElementById(this.dataset.target);

            console.log(this.dataset.target);
            // tab.style.opacity = "1";
            // tab.style.visibility = "visible";
            // tab.style.transform = "translate(0)";
            // tab.style.transition = "all  .4s ease";
            tab.classList.add("active");

            bck.style.visibility = "visible";
        });
    });
});

// ============= Độ hoàn thành  ==============