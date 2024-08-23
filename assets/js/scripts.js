// ============= Check-table ==============
let checks = document.querySelectorAll(".check");
checks.forEach(function (check) {
    check.addEventListener("click", function () {
        let icon = check.querySelector("i");
        let tr = check.closest("tr");

        // Kiểm tra nếu icon tồn tại
        if (icon) {
            if (icon.style.opacity === "1") {
                tr.classList.remove("is-complete");
                icon.style.opacity = "0";
                check.classList.remove("is-success");
            } else {
                icon.style.opacity = "1";
                check.classList.add("is-success");
                tr.classList.add("is-complete");
            }
        } else {
            console.warn("Không tìm thấy thẻ <i> gần nhất");
        }
    });
});

// ============= Check-pre ==============

let checkspre = document.querySelectorAll(".check-pre");
checkspre.forEach(function (check) {
    check.addEventListener("click", function () {
        let icon = check.querySelector("i");

        // Kiểm tra nếu icon tồn tại
        if (icon) {
            if (icon.style.opacity === "1") {
                icon.style.opacity = "0";
                check.classList.remove("is-success");
            } else {
                icon.style.opacity = "1";
                check.classList.add("is-success");
            }
        } else {
            console.warn("Không tìm thấy thẻ <i> gần nhất");
        }
    });
});

// ============= Tab ==============
// ẩn tab
let esc = document.querySelector(".esc");
esc.addEventListener("click", function () {
    let tab = esc.closest(".tab");
    let bck = esc.closest(".wrap-all");
    tab.style.opacity = "0";
    tab.style.visibility = "hidden";
    tab.style.transform = "translate(100%)";
    tab.style.transition= "all  .4s ease";

    bck.style.visibility = "hidden";
});
