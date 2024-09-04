// ============ Biểu đồ ===============
let isRepeating = true;
const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

const data = {
    labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
    datasets: [
        {
            label1: "Số lượng lập trình viên",
            data: [19, 25, 44, 69, 80, 95],
        },
        {
            label2: "Nhu cầu của thị trường",
            data: [28, 33, 47, 50, 38, 43],
        },
    ],
};

const scale = 2; 
canvas.width = 500 * scale; 
canvas.height = 350 * scale;

canvas.style.width = "500px"; 
canvas.style.height = "350px";

ctx.scale(scale, scale);

// Hàm vẽ biểu đồ đường
function drawChart() {
    const padding = 50; 
    const chartWidth = canvas.width / scale - padding * 2; 
    const chartHeight = canvas.height / scale - padding * 2;
    const maxYValue = 95; 
    const scaleX = chartWidth / (data.labels.length - 1);
    const scaleY = chartHeight / maxYValue;

    // Vẽ lưới và nhãn
    ctx.clearRect(0, 0, canvas.width / scale, canvas.height / scale); 
    ctx.beginPath();
    ctx.lineTo(canvas.width / scale - padding, canvas.height / scale - padding);
    ctx.strokeStyle = "#d8d8de";
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.font = "500 15px Arial";

    // Nhãn trục Y
    for (let i = 0; i <= maxYValue; i += 20) {
        const y = canvas.height / scale - padding - i * scaleY;
        ctx.fillText(i, padding - 30, y + 5);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width / scale - padding + 30, y);
        ctx.strokeStyle = "#d8d8de";
        ctx.stroke();
    }

    // Nhãn trục X
    data.labels.forEach((label, index) => {
        const x = padding + index * scaleX;
        ctx.fillText(label, x, canvas.height / scale - padding + 20);
    });

    // Vẽ biểu đồ
    data.datasets.forEach((dataset) => {
        if (dataset.label2) {
            drawLine(ctx, dataset, padding, scaleX, scaleY, animationProgress);
            drawPoint(ctx, dataset, padding, scaleX, scaleY, animationProgress);
        }
        if (dataset.label1) {
            drawBar(ctx, dataset, padding, scaleX, scaleY, animationProgress);
        }
    });
    // Vẽ chú thích
    drawLegend();
}
// Vẽ đường
function drawLine(ctx, dataset, padding, scaleX, scaleY, animationProgress) {
    ctx.beginPath();
    const totalPoints = dataset.data.length - 1;
    for (let i = 0; i < totalPoints; i++) {
        const x1 = padding + i * scaleX + 15;
        const y1 =
            canvas.height / scale - padding - dataset.data[i] * scaleY - 10;
        const x2 = padding + (i + 1) * scaleX + 15;
        const y2 =
            canvas.height / scale - padding - dataset.data[i + 1] * scaleY - 10;

        const segmentProgress = animationProgress * totalPoints - i;

        if (segmentProgress > 0) {
            if (i === 0) {
                ctx.moveTo(x1, y1);
            }

            if (segmentProgress >= 1) {
                ctx.lineTo(x2, y2);
            } else {
                const currentX = x1 + (x2 - x1) * segmentProgress;
                const currentY = y1 + (y2 - y1) * segmentProgress;
                ctx.lineTo(currentX, currentY);
            }
        }
    }
    ctx.strokeStyle = "#3795BD";
    ctx.lineWidth = 3;
    ctx.stroke();
}

//Vẽ điểm
function drawPoint(ctx, dataset, padding, scaleX, scaleY, animationProgress) {
    for (let i = 0; i < dataset.data.length; i++) {
        if ((i + 1) * (1 / dataset.data.length) > animationProgress) break;

        const x = padding + i * scaleX + 15;
        const y =
            canvas.height / scale - padding - dataset.data[i] * scaleY - 10;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 4;
        ctx.stroke();
    }
}

// Vẽ cột
function drawBar(ctx, dataset, padding, scaleX, scaleY, animationProgress) {
    ctx.fillStyle = dataset.color;
    dataset.data.forEach((value, index) => {
        const barWidth = scaleX * 0.4; 
        const x = padding + index * scaleX; 
        const y =
            canvas.height / scale -
            padding -
            value * scaleY * animationProgress;
        ctx.fillStyle = "#4E31AA";
        ctx.fillRect(x, y, barWidth, canvas.height / scale - padding - y); 
    });
}

// Hàm để vẽ chú thích
function drawLegend() {
    const legendX = 50 / scale; 
    const legendY = 30 / scale; 

    // Vẽ chú thích cho "Số lượng lập trình viên"
    ctx.fillStyle = "#4E31AA";
    ctx.fillRect(legendX, legendY + 3, 15, 15);
    ctx.fillStyle = "black";
    ctx.font = "bold 15px Arial";
    ctx.fillText("Số lượng lập trình viên", legendX + 20, legendY + 15);

    // Vẽ chú thích cho "Nhu cầu của thị trường"
    ctx.fillStyle = "teal";
    ctx.fillRect(legendX, legendY + 28, 15, 15);
    ctx.fillStyle = "black";
    ctx.font = "bold 15px Arial";
    ctx.fillText("Nhu cầu của thị trường", legendX + 20, legendY + 42);
}

function animateChart() {
    if (animationProgress < 1) {
        animationProgress += 0.008; 
        drawChart();
        requestAnimationFrame(animateChart);
    } else if (isRepeating) {
        // Thêm một khoảng dừng ngắn trước khi bắt đầu lại
        setTimeout(() => {
            animationProgress = 0; // Reset tiến trình
            requestAnimationFrame(animateChart);
        }, 1000); 
    }
}

function startAnimation() {
    animationProgress = 0;
    isRepeating = true;
    animateChart();
}

// Khi canvas xuất hiện trong khung nhìn hàm nãy sẽ bắt đầu chạy
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            startAnimation();
            observer.unobserve(canvas);
        }
    });
});

observer.observe(canvas);
// Comment
function showComment() {

    let comments = document.querySelectorAll(".comment li");
    comments.forEach((comment) => {
        comment.addEventListener("click", (e) => {
            console.log("thanh cong")
            // Lấy thông tin từ comment
            let avatar = comment.querySelector(".avatar").src;
            let name = comment.querySelector(".name").textContent;
            let desc = comment.querySelector(".desc").textContent;

            // Gán thông tin vào tab
            let tab = document.querySelector(".tab");
            let avatarTab = tab.querySelector(".avatar");
            let nameTab = tab.querySelector(".name");
            let descTab = tab.querySelector(".desc");

            avatarTab.src = avatar;
            nameTab.textContent = name;
            descTab.textContent = desc;
            tab.classList.add("show-comment");
            let bck = document.querySelector(".bck-overlay");
            bck.classList.add("active");
            // ngăn cuộn trang
            document.body.style.overflow = 'hidden';
        });
    });
}
showComment();

function offComment() {
    let tab = document.querySelector(".tab");
    let commentClose = document.querySelector(".tab .close");
    let overlay = document.querySelector(".bck-overlay");
    function onClose(){
        tab.classList.remove("show-comment");
        overlay.classList.remove("active");
        document.body.style.overflow = '';
    }
    commentClose.addEventListener("click", onClose);
    overlay.addEventListener("click", onClose);
}

offComment()

let islog = localStorage.getItem("islog");
async function loadUserData() {
    if (islog === "true") {
        let signin = document.querySelector(".action-link");
        let signup = document.querySelector(".action-btn");
        let actions = document.querySelector(".actions");
        signin.style.display = "none";
        signup.style.display = "none";

        let response = await fetch("./json/user.json");
        let usersFromJSON = await response.json();

        let user = localStorage.getItem("log");
        let data = JSON.parse(user);
        let loggedInEmail = data.email;
        let userFromJSON = usersFromJSON.find(
            (user) => user.accountName === loggedInEmail
        );
        const wrapDiv = document.createElement("div");
        wrapDiv.className = "wrap-userLog";


        if (userFromJSON) {
            console.log("thanh cong");

            if (userFromJSON.acc === "Premium") {
                console.log("Premium");
                wrapDiv.innerHTML = `
                <img class="avatar-user-afterLog user-premium" src="${userFromJSON.avatar}" alt="User Avatar"/>
                <img src="./assets/icons/crown-gold.svg" alt="Premium Icon" class="premium-acc">
            `;
            } else {
                wrapDiv.innerHTML = `
                <img class="avatar-user-afterLog" src="${userFromJSON.avatar}" alt="User Avatar"/>
            `;
            }
        } else {
            console.log("ngheo");

            wrapDiv.innerHTML = `
            <img class="avatar-user-afterLog" src="./assets/img/default_avatar.jpg" alt="Default Avatar"/>
        `;
        }
        actions.insertBefore(wrapDiv, actions.querySelector("a").nextSibling);
        let signs = document.querySelectorAll(".sign");
        signs.forEach((sign) => {
            sign.style.display = "none";
        });
    }
}
loadUserData()