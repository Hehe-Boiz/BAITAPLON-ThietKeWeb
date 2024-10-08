
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
        }
    });
});
// ============= Chặn Premium ==============
function checkLogin() {
    const isLoggedIn = false; 

    document.querySelectorAll("td a.premium").forEach((link) => {
        if (!isLoggedIn) {
            link.addEventListener("click", function (event) {
                let tr = link.closest("tr");

                event.preventDefault(); 
                alert("Bạn cần đăng nhập để truy cập trang này.");
            });
        }
    });
}

