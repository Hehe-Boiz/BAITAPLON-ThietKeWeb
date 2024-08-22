// // ============ Thay đổi kích thước ===============
function adjustSVG() {
    const svg = document.querySelector(".graph");
    // Lấy kích thước hiện tại của SVG
    const heightSVG = 1700;
    const viewportHeight = window.innerHeight ;
    let scaleY = viewportHeight / heightSVG;

    // console.log(`viewportWidth: ${viewportWidth}`)
    console.log(`viewportHeight: ${viewportHeight}`)
    // console.log(`scaleX: ${scaleX}`)
    console.log(`scaleY: ${scaleY}`)
    let scale = scaleY
    if (heightSVG < viewportHeight){
        scale = scale + 1
    }
    else {
        scale = scale + 0.05
    }
    console.log(`scale: ${scale}`)
    const matrix = `matrix(${scale} 0 0 ${scale} 0 0)`;

    svg.setAttribute("transform", matrix);
}

// Gọi hàm khi trang tải và khi cửa sổ thay đổi kích thước
window.addEventListener("load", adjustSVG);
window.addEventListener("resize", adjustSVG);