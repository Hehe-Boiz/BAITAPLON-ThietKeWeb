let animationProgress = 0; 
const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

const data = {
    labels: ['2019','2020', '2021', '2022', '2023', '2024'],
    datasets: [
        { label: 'Label 1', data: [19, 25, 44, 69, 80, 95], color: 'teal' }
    ]
};

// Hàm vẽ biểu đồ đường
function drawLineChart() {
    const padding = 50;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const maxYValue = 95; // Giá trị lớn nhất của trục Y
    const scaleX = chartWidth / (data.labels.length - 1);
    const scaleY = chartHeight / maxYValue;

    // Vẽ lưới và nhãn
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.strokeStyle = '#ddd';
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.font = 'normal 15px Poppins';

    // Nhãn trục Y
    for (let i = 0; i <= maxYValue; i += 20) {
        const y = canvas.height - padding - i * scaleY;
        ctx.fillText(i, padding - 30, y + 5);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.strokeStyle = '#eee';
        ctx.stroke();
    }

    // Nhãn trục X
    data.labels.forEach((label, index) => {
        const x = padding + index * scaleX;
        ctx.fillText(label, x - 10, canvas.height - padding + 20);
    });
    // vẽ đường và cột
    data.datasets.forEach(dataset => {
        ctx.beginPath();
        dataset.data.forEach((point, index) => {
            const x = padding + index * scaleX+10;
            const y = canvas.height - padding - point * scaleY - 10;
            ctx.lineWidth = 2;
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.strokeStyle = dataset.color;
        ctx.stroke();
        // vẽ điểm
        dataset.data.forEach((point, index) => {
            const x = padding + index * scaleX +10 ;
            const y = canvas.height - padding - point * scaleY -10;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = 'red';
            ctx.fill();

            
        // vẽ bọc ngoài điểm
            ctx.beginPath();
            ctx.arc(x, y, 7, 0, Math.PI * 2);
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 3;
            ctx.stroke();
        });
    
        // Vẽ các cột ngay tại vị trí của các điểm đường
        ctx.fillStyle = dataset.color;
        dataset.data.forEach((value, index) => {
            const barWidth = scaleX * 0.3; // Chiều rộng cột
            const x = padding + index * scaleX; // Đặt cột ngay dưới nhãn
            const y = canvas.height - padding - value * scaleY * animationProgress;
            ctx.fillRect(x, y, barWidth, (canvas.height - padding - y));  // Cột nằm dưới điểm đường
        });
    });
}
function drawLine () {
    
}
function animateChart() {
    if (animationProgress < 1) {
        animationProgress += 0.01; // Tăng tiến trình vẽ
        drawLineChart();
        requestAnimationFrame(animateChart); // Gọi lại để tiếp tục vẽ
    }
}
function startAnimation() {
    animationProgress = 0;
    animateChart();
}

// Sử dụng chỉ một phương pháp để bắt đầu animation
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startAnimation();
            observer.unobserve(canvas);
        }
    });
});

observer.observe(canvas);