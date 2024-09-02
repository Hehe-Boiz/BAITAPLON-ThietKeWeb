const canvas = document.getElementById("progressCircle");

// Tăng độ phân giải của canvas
const scale = window.devicePixelRatio * 3;

canvas.width = canvas.clientWidth * scale/1.9;
canvas.height = (canvas.clientHeight * scale) / 1.3;

canvas.style.width = `${canvas.clientWidth / 3}px`;
canvas.style.height = `${canvas.clientHeight}px`;

const ctx = canvas.getContext("2d");

// // Điều chỉnh tỷ lệ vẽ
ctx.scale(scale, scale);

const centerX = canvas.width / 2 / scale;
const centerY = canvas.height / 2 / scale;
const radius = 60;
const lineWidth = 10;
const startAngle = -0.5 * Math.PI;

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

    // Vẽ đường tròn tiến trình
    const endAngle = (progressDraw / 100) * 2 * Math.PI + startAngle;
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

//random bài tập
let selectedExercises = [];
fetch("./json/practice.json")
    .then((response) => response.json())
    .then((exercises) => {
        function getRandomExercises(exercises, count) {
            const shuffled = exercises.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        }

        const randomExercises = getRandomExercises(exercises, 3);

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
        console.log(nameElement.textContent);

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
