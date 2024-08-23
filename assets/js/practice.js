// nút setting

const setting = document.querySelector('.setting-in');
const opition = document.querySelector('.opitions');

// Bắt sự kiện click vào nút
setting.addEventListener('click', function (event) {
    if (opition.style.opacity === "0" || opition.style.visibility === "hidden") {
        opition.style.opacity = "1";
        opition.style.visibility = "visible";
        opition.style.transition = "all  .4s ease";
    } else {
        opition.style.opacity = "0";
        opition.style.visibility = "hidden";
        opition.style.transition = "all  .4s ease";
    }
    
    // Ngăn sự kiện click lan ra ngoài (để không bị tắt ngay khi nhấn vào nút)
    event.stopPropagation();
});

// Bắt sự kiện click ra ngoài vùng danh sách ul
document.addEventListener('click', function (event) {
    if (!setting.contains(event.target) && !opition.contains(event.target)) {
        opition.style.opacity = "0";
        opition.style.visibility = "hidden";
        opition.style.transition = "all  .4s ease";
    }
});
