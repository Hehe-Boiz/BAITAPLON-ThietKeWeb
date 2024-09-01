// Các nút fillter

// nút setting
const settingWrap = document.querySelector(".wrap-setting");
const setting = document.querySelector(".setting-in");
const opition = document.querySelector(".opitions");
// nút chủ đề
const topic = document.querySelector(".topics .wrap-name");
const opitiontopic = document.querySelector(".wrapall");
const imgtopic = topic.querySelector("img");
// nút độ khó
const diff = document.querySelector(".diff .wrap-name");
const opitiondiff = document.querySelector(".opitions-diff");
const imgdiff = diff.querySelector("img");
// nút trạng thái
const btnstatus = document.querySelector(".status .wrap-name");
const opitionstatus = document.querySelector(".opitions-status");
const imgstatus = btnstatus.querySelector("img");

//hàm đống tất cả nút khác
// Hàm mở/đóng menu
function toggleMenu(menu, button, rotateButton, rotateDegree) {
    if (menu.classList.contains("hidden")) {
        menu.classList.remove("hidden");
        menu.classList.add("show");
        if (rotateDegree === 180) {
            rotateButton.style.transform = `rotate(${rotateDegree}deg)`;
        } else {
            if (setting.classList.contains("rotate0")) {
                setting.classList.remove("rotate0");
                setting.classList.add("rotate360");
            } else {
                setting.classList.add("rotate360");
            }
        }
    } else {
        menu.classList.remove("show");
        menu.classList.add("hidden");

        if (rotateDegree === 180) {
            rotateButton.style.transform = "rotate(0deg)";
        } else {
            if (setting.classList.contains("rotate360")) {
                setting.classList.remove("rotate3600");
                setting.classList.add("rotate0");
            } else {
                setting.classList.add("rotate0");
            }
        }
    }
}

// Hàm đóng tất cả các menu
function closeAllMenus(except) {
    const menus = [opition, opitiontopic, opitiondiff, opitionstatus];
    const buttons = [setting, imgtopic, imgdiff, imgstatus];

    menus.forEach((menu, index) => {
        if (menu !== except) {
            if (menu.classList.contains("show")) {
                menu.classList.remove("show");
                menu.classList.add("hidden");
                buttons[index].style.transform = "rotate(0deg)";
                if (buttons[index] === setting) {
                    if (setting.classList.contains("rotate360")) {
                        setting.classList.remove("rotate3600");
                        setting.classList.add("rotate0");
                    } else {
                        setting.classList.add("rotate0");
                    }
                }
            }
        }
    });
}

// Xử lý sự kiện click cho từng nút
settingWrap.addEventListener("click", function (event) {
    event.stopPropagation();
    closeAllMenus(opition);
    toggleMenu(opition, settingWrap, setting, 360);
});

topic.addEventListener("click", function (event) {
    event.stopPropagation();
    closeAllMenus(opitiontopic);
    toggleMenu(opitiontopic, topic, imgtopic, 180);
});

diff.addEventListener("click", function (event) {
    event.stopPropagation();
    closeAllMenus(opitiondiff);
    toggleMenu(opitiondiff, diff, imgdiff, 180);
});

btnstatus.addEventListener("click", function (event) {
    event.stopPropagation();
    closeAllMenus(opitionstatus);
    toggleMenu(opitionstatus, btnstatus, imgstatus, 180);
});

// Đóng menu khi click ra ngoài
document.addEventListener("click", function (event) {
    if (
        !settingWrap.contains(event.target) &&
        !opition.contains(event.target) &&
        !topic.contains(event.target) &&
        !opitiontopic.contains(event.target) &&
        !diff.contains(event.target) &&
        !opitiondiff.contains(event.target) &&
        !btnstatus.contains(event.target) &&
        !opitionstatus.contains(event.target)
    ) {
        closeAllMenus(null);
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
function displayExercises(page, filteredExercises = exercises) {
    let start = (page - 1) * rowsPerPage;
    let end = start + rowsPerPage;
    let paginatedExercises = filteredExercises.slice(start, end);

    let tbody = document.querySelector(".pracice-table");
    tbody.innerHTML = "";

    paginatedExercises.forEach((exercise, index) => {
        let row = document.createElement("tr");

        // cột check
        let cellCheck = document.createElement("td");
        let divcheck = document.createElement("div");
        divcheck.classList.add("center");
        if (exercise.access === "Premium") {
            let tick = document.createElement("i");
            tick.classList.add("fa-solid", "fa-lock");
            tick.style.color = "#FFD43B";
            divcheck.appendChild(tick);
            cellCheck.appendChild(divcheck);
            row.appendChild(cellCheck);
        } else {
            let check = document.createElement("span");
            check.classList.add("check");
            let tick = document.createElement("i");
            tick.classList.add("fa-solid", "fa-check");
            check.appendChild(tick);
            divcheck.appendChild(check);
            cellCheck.appendChild(divcheck);
            row.appendChild(cellCheck);
        }

        // Cột tên bài tập
        let nameCell = document.createElement("td");
        let divName = document.createElement("div");
        let aPrb = document.createElement("a");
        // aPrb.href = "code.html";
        if (exercise.access === "Premium") {
            aPrb.classList.add("premium");
        }
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
    let table = document.querySelector(".tbl-prac");
    let rows = table.querySelector(".pracice-table").getElementsByTagName("tr");

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
    checkLogin();

}

// Khởi tạo khi trang web tải xong
loadExercises();

function setbuttonPage(filteredExercises = exercises) {
    // Đếm số trang dựa trên kết quả đã lọc
    let pageCount = Math.ceil(filteredExercises.length / rowsPerPage);
    let pageNav = document.querySelector(".nav-table");
    pageNav.innerHTML = "";

    // tạo mũi tên bên trái
    let prevButton = document.createElement("button");
    let left = document.createElement("img");
    left.src = "./assets/icons/left.svg";
    prevButton.appendChild(left);
    prevButton.classList.add("nav-btn");
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

    // Hiển thị các nút số gần trang hiện tại, ngoại trừ trang 1 và trang cuối cùng
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
    if (pageCount > 1) {
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
    }

    // tạo mũi tên bên phải
    let nextButton = document.createElement("button");
    let right = document.createElement("img");
    right.src = "./assets/icons/right.svg";
    nextButton.appendChild(right);
    nextButton.classList.add("nav-btn");
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

let selectedTopics = new Set(); // Sử dụng Set để lưu trữ các chủ đề đã chọn
let currentUser = null;
// Tạo các nút button tags để lọc
// tải dữ liệu người dùng và dữ liệu bài tập
Promise.all([
    fetch("./json/practice.json").then((response) => response.json()),
    fetch("./json/user.json").then((response) => response.json()),
]).then(([exercises, usersData]) => {
    let users = usersData.users;
    currentUser = users.find((user) => user.username === "HeheBoiz");

    let allTags = exercises.flatMap((exercise) => exercise.tags);
    let uniqueTags = [...new Set(allTags)];
    let wrapTopics = document.querySelector(".wrap");

    uniqueTags.forEach((tag) => {
        let button = document.createElement("span");

        button.textContent = tag;
        button.classList.add("topic", "cursor");
        wrapTopics.appendChild(button);
    });

    // Gán sự kiện cho các nút tag vừa tạo
    let topics = document.querySelectorAll(".topic");
    topics.forEach((topic) => {
        topic.addEventListener("click", () => {
            let topicText = topic.textContent.trim();

            // Thay đổi trạng thái của nút
            if (selectedTopics.has(topicText)) {
                topic.classList.remove("is-opition");
                let contentTopic = topic.textContent.trim();
                deleteTagSelec(contentTopic);
                selectedTopics.delete(topicText); // Xóa chủ đề khỏi Set nếu bị bỏ chọn
            } else {
                topic.classList.add("is-opition");
                let contentTopic = topic.textContent.trim();
                createTagSelec(contentTopic);
                selectedTopics.add(topicText); // Thêm chủ đề vào Set nếu được chọn
            }

            // Gọi hàm để lọc và hiển thị bài tập sau khi cập nhật chủ đề đã chọn
            filterExercises(selectedTopics, exercises);
        });
    });
    let accSelects = document.querySelectorAll(".opition");
    accSelects.forEach((accSelect) => {
        accSelect.addEventListener("click", () => {
            let accSelectText = accSelect.querySelector("p").textContent.trim();
            let check = accSelect.querySelector(".check-pre");
            let icon = check.querySelector("i");
            // Thay đổi trạng thái của nút
            if (selectedTopics.has(accSelectText)) {
                icon.style.opacity = "0";
                check.classList.remove("is-success");
                let contentAcc = accSelectText;
                deleteTagSelec(contentAcc);
                selectedTopics.delete(contentAcc); // Xóa chủ đề khỏi Set nếu bị bỏ chọn
            } else {
                icon.style.opacity = "1";
                check.classList.add("is-success");
                let contentAcc = accSelectText;
                createTagSelec(contentAcc);
                selectedTopics.add(contentAcc); // Thêm chủ đề vào Set nếu được chọn
            }

            // Gọi hàm để lọc và hiển thị bài tập sau khi cập nhật chủ đề đã chọn
            filterExercises(selectedTopics, exercises);
        });
    });
    let diffSelects = document.querySelectorAll(".opition-diff");
    diffSelects.forEach((diffSelect) => {
        diffSelect.addEventListener("click", () => {
            let diffSelectText = diffSelect
                .querySelector("p")
                .textContent.trim();
            let check = diffSelect.querySelector(".check-pre");
            let icon = check.querySelector("i");
            // Thay đổi trạng thái của nút
            if (selectedTopics.has(diffSelectText)) {
                icon.style.opacity = "0";
                check.classList.remove("is-success");
                let contentAcc = diffSelectText;
                deleteTagSelec(contentAcc);
                selectedTopics.delete(contentAcc); // Xóa chủ đề khỏi Set nếu bị bỏ chọn
            } else {
                icon.style.opacity = "1";
                check.classList.add("is-success");
                let contentAcc = diffSelectText;
                createTagSelec(contentAcc);
                selectedTopics.add(contentAcc); // Thêm chủ đề vào Set nếu được chọn
            }

            // Gọi hàm để lọc và hiển thị bài tập sau khi cập nhật chủ đề đã chọn
            filterExercises(selectedTopics, exercises);
        });
    });
    let statusSelects = document.querySelectorAll(".opition-status");
    statusSelects.forEach((statusSelect) => {
        statusSelect.addEventListener("click", () => {
            let statusSelectText = statusSelect
                .querySelector("p")
                .textContent.trim();
            let check = statusSelect.querySelector(".check-pre");
            let icon = check.querySelector("i");
            // Thay đổi trạng thái của nút
            if (selectedTopics.has(statusSelectText)) {
                icon.style.opacity = "0";
                check.classList.remove("is-success");
                let contentAcc = statusSelectText;
                deleteTagSelec(contentAcc);
                selectedTopics.delete(contentAcc); // Xóa chủ đề khỏi Set nếu bị bỏ chọn
            } else {
                icon.style.opacity = "1";
                check.classList.add("is-success");
                let contentAcc = statusSelectText;
                createTagSelec(contentAcc);
                selectedTopics.add(contentAcc); // Thêm chủ đề vào Set nếu được chọn
            }

            // Gọi hàm để lọc và hiển thị bài tập sau khi cập nhật chủ đề đã chọn
            filterExercises(selectedTopics, exercises);
        });
    });
});

// Hàm lọc bài tập dựa trên các chủ đề đã chọn
function filterExercises(selectedTopics, exercises) {
    let filteredExercises;
    let hasCompletionFilter =
        selectedTopics.has("Hoàn thành") || selectedTopics.has("Chưa làm");

    if (selectedTopics.size === 0) {
        filteredExercises = exercises; // Nếu không có bộ lọc nào được chọn, trả về tất cả bài tập
    } else {
        // Lọc bài tập dựa trên các chủ đề đã chọn
        filteredExercises = exercises.filter((exercise) => {
            // Kiểm tra tags và access
            return Array.from(selectedTopics).every(
                (filter) =>
                    exercise.tags.includes(filter) ||
                    exercise.access === filter ||
                    exercise.diff === filter
            );
        });
    }

    // Cập nhật số trang và hiển thị trang đầu tiên với kết quả đã lọc
    currentPage = 1;
    setbuttonPage(filteredExercises);
    displayExercises(currentPage, filteredExercises);
}

// Hàm hiển thị các bài tập đã lọc
function showExercises(Exercises) {
    let namePractices = document.querySelectorAll("tr .name a");
    // Ẩn tất cả các hàng trước
    namePractices.forEach((practice) => {
        let tr = practice.closest("tr");
        tr.style.display = "none";
    });
    // Hiển thị các bài tập đã lọc
    Exercises.forEach((Exercise) => {
        namePractices.forEach((practice) => {
            console.log(Exercise.name);
            let tr = practice.closest("tr");
            if (practice.textContent.includes(Exercise.name)) {
                tr.style.display = "";
            }
        });
    });
}

// Nút reset
let reset = document.querySelector(".reset");
let tagsContainer = document.querySelector(".tags-contain");

reset.addEventListener("click", () => {
    let optionAccs = document.querySelectorAll(".opition");
    let optionDiffs = document.querySelectorAll(".opition-diff");
    let optionStatus = document.querySelectorAll(".opition-status");
    tagsContainer.innerHTML = "";
    // Loại bỏ class "is-opition" khỏi tất cả các thẻ topic
    let topics = document.querySelectorAll(".topic");
    topics.forEach((topic) => {
        topic.classList.remove("is-opition");
    });

    optionAccs.forEach((optionAcc) => {
        let check = optionAcc.querySelector(".opition .check-pre");
        let p = optionAcc.querySelector("p");
        let icon = check.querySelector("i");
        icon.style.opacity = "0";
        check.classList.remove("is-success");
    });
    optionDiffs.forEach((optionDiff) => {
        let check = optionDiff.querySelector(".opition-diff .check-pre");
        let p = optionDiff.querySelector("p");
        let icon = check.querySelector("i");
        icon.style.opacity = "0";
        check.classList.remove("is-success");
    });
    optionStatus.forEach((optionStatu) => {
        let check = optionStatu.querySelector(".opition-status .check-pre");
        let p = optionStatu.querySelector("p");
        let icon = check.querySelector("i");
        icon.style.opacity = "0";
        check.classList.remove("is-success");
    });

    // Xóa tất cả các chủ đề đã chọn
    selectedTopics.clear();

    // Hiển thị lại tất cả bài tập
    currentPage = 1; // Quay về trang đầu tiên
    displayExercises(currentPage); // Tái tạo lại bảng với tất cả các bài tập
    setbuttonPage(); // Cập nhật lại nút phân trang
});
//tạo tags khi ấn trên filter

function createTagSelec(content) {
    let tags = document.querySelectorAll(".topic");
    let optionAccs = document.querySelectorAll(".opition");
    let optionDiffs = document.querySelectorAll(".opition-diff");
    let tagsContainer = document.querySelector(".tags-contain");
    let intagSelect = document.createElement("span");
    intagSelect.classList.add("topic-selec");
    intagSelect.innerHTML = `
                <div class="wrap-reset">
                    <span class="tmp">${content}</span>
                    <span class="wrap-i">
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                </div>`;

    // Thêm chức năng xóa tag
    intagSelect
        .querySelector(".fa-xmark")
        .addEventListener("click", function () {
            intagSelect.remove();
            // Bỏ chọn tag tương ứng trong danh sách các topic
            tags.forEach((tag) => {
                if (tag.textContent === content) {
                    tag.classList.remove("is-opition");
                }
            });

            optionAccs.forEach((optionAcc) => {
                let check = optionAcc.querySelector(".opition .check-pre");
                let p = optionAcc.querySelector("p");
                let icon = check.querySelector("i");
                if (p.textContent === content) {
                    icon.style.opacity = "0";
                    check.classList.remove("is-success");
                }
            });
            optionDiffs.forEach((optionDiff) => {
                let check = optionDiff.querySelector(
                    ".opition-diff .check-pre"
                );
                let p = optionDiff.querySelector("p");
                let icon = check.querySelector("i");
                if (p.textContent === content) {
                    icon.style.opacity = "0";
                    check.classList.remove("is-success");
                }
            });
            // Cập nhật lại danh sách selectedTopics và lọc lại bài tập
            selectedTopics.delete(content);
            filterExercises(selectedTopics, exercises);
        });

    tagsContainer.appendChild(intagSelect);
}

function deleteTagSelec(content) {
    let selects = document
        .querySelector(".tags-contain")
        .querySelectorAll(".topic-selec");

    selects.forEach((select) => {
        let span = select.querySelector(".wrap-reset span.tmp");
        console.log(span);
        if (span && span.textContent.trim() === content) {
            select.remove();
        }
    });
}

function checkLogin() {
    const isLoggedIn = false; // Thay đổi giá trị này dựa trên trạng thái thực tế của người dùng

    document.querySelectorAll("a.premium").forEach((link) => {
        if (!isLoggedIn) {
            link.addEventListener("click", function (event) {
                let tr = link.closest("tr");

                event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
                alert("Bạn cần đăng nhập để truy cập trang này.");
            });
        }
    });
}