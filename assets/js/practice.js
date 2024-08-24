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

const topic = document.querySelector(".topics .wrap-name");
const opitiontopic = document.querySelector(".wrapall");
const imgtopic = topic.querySelector("img");

// Bắt sự kiện click vào nút
topic.addEventListener("click", function (event) {
    if (
        opitiontopic.style.opacity === "0" ||
        opitiontopic.style.visibility === "hidden"
    ) {
        opitiontopic.style.opacity = "1";
        opitiontopic.style.visibility = "visible";
        opitiontopic.style.transition = "all  .4s ease";
        imgtopic.style.transform="rotate(180deg)"
    } else {
        opitiontopic.style.opacity = "0";
        opitiontopic.style.visibility = "hidden";
        opitiontopic.style.transition = "all  .4s ease";
        imgtopic.style.transform="rotate(0deg)"
    }

    // Ngăn sự kiện click lan ra ngoài (để không bị tắt ngay khi nhấn vào nút)
    event.stopPropagation();
});

// Bắt sự kiện click ra ngoài vùng danh sách ul
document.addEventListener("click", function (event) {
    if (!topic.contains(event.target) && !opitiontopic.contains(event.target)) {
        opitiontopic.style.opacity = "0";
        opitiontopic.style.visibility = "hidden";
        opitiontopic.style.transition = "all  .4s ease";
        imgtopic.style.transform="rotate(0deg)"
    }
});

let exercises = []; // Mảng chứa dữ liệu bài tập
let rowsPerPage = 40; // Số bài tập mỗi trang
let currentPage = 1; // Trang hiện tại

// Hàm để đọc dữ liệu JSON từ file
async function loadExercises() {
    let response = await fetch("./json/practice.json");
    exercises = await response.json();
    setbuttonPage();
    displayExercises(currentPage);
}

// Hiển thị bài tập trên trang hiện tại
function displayExercises(page) {
    let start = (page - 1) * rowsPerPage;
    let end = start + rowsPerPage;
    let paginatedExercises = exercises.slice(start, end);

    let tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    paginatedExercises.forEach((exercise, index) => {
        let row = document.createElement("tr");

        // cột check
        let cellCheck = document.createElement("td");
        let divcheck = document.createElement("div");
        divcheck.classList.add("center");
        let check = document.createElement("span");
        check.classList.add("check");
        let tick = document.createElement("i");
        tick.classList.add("fa-solid", "fa-check");
        check.appendChild(tick);
        divcheck.appendChild(check);
        cellCheck.appendChild(divcheck);
        row.appendChild(cellCheck);

        // Cột tên bài tập
        let nameCell = document.createElement("td");
        let divName = document.createElement("div");
        let aPrb = document.createElement("a");
        divName.classList.add("center", "center-prb", "name");
        aPrb.textContent = exercise.name;
        divName.appendChild(aPrb);
        nameCell.appendChild(divName);
        row.appendChild(nameCell);

        // Cột tỷ lệ thông qua
        let passingRateCell = document.createElement("td");
        let passingRate =
            ((exercise.passed / exercise.total) * 100).toFixed(2) + "%";
        passingRateCell.textContent = passingRate;
        passingRateCell.classList.add("center");
        passingRateCell.classList.add("acc");
        row.appendChild(passingRateCell);

        // Cột độ khó
        let difficultyCell = document.createElement("td");
        let divDiff = document.createElement("div");
        divDiff.classList.add("center");
        divDiff.textContent = exercise.diff;
        difficultyCell.appendChild(divDiff);
        row.appendChild(difficultyCell);

        tbody.appendChild(row);
    });
    // độ khó
    let table = document.querySelector("table");
    let rows = table
        .getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        let td = rows[i].getElementsByTagName("td")[3].querySelector("div");
        let exerciseLevel = td.textContent;

        if (exerciseLevel === "Easy") {
            td.classList.add("easy");
        } else if (exerciseLevel === "Medium") {
            td.classList.add("medium");
        } else {
            td.classList.add("hard");
        }
    }
    // Đánh số thứ tự
    for (let i = 0; i < rows.length; i++) {
        let exerciseNameCell = rows[i]
            .getElementsByTagName("td")[1]
            .querySelector("div")
            .querySelector("a");
        let exerciseName = exerciseNameCell.textContent;
        let numberOrder = start + i + 1;
        exerciseNameCell.textContent = numberOrder + ". " + exerciseName;
    }
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
}

// Khởi tạo khi trang web tải xong
loadExercises();

function setbuttonPage() {
    // Đếm số trang
    let pageCount = Math.ceil(exercises.length / rowsPerPage);
    let pageNav = document.querySelector(".nav-table");
    pageNav.innerHTML = "";

    // tạo mũi tên bên trái
    let prevButton = document.createElement("button");
    let left = document.createElement("img");
    left.src = "./assets/icons/left.svg";
    prevButton.appendChild(left);
    prevButton.classList.add("nav-btn");
    left.addEventListener("load", () => {
        console.log("Hình ảnh đã được tải thành công.");
    });
    // vô hiệu hóa khi trang ở số 1
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = function () {
        if (currentPage > 1) {
            currentPage--;
            displayExercises(currentPage);
            setbuttonPage();
        }
    };
    if (currentPage === 1) {
        prevButton.style.opacity = "0.5";
        prevButton.style.pointerEvents = "none";
    }
    pageNav.appendChild(prevButton);

    // luôn tạo trang số 1 cho người dùng quay về
    let firstPage = document.createElement("button");
    firstPage.textContent = "1";
    firstPage.classList.add("nav-btn", "btn-mid");
    if (currentPage === 1) {
        firstPage.disabled = true;
    } else {
        firstPage.onclick = function () {
            currentPage = 1;
            displayExercises(currentPage);
            setbuttonPage();
        };
    }
    pageNav.appendChild(firstPage);

    // tạo nút ...
    if (currentPage > 3) {
        let ellipsis = document.createElement("button");
        ellipsis.classList.add("nav-btn", "btn-mid");
        ellipsis.textContent = "...";
        pageNav.appendChild(ellipsis);
    }

    // Hiển thị các nút số gần trang hiện tại
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(pageCount - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
        let pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.classList.add("nav-btn", "btn-mid");
        if (i === currentPage) {
            pageButton.disabled = true;
        } else {
            pageButton.onclick = function () {
                currentPage = i;
                displayExercises(currentPage);
                setbuttonPage();
            };
        }
        pageNav.appendChild(pageButton);
    }

    // Hiển thị nút "..." nếu có các trang sau
    if (currentPage < pageCount - 2) {
        let ellipsis = document.createElement("button");
        ellipsis.classList.add("nav-btn", "btn-mid");
        ellipsis.textContent = "...";
        pageNav.appendChild(ellipsis);
    }

    // Hiển thị nút của trang cuối cùng nếu cần
    let lastPage = document.createElement("button");
    lastPage.textContent = pageCount;
    lastPage.classList.add("nav-btn", "btn-mid");
    if (currentPage === pageCount) {
        lastPage.disabled = true;
    } else {
        lastPage.onclick = function () {
            currentPage = pageCount;
            displayExercises(currentPage);
            setbuttonPage();
        };
    }
    pageNav.appendChild(lastPage);

    // tạo mũi tên bên trái
    let nextButton = document.createElement("button");
    let right = document.createElement("img");
    right.src = "./assets/icons/right.svg";
    nextButton.appendChild(right);
    nextButton.classList.add("nav-btn");
    // vô hiệu hóa khi trang ở số cuối
    nextButton.disabled = currentPage === pageCount;
    nextButton.onclick = function () {
        if (currentPage < pageCount) {
            currentPage++;
            displayExercises(currentPage);
            setbuttonPage();
        }
    };
    if (currentPage === pageCount) {
        nextButton.style.opacity = "0.5";
        nextButton.style.pointerEvents = "none";
    }
    pageNav.appendChild(nextButton);
}

// Tìm kiếm bài tập
let debounceTimeout;
document
    .querySelector(".sea-input")
    .addEventListener("keyup", function (event) {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            let input = this.value.toLowerCase();
            let listItems = document.querySelectorAll("tr .name");
            if (input === "") {
                // Nếu ô tìm kiếm rỗng, hiển thị lại tất cả các dòng
                listItems.forEach(function (item) {
                    let tr = item.closest("tr");
                    tr.style.display = "";
                });
            } else if (event.key === "Enter") {
                listItems.forEach(function (item) {
                    let tr = item.closest("tr");
                    if (item.textContent.toLowerCase().includes(input)) {
                        tr.style.display = "";
                    } else {
                        tr.style.display = "none";
                    }
                });
            }
        }, 300);
    });
