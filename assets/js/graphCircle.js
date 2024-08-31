export function graphCircle() {
    let canvas = document.getElementById("progressCircle");

    // Tăng độ phân giải của canvas
    let scale = window.devicePixelRatio * 3;

    canvas.width = canvas.clientWidth * scale;
    canvas.height = canvas.clientHeight * scale;

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

    // Khởi tạo IntersectionObserver
    let observer = new IntersectionObserver(
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
}
