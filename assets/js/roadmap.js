// ============ Thay đổi kích thước ===============
function adjustSVGPc() {
    const svg = document.querySelector(".graph");
    // Lấy kích thước hiện tại của SVG
    const heightSVG = 1700;
    const viewportHeight = window.innerHeight;
    let scaleY = viewportHeight / heightSVG;

    // console.log(`viewportWidth: ${viewportWidth}`)
    console.log(`viewportHeight: ${viewportHeight}`);
    // console.log(`scaleX: ${scaleX}`)
    console.log(`scaleY: ${scaleY}`);
    let scale = scaleY;
    if (heightSVG < viewportHeight) {
        scale = scale + 1;
    } else {
        scale = scale - 0.05;
    }
    console.log(`scale: ${scale}`);
    const matrix = `matrix(${scale} 0 0 ${scale} 0 0)`;

    svg.setAttribute("transform", matrix);
}
window.addEventListener("load", adjustSVGPc);
window.addEventListener("resize", adjustSVGPc);
adjustSVGPc();

// ============= Tab ==============
// // ẩn tab
// let escs = document.querySelectorAll(".esc");
// escs.forEach((esc) => {
//     esc.addEventListener("click", function () {
//         let tab = esc.closest(".tab");
//         let bck = document.querySelector(".wrap-all");
//         tab.classList.remove("active");
//         tab.classList.add("off");

//         bck.style.visibility = "hidden";
//     });
// });

// let bck = document.querySelector(".wrap-all");
// bck.addEventListener("click", function () {
//     let tabs = document.querySelectorAll(".tab");
//     tabs.forEach((tab) => {
//         if (tab.classList.contains("active")) {
//             tab.classList.remove("active");
//             tab.classList.add("off");
//         }
//     });
//     bck.style.visibility = "hidden";
// });

// // hiện tab tương ứng
// const cards = document.querySelectorAll(".card-all");
// // Duyệt qua từng thẻ card và gắn sự kiện click
// cards.forEach((card) => {
//     card.addEventListener("click", function () {
//         let bck = document.querySelector(".wrap-all");

//         // Hiện sidebar tương ứng với card được click
//         // let targetSidebar = document.querySelector(`.${this.dataset.target}`);
//         let tab = document.getElementById(this.dataset.target);

//         console.log(this.dataset.target);
//         // tab.style.opacity = "1";
//         // tab.style.visibility = "visible";
//         // tab.style.transform = "translate(0)";
//         // tab.style.transition = "all  .4s ease";
//         tab.classList.add("active");

//         bck.style.visibility = "visible";
//     });
// });
// ============= Độ hoàn thành  ==============
function updateProgress(card) {
    let practice = document.querySelectorAll(
        `#${card.dataset.target} tbody tr`
    );
    let count = practice.length;
    let process = 100 / count;

    let countProcess = document.querySelectorAll(
        `#${card.dataset.target} tbody .is-complete`
    ).length;
    let progressBar = card.querySelector("progress");

    if (countProcess > 0) {
        let valueprocess = countProcess * process;
        progressBar.value = valueprocess;
    } else {
        progressBar.value = 0;
    }
}

function observeRow(row, card) {
    const observer = new MutationObserver(function (mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.attributeName === "class") {
                updateProgress(card);
            }
        }
    });

    observer.observe(row, {
        attributes: true,
        attributeFilter: ["class"],
    });
}
const cardalls = document.querySelectorAll(".card-all");
cardalls.forEach(function (card) {
    let practice = document.querySelectorAll(
        `#${card.dataset.target} tbody tr`
    );

    practice.forEach(function (row) {
        observeRow(row, card);
    });

    updateProgress(card);
});

//thu phóng roadmap

// var scale = 1,
//     panning = false,
//     pointX = 0,
//     pointY = 0,
//     start = { x: 0, y: 0 },
//     zoom = document.querySelector(".view");
// function setTransform() {
//     zoom.style.transform =
//         "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
// }
// zoom.onmousedown = function (e) {
//     e.preventDefault();
//     start = { x: e.clientX - pointX, y: e.clientY - pointY };
//     panning = true;
// };
// zoom.onmouseup = function (e) {
//     panning = false;
// };
// zoom.onmousemove = function (e) {
//     e.preventDefault();
//     if (!panning) {
//         return;
//     }
//     pointX = e.clientX - start.x;
//     pointY = e.clientY - start.y;
//     setTransform();
// };
// zoom.onwheel = function (e) {
//     e.preventDefault();
//     var xs = (e.clientX - pointX) / scale,
//         ys = (e.clientY - pointY) / scale,
//         delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
//     delta > 0 ? (scale *= 1.2) : (scale /= 1.2);
//     pointX = e.clientX - xs * scale;
//     pointY = e.clientY - ys * scale;
//     setTransform();
// };
var scale = 1,
    panning = false,
    pointX = 0,
    pointY = 0,
    start = { x: 0, y: 0 },
    zoom = document.querySelector(".view");

function setTransform() {
    zoom.style.transform =
        "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
}

function onPointerDown(e) {
    e.preventDefault();
    let clientX = e.clientX || e.touches[0].clientX;
    let clientY = e.clientY || e.touches[0].clientY;
    start = { x: clientX - pointX, y: clientY - pointY };
    panning = true;
}

function onPointerUp() {
    panning = false;
}

function onPointerMove(e) {
    e.preventDefault();
    if (!panning) return;
    let clientX = e.clientX || e.touches[0].clientX;
    let clientY = e.clientY || e.touches[0].clientY;
    pointX = clientX - start.x;
    pointY = clientY - start.y;
    setTransform();
}

function onWheel(e) {
    e.preventDefault();
    var xs = (e.clientX - pointX) / scale,
        ys = (e.clientY - pointY) / scale,
        delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
    delta > 0 ? (scale *= 1.2) : (scale /= 1.2);
    pointX = e.clientX - xs * scale;
    pointY = e.clientY - ys * scale;
    setTransform();
}

// Sự kiện chuột
zoom.addEventListener("mousedown", onPointerDown);
zoom.addEventListener("mouseup", onPointerUp);
zoom.addEventListener("mousemove", onPointerMove);
zoom.addEventListener("wheel", onWheel);

// Sự kiện cảm ứng
zoom.addEventListener("touchstart", onPointerDown);
zoom.addEventListener("touchend", onPointerUp);
zoom.addEventListener("touchmove", onPointerMove);
