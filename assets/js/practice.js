// nút setting

const setting = document.querySelector(".setting-in");
const opition = document.querySelector(".opitions");

// Bắt sự kiện click vào nút
setting.addEventListener("click", function (event) {
    if (
        opition.style.opacity === "0" ||
        opition.style.visibility === "hidden"
    ) {
        opition.style.opacity = "1";
        opition.style.visibility = "visible";
        opition.style.transition = "all  .4s ease";
    } else {
        opition.style.opacity = "0";
        opition.style.visibility = "hidden";
        opition.style.transition = "all  .4s ease";
    }

    // Ngăn sự kiện click lan ra ngoài (để không bị tắt ngay khi nhấn vào nút)
    event.stopPropagation();
});

// Bắt sự kiện click ra ngoài vùng danh sách ul
document.addEventListener("click", function (event) {
    if (!setting.contains(event.target) && !opition.contains(event.target)) {
        opition.style.opacity = "0";
        opition.style.visibility = "hidden";
        opition.style.transition = "all  .4s ease";
    }
});

// tính Acceptance
fetch("./json/acceptance.json")
    .then((response) => response.json())
    .then((jsonData) => {
        const table = document.querySelector("table");

        const rows = table
            .getElementsByTagName("tbody")[0]
            .getElementsByTagName("tr");
        for (let i = 0; i < rows.length; i++) {
            const exerciseName =
                rows[i].getElementsByTagName("td")[1].innerText;
            if (jsonData.hasOwnProperty(exerciseName)) {
                const passed = jsonData[exerciseName].passed;
                const total = jsonData[exerciseName].total;

                // tính phần trăm người thông qua
                const passPercentage = (passed / total) * 100;

                // Bước 5: Cập nhật cột thứ 3 với phần trăm đã tính toán
                rows[i].getElementsByTagName("td")[2].textContent =
                    passPercentage.toFixed(2) + "%";
                    rows[i].getElementsByTagName("td")[2].classList.add("center");
                    rows[i].getElementsByTagName("td")[2].classList.add("acc");

            }
        }
    })
    
