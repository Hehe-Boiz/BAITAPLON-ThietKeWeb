
// Thay đổi kích thước layout 2 bên
let resizer = document.querySelector(".resizer");
let task = document.querySelector(".task");
let containerCode = document.querySelector(".container-code");

let startX = 0;
let startWidth = 0;

resizer.addEventListener("mousedown", function (e) {
    startX = e.clientX;
    startWidth = task.getBoundingClientRect().width;

    document.addEventListener("mousemove", mouseMoveHandlerLeftRight);
    document.addEventListener("mouseup", mouseUpHandlerLeftRight);
});

function mouseMoveHandlerLeftRight(e) {
    let dx = e.clientX - startX;

    // Tính toán chiều rộng mới theo đơn vị vw
    let newLeftWidthVW = ((startWidth + dx) * 100) / window.innerWidth;

    let minWidthVW = 0;
    let maxWidthVW = 100;
    let finalLeftWidthVW = Math.min(
        Math.max(newLeftWidthVW, minWidthVW),
        maxWidthVW
    );

    // Thiết lập chiều rộng mới cho task và containerCode
    task.style.width = `${finalLeftWidthVW}vw`;
    containerCode.style.width = `${100 - finalLeftWidthVW}vw`;

    // Ẩn nội dung bên trong nếu chiều rộng là 0
    if (finalLeftWidthVW <= 0) {
        task.style.display = "none";
        containerCode.style.width = "100vw - 10";
    } else if (finalLeftWidthVW >= 100) {
        containerCode.style.display = "none";
        task.style.width = "100vw - 10";
    } else {
        task.style.display = "";
        containerCode.style.display = "";
    }
}

function mouseUpHandlerLeftRight() {
    document.removeEventListener("mousemove", mouseMoveHandlerLeftRight);
    document.removeEventListener("mouseup", mouseUpHandlerLeftRight);
}

// Thay đổi kích thước layout trên dưới của code và test case

let resizerCode = document.querySelector(".resizer-code");
let code = document.querySelector(".code");
let testCase = document.querySelector(".test-case");

resizerCode.addEventListener("mousedown", function (e) {
    document.addEventListener("mousemove", mouseMoveHandlerTopBottom);
    document.addEventListener("mouseup", mouseUpHandlerTopBottom);
});

function mouseMoveHandlerTopBottom(e) {
    let containerRect = containerCode.getBoundingClientRect();
    let newCodeHeight = e.clientY - containerRect.top;

    let containerHeight = containerRect.height;
    let minHeight = 30;
    let maxHeight = containerHeight - 30;

    let adjustedCodeHeight = Math.max(
        minHeight,
        Math.min(newCodeHeight, maxHeight)
    );

    // Thiết lập chiều cao mới
    code.style.height = `${adjustedCodeHeight - 56}px`;
    testCase.style.height = `${containerHeight - adjustedCodeHeight - 15}px`;

    // Xử lý ẩn/hiện các phần tử
    if (adjustedCodeHeight <= minHeight) {
        code.classList.add("hidden-code");
        testCase.classList.remove("hidden-code");
        testCase.style.height = `${containerHeight - 46 - 5 - 10}px`;
    } else if (adjustedCodeHeight >= maxHeight) {
        testCase.classList.add("hidden-code");
        code.classList.remove("hidden-code");
        code.style.height = `${containerHeight - 46 - 5 - 10}px`;
    } else {
        code.classList.remove("hidden-code");
        testCase.classList.remove("hidden-code");
    }
}

function mouseUpHandlerTopBottom() {
    document.removeEventListener("mousemove", mouseMoveHandlerTopBottom);
    document.removeEventListener("mouseup", mouseUpHandlerTopBottom);
}

// nút chọn ngôn ngữ để code
let langBTN = document.querySelector(".lang-btn");
let dropdown = document.querySelector(".Dropdown");
langBTN.addEventListener("click", function () {
    dropdown.classList.toggle("expanded");
});

// đổi ngôn ngữ
let langBTNdefault = document.querySelector(".lang-btn .lang");
let langs = document.querySelectorAll(".dropdown-menu a");
langs.forEach((lang) => {
    lang.addEventListener("click", function () {
        let langOpinion = lang.textContent;
        langBTNdefault.textContent = langOpinion;
        langs.forEach((item) => {
            item.classList.remove("is-option-lang");
        });
        lang.classList.add("is-option-lang");
    });
});

document.addEventListener("click", function (event) {
    if (!langBTN.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove("expanded");
    }
});

// nút giải pháp
let navTaskOpinions = document.querySelectorAll(".nav-task li");
let taskContent = document.querySelector(".ques");
let soluContent = document.querySelector(".solu");

navTaskOpinions.forEach((opinion) => {
    opinion.addEventListener("click", () => {
        navTaskOpinions.forEach((opi) => {
            opi.classList.remove("is-active");
        });
        opinion.classList.add("is-active");
        if (opinion.classList.contains("ques-op")) {
            taskContent.style.display = "block";
            soluContent.style.display = "none";
        } else {
            taskContent.style.display = "none";
            soluContent.style.display = "block";
        }
    });
});

// tắt chúc mừng
let goodpass = document.querySelector(".good");
let bckgood = document.querySelector(".bck");
function hiddenGood() {
    console.log("thanh cong");
    goodpass.classList.add("hidden");
    bckgood.classList.remove("show");
    bckgood.classList.add("hidden");
}

goodpass.addEventListener("click", hiddenGood);
bckgood.addEventListener("click", hiddenGood);

// tạo nội dung cho tab
// Hàm để đọc dữ liệu JSON từ file
async function loadExercises() {
    let response = await fetch("./json/practice.json");
    exercises = await response.json();
    displayExercises(exercises);
}

// Hiển thị bài tập trên trang hiện tại
function displayExercises(exercises) {
    let tbody = document.querySelector(".pracice-table");
    tbody.innerHTML = "";
    exercises.forEach((exercise, index) => {
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
        aPrb.href = "code.html";
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
        let numberOrder = i + 1;
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

let escs = document.querySelectorAll(".icon-close");
escs.forEach((esc) => {
    esc.addEventListener("click", function () {
        let tab = esc.closest(".tab");
        let bck = document.querySelector(".wrap-all");
        tab.classList.remove("active");
        tab.classList.add("off");

        bck.style.visibility = "hidden";
    });
});

let bck = document.querySelector(".wrap-all");
bck.addEventListener("click", function () {
    let tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab) => {
        if (tab.classList.contains("active")) {
            tab.classList.remove("active");
            tab.classList.add("off");
        }
    });
    bck.style.visibility = "hidden";
});

let list = document.querySelector(".list-btn");
list.addEventListener("click", function () {
    let tab = document.querySelector(".tab");
    if (tab.classList.contains("off")) {
        tab.classList.remove("off");
        tab.classList.add("active");
    }
    bck.style.visibility = "visible";
});

//Nút thảo luận
// function showComent() {
//     let btnCommnet = document.querySelector(".user-ques");
//     let comments = document.querySelector(".wrapall-comment");
//     btnCommnet.addEventListener("click", () => {
//         if (comments.classList.contains("hidden-comments")) {
//             comments.classList.remove("hidden-comments");
//             comments.classList.add("show-comments");
//         }
//         else {
//             comments.classList.remove("show-comments");
//             comments.classList.add("hidden-comments");
//         }
//     });
// }
// showComent()
function showComent() {
    let btnCommnet = document.querySelector(".user-ques");
    let comments = document.querySelector(".wrapall-comment");
    let iconArrow = document.querySelector(".arrow i")
    
    btnCommnet.addEventListener("click", () => {
        if (comments.classList.contains("hidden-comments")) {
            comments.classList.remove("hidden-comments");
            comments.classList.add("show-comments");
            iconArrow.style.transform = "rotate(-180deg)";

        } else {

            comments.classList.remove("show-comments");
            comments.classList.add("hidden-comments");
            iconArrow.style.transform="rotate(0deg)";
        }
    });
}

showComent();
