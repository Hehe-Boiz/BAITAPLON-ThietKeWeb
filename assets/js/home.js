const canvas = document.getElementById("progressCircle");

// Tăng độ phân giải của canvas
const scale = window.devicePixelRatio * 3;
if (window.innerWidth > 991.98 && window.innerWidth < 1100) {
    canvas.width = (canvas.clientWidth * scale) / 1.4;
    canvas.height = (canvas.clientHeight * scale) / 1.305;
} else if (window.innerWidth < 991.98) {
    canvas.width = (canvas.clientWidth * scale) / 1.05;
    canvas.height = (canvas.clientHeight * scale) / 1.105;
} else if (window.innerWidth > 992) {
    canvas.width = (canvas.clientWidth * scale) / 1.9;
    canvas.height = (canvas.clientHeight * scale) / 1.3;
}

canvas.style.width = `${canvas.clientWidth / 3}px`;
canvas.style.height = `${canvas.clientHeight}px`;

let ctx = canvas.getContext("2d");

// // Điều chỉnh tỷ lệ vẽ
ctx.scale(scale, scale);

let centerX = canvas.width / 2 / scale;
let centerY = canvas.height / 2 / scale;
let radius = 60;
let lineWidth = 10;
let startAngle = -0.5 * Math.PI;

let progressDraw = 0;

function animate(progressComplete) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Vẽ đường tròn nền
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = lineWidth;
    // ctx.strokeStyle = "#e0e0e0";
    ctx.strokeStyle = "#cfcccc";
    ctx.stroke();

    if (!checkGoal()) {
        // Vẽ văn bản
        ctx.font = "600 15px Arial";
        ctx.fillStyle = "#2a2a72";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`Chưa đặt mục tiêu`, centerX, centerY);
    } else if (checkGoal()) {
        // Vẽ đường tròn tiến trình
        let endAngle = (progressDraw / 100) * 2 * Math.PI + startAngle;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = "#4fc3f7";
        ctx.lineCap = "round";
        ctx.stroke();

        // Vẽ văn bản
        ctx.font = "bold 24px Poppins";
        ctx.fillStyle = "#2a2a72";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${Math.floor(progressDraw)}%`, centerX, centerY - 10);

        if (progressDraw === 100) {
            ctx.font = "500 10px Arial";
            ctx.fillStyle = "#2a2a72";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("Hoàn thành", centerX, centerY + 10);
        } else {
            ctx.font = "500 10px Arial";
            ctx.fillStyle = "#2a2a72";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("Chưa đạt", centerX, centerY + 10);
        }

        if (progressDraw < progressComplete) {
            progressDraw += 1;
            requestAnimationFrame(() => animate(progressComplete));
        }
    }
}

// Khởi tạo IntersectionObserver
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animate(70);
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

observer.observe(document.getElementById("progressCircle"));
//khi hàm màn hình thay đổi sẽ tự vẽ lại
function graphResize() {
    let scale = window.devicePixelRatio * 3;
    if (window.innerWidth > 991.98 && window.innerWidth < 1100) {
        canvas.width = (canvas.clientWidth * scale) / 1.4;
        canvas.height = (canvas.clientHeight * scale) / 1.305;
    } else if (window.innerWidth < 991.98) {
        canvas.width = (canvas.clientWidth * scale) / 1.05;
        canvas.height = (canvas.clientHeight * scale) / 1.105;
    } else if (window.innerWidth > 1110 && window.innerWidth < 2000) {
        canvas.width = (canvas.clientWidth * scale) / 0.4;
        canvas.height = (canvas.clientHeight * scale) / 1.25;
    } else if (window.innerWidth > 992) {
        canvas.width = (canvas.clientWidth * scale) / 1.9;
        canvas.height = (canvas.clientHeight * scale) / 1.3;
    }
    canvas.style.width = `${canvas.clientWidth / 3}px`;
    canvas.style.height = `${canvas.clientHeight}px`;

    ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);

    centerX = canvas.width / 2 / scale;
    centerY = canvas.height / 2 / scale;
    progressDraw = 0;
    animate(70);
}

window.addEventListener("resize", graphResize);

//random bài tập
let selectedExercises = [];
fetch("./json/practice.json")
    .then((response) => response.json())
    .then((exercises) => {
        const freeExercises = exercises.filter(
            (exercise) => exercise.access === "Free"
        );

        function getRandomExercises(exercises, count) {
            const shuffled = exercises.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        }

        const randomExercises = getRandomExercises(freeExercises, 3);

        selectedExercises.length = 0;
        selectedExercises.push(...randomExercises);

        updateTable(selectedExercises);
    });

function updateTable(selectedExercises) {
    let rows = document.querySelectorAll(".challenge tbody tr");

    selectedExercises.forEach((exercise, index) => {
        const row = rows[index];

        const nameElement = row.querySelector(".center-prb a");
        nameElement.textContent = exercise.name;

        const difficultyElement = row.querySelector(".diff-color");
        difficultyElement.textContent = exercise.diff;

        difficultyElement.className = `center ${exercise.diff.toLowerCase()}`;
    });
}

let checks = document.querySelector(".challenge").querySelectorAll(".check");
checks.forEach((check) => {
    check.addEventListener("click", function (event) {
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

let days = document.querySelectorAll(".center-date");
let today = new Date();
let selectedDate;

function attachDayClickEventsGoal() {
    let days = document.querySelectorAll(".center-date");
    let Month = currentDate.getMonth() + 1;
    let Year = currentDate.getFullYear();

    days.forEach((day) => {
        day.addEventListener("click", function () {
            let selectedDay = parseInt(day.textContent);
            selectedDate = new Date(Year, Month - 1, selectedDay);
            if (checkGoal()) {
                animate(70);
            }
        });
    });
}

function checkGoal() {
    let inputGoalValue = document
        .querySelector(".input-goal .goal")
        .value.trim();
    if (
        inputGoalValue === "" ||
        !selectedDate ||
        !document.querySelector(".is-selecDate")
    ) {
        return false;
    }
    return true;
}

function handleInputChange() {
    if (checkGoal()) {
        animate(70);
    } else {
        animate(0);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let inputGoalElement = document.querySelector(".input-goal .goal");

    if (inputGoalElement) {
        inputGoalElement.addEventListener("input", handleInputChange);
        inputGoalElement.addEventListener("keydown", handleInputChange);
    }

    attachDayClickEventsGoal();

    // Khởi tạo MutationObserver cho các phần tử trong `days`
    let days = document.querySelectorAll(".center-date");
    days.forEach((day) => {
        observerCheck.observe(day, { attributes: true });
    });

    // Khởi tạo đồ thị ban đầu
    animate(0);
});

function ClassChange(mutationsList) {
    for (let mutation of mutationsList) {
        if (
            mutation.type === "attributes" &&
            mutation.attributeName === "class"
        ) {
            console.log("Class đã thay đổi trên phần tử:", mutation.target);
            if (checkGoal()) {
                animate(70);
            } else {
                animate(0);
            }
        }
    }
}

// Tạo một MutationObserver và gán hàm xử lý sự thay đổi class
let observerCheck = new MutationObserver(ClassChange);

// đánh z-index
function zIndexChange() {
    let imgAchies = document.querySelectorAll(".wrap-achie img");
    let zindex = 3;

    imgAchies.forEach((imgAchie) => {
        imgAchie.style.zIndex = zindex;
        zindex++;
    });
}
zIndexChange();

fetch("./json/user.json")
    .then((response) => response.json())
    .then((users) => {
        // Sort users by total completed exercises in descending order
        users.sort((a, b) => {
            let totalA =
                a.completed.filter((c) => c.difficulty === "Easy").length +
                a.completed.filter((c) => c.difficulty === "Medium").length +
                a.completed.filter((c) => c.difficulty === "Hard").length;
            let totalB =
                b.completed.filter((c) => c.difficulty === "Easy").length +
                b.completed.filter((c) => c.difficulty === "Medium").length +
                b.completed.filter((c) => c.difficulty === "Hard").length;
            return totalB - totalA;
        });

        let topUsers = users.slice(0, 10);
        let rankingContainer = document.querySelector(".rank-table tbody");

        rankingContainer.innerHTML = "";

        topUsers.forEach((user, index) => {
            let completed = user.completed;
            let easyCount = completed.filter(
                (c) => c.difficulty === "Easy"
            ).length;
            let mediumCount = completed.filter(
                (c) => c.difficulty === "Medium"
            ).length;
            let hardCount = completed.filter(
                (c) => c.difficulty === "Hard"
            ).length;

            let rankingTr = document.createElement("tr");
            rankingTr.innerHTML = `
                <td><div class="center ${
                    index === 0
                        ? "top1-number"
                        : index === 1
                        ? "top2-number"
                        : index === 2
                        ? "top3-number"
                        : ""
                } number">${index + 1}</div></td>
                                <td>
                                    <div class="center fix-rank">
                                        <i class="fa-solid fa-caret-up" style="color: #36da16;" class="up"></i>
                                        <span class="amount-up">+${
                                            index * 10
                                        }</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="center wrap-avatar">
                                        <div class=" ${
                                            index === 0
                                                ? "top1-rank"
                                                : index === 1
                                                ? "top2-rank"
                                                : index === 2
                                                ? "top3-rank"
                                                : ""
                                        } ">
                                            <img
                                                src="${user.avatar}"
                                                alt=""
                                                class="avt-rank"
                                            />
                                        </div>
                                        <span class="ranking-crown"
                                            ><img src="assets/icons/crown-${
                                                index === 0
                                                    ? "gold"
                                                    : index === 1
                                                    ? "silver"
                                                    : index === 2
                                                    ? "bronze"
                                                    : "none"
                                            }.svg" alt=""/></span>
                                    </div>
                                </td>
                                <td class="info">
                                    <div class="center ranking-info">
                                        <div class="ranking-name">${
                                            user.username
                                        }</div>
                                        <div class="passed">
                                            Thông qua: ${
                                                easyCount +
                                                mediumCount +
                                                hardCount
                                            }
                                        </div>
                                    </div>
                                </td>
                                <td><div class="center quantity">${hardCount}</div></td>
                                <td><div class="center quantity">${mediumCount}</div></td>
                                <td><div class="center quantity">${easyCount}</div></td>
            `;

            rankingContainer.appendChild(rankingTr);
        });
    });


async function loadUserData() {
    if (islog === "true") {
        let response = await fetch("./json/user.json");
        let usersFromJSON = await response.json();

        let user = localStorage.getItem("log");
        let data = JSON.parse(user);
        let loggedInEmail = data.email; // Đảm bảo đã lưu email của người dùng khi đăng nhập
        let userFromJSON = usersFromJSON.find(
            (user) => user.accountName === loggedInEmail
        );
        const wrapDiv = document.createElement("div");
        wrapDiv.className = "wrap-userLog";

        // Giả sử bạn có một phần tử HTML để hiển thị ảnh đại diện
        let username = document.querySelector(".username");
        if (userFromJSON) {
            let imgava = document.querySelector(".user-home-ava");
            imgava.src = userFromJSON.avatar;
            username.textContent = userFromJSON.username

        }
        let n = 100;
        let level = document.querySelector(".user-level");
        level.textContent = "Trình độ: Cao thủ"
        let  rankuser = document.querySelector(".rank.top1");
        rankuser.innerHTML = `<span class="bold">Rank:</span> ${Math.floor(Math.random() * n)}`
        let pros = document.querySelectorAll(".pro-pro")
        pros.forEach((pro)=>{
            pro.value = Math.floor(Math.random() * n)
        });
        let fireimg = document.querySelector(".fire-fire")
        fireimg.style.filter = "none";
        let numberste = document.querySelector(".wrap-streak .number-day");
        numberste.textContent = Math.floor(Math.random() * n)
        numberste.style.color="#ff9600"
        let imgachies = document.querySelectorAll(".wrap-achie img")
        imgachies.forEach((img) =>{
            img.style.filter = "none";
        })
    }
}

loadUserData();
