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

