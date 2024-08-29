// Thay đổi kích thước layout 2 bên
const resizer = document.querySelector(".resizer");
const task = document.querySelector(".task");
const containerCode = document.querySelector(".container-code");

let startX = 0;
let startWidth = 0;

resizer.addEventListener("mousedown", function (e) {
    startX = e.clientX;
    startWidth = task.getBoundingClientRect().width;

    document.addEventListener("mousemove", mouseMoveHandlerLeftRight);
    document.addEventListener("mouseup", mouseUpHandlerLeftRight);
});

function mouseMoveHandlerLeftRight(e) {
    const dx = e.clientX - startX;

    // Tính toán chiều rộng mới theo đơn vị vw
    const newLeftWidthVW = ((startWidth + dx) * 100) / window.innerWidth;

    const minWidthVW = 0;
    const maxWidthVW = 100;
    const finalLeftWidthVW = Math.min(
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

const resizerCode = document.querySelector(".resizer-code");
const code = document.querySelector(".code");
const testCase = document.querySelector(".test-case");

resizerCode.addEventListener("mousedown", function (e) {
    document.addEventListener("mousemove", mouseMoveHandlerTopBottom);
    document.addEventListener("mouseup", mouseUpHandlerTopBottom);
});

function mouseMoveHandlerTopBottom(e) {
    const containerRect = containerCode.getBoundingClientRect();
    const newCodeHeight = e.clientY - containerRect.top;

    const containerHeight = containerRect.height;
    const minHeight = 30;
    const maxHeight = containerHeight - 30;

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
let langBTNdefault  = document.querySelector(".lang-btn .lang");
let langs = document.querySelectorAll(".dropdown-menu a")
langs.forEach((lang) => {
    lang.addEventListener("click", function () {
        let langOpinion = lang.textContent;
        langBTNdefault.textContent=langOpinion;
        langs.forEach((item) => {
            item.classList.remove("is-option-lang");
        });
        lang.classList.add("is-option-lang");
    });
});


document.addEventListener("click", function (event) {
    if (
        !langBTN.contains(event.target) &&
        !dropdown.contains(event.target)
    ) {
        dropdown.classList.remove("expanded");
    }
});