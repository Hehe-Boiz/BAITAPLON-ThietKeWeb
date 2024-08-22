// // ============ Thay đổi kích thước ===============
// function adjustSVG() {
//     const svg = document.querySelector(".graph");
//     // Lấy kích thước hiện tại của SVG
//     const rect = svg.getBoundingClientRect();
//     const widthSVG = rect.width;
//     const heightSVG = rect.height;

//     // Lấy kích thước của khung nhìn (viewport)
//     const viewportWidth = window.innerWidth;
//     const viewportHeight = window.innerHeight -130;

//     // Tính tỷ lệ thu phóng (scale) theo cả chiều rộng và chiều cao
//     let scaleX = viewportWidth / widthSVG;
//     let scaleY = viewportHeight / heightSVG;
//     console.log(scaleX)
//     console.log(scaleY)

//     const scale = Math.min(scaleX, scaleY);

//     // Chọn tỷ lệ nhỏ hơn để đảm bảo SVG không bị méo
//     const minScale = 0.4; // Tỷ lệ thu nhỏ tối thiểu
//     const maxScale = 0.8; // Tỷ lệ phóng to tối đa
//     const finalScale = Math.max(minScale, Math.min(maxScale, scale));

//     console.log(finalScale)

//     // Thiết lập ma trận transform để giữ đúng tỷ lệ
//     const matrix = `matrix(${finalScale} 0 0 ${finalScale} 0 0)`;
//     svg.setAttribute("transform", matrix);
// }

// // Gọi hàm khi trang tải và khi cửa sổ thay đổi kích thước
// window.addEventListener("load", adjustSVG);
// window.addEventListener("resize", adjustSVG);