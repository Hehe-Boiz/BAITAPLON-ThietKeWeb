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

const scale = 2; // Hệ số tỷ lệ để tăng độ phân giải (2x độ phân giải)
canvas.width = 500 * scale; // Tăng chiều rộng nội bộ
canvas.height = 350 * scale;

canvas.style.width = "500px"; // Kích thước hiển thị của canvas
canvas.style.height = "350px";

ctx.scale(scale, scale);

// Hàm vẽ biểu đồ đường
function drawChart() {
    const padding = 50; // Chỉ cần định nghĩa một lần
    const chartWidth = canvas.width / scale - padding * 2; // Điều chỉnh chiều rộng và chiều cao theo scale
    const chartHeight = canvas.height / scale - padding * 2;
    const maxYValue = 95; // Giá trị lớn nhất của trục Y
    const scaleX = chartWidth / (data.labels.length - 1);
    const scaleY = chartHeight / maxYValue;

    // Vẽ lưới và nhãn
    ctx.clearRect(0, 0, canvas.width / scale, canvas.height / scale); // Chỉ xóa phần hiển thị thực tế
    ctx.beginPath();
    ctx.lineTo(canvas.width / scale - padding , canvas.height / scale - padding);
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
        ctx.fillText(label, x , canvas.height / scale - padding + 20);
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
        const barWidth = scaleX * 0.4; // Chiều rộng cột
        const x = padding + index * scaleX; // Đặt cột ngay dưới nhãn
        const y =
            canvas.height / scale -
            padding -
            value * scaleY * animationProgress;
        ctx.fillStyle = "#4E31AA";
        ctx.fillRect(x, y, barWidth, canvas.height / scale - padding - y); // Cột nằm dưới điểm đường
    });
}

// Hàm để vẽ chú thích
function drawLegend() {
    const legendX = 50 / scale; // Vị trí X
    const legendY = 30 / scale; // Vị trí Y

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
        animationProgress += 0.008; // Giữ nguyên tốc độ chậm
        drawChart();
        requestAnimationFrame(animateChart);
    } else if (isRepeating) {
        // Thêm một khoảng dừng ngắn trước khi bắt đầu lại
        setTimeout(() => {
            animationProgress = 0; // Reset tiến trình
            requestAnimationFrame(animateChart);
        }, 1000); // Đợi 1 giây trước khi bắt đầu lại
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
