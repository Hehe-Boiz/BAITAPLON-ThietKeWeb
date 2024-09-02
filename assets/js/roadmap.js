
    // ============ Thay đổi kích thước ===============
    function adjustSVG() {
        const svg = document.querySelector(".graph");
        // Lấy kích thước hiện tại của SVG
        const heightSVG = 1700;
        const viewportHeight = window.innerHeight;
        let scaleY = viewportHeight / heightSVG;

        // console.log(`viewportWidth: ${viewportWidth}`)
        console.log(`viewportHeight: ${viewportHeight}`);
        // console.log(`scaleX: ${scaleX}`)
        console.log(`scaleY: ${scaleY}`);
        let scale = scaleY;
        if (heightSVG < viewportHeight) {
            scale = scale + 1;
        } else {
            scale = scale + 0.05;
        }
        console.log(`scale: ${scale}`);
        const matrix = `matrix(${scale} 0 0 ${scale} 0 0)`;

        svg.setAttribute("transform", matrix);
    }

    // Gọi hàm khi trang tải và khi cửa sổ thay đổi kích thước
    window.addEventListener("load", adjustSVG);
    window.addEventListener("resize", adjustSVG);
    adjustSVG();

    // ============= Tab ==============
    // // ẩn tab
    // let escs = document.querySelectorAll(".esc");
    // escs.forEach((esc) => {
    //     esc.addEventListener("click", function () {
    //         let tab = esc.closest(".tab");
    //         let bck = document.querySelector(".wrap-all");
    //         tab.classList.remove("active");
    //         tab.classList.add("off");

    //         bck.style.visibility = "hidden";
    //     });
    // });

    // let bck = document.querySelector(".wrap-all");
    // bck.addEventListener("click", function () {
    //     let tabs = document.querySelectorAll(".tab");
    //     tabs.forEach((tab) => {
    //         if (tab.classList.contains("active")) {
    //             tab.classList.remove("active");
    //             tab.classList.add("off");
    //         }
    //     });
    //     bck.style.visibility = "hidden";
    // });

    // // hiện tab tương ứng
    // const cards = document.querySelectorAll(".card-all");
    // // Duyệt qua từng thẻ card và gắn sự kiện click
    // cards.forEach((card) => {
    //     card.addEventListener("click", function () {
    //         let bck = document.querySelector(".wrap-all");

    //         // Hiện sidebar tương ứng với card được click
    //         // let targetSidebar = document.querySelector(`.${this.dataset.target}`);
    //         let tab = document.getElementById(this.dataset.target);

    //         console.log(this.dataset.target);
    //         // tab.style.opacity = "1";
    //         // tab.style.visibility = "visible";
    //         // tab.style.transform = "translate(0)";
    //         // tab.style.transition = "all  .4s ease";
    //         tab.classList.add("active");

    //         bck.style.visibility = "visible";
    //     });
    // });
    // ============= Độ hoàn thành  ==============
    function updateProgress(card) {
        let practice = document.querySelectorAll(
            `#${card.dataset.target} tbody tr`
        );
        let count = practice.length;
        let process = 100 / count;

        let countProcess = document.querySelectorAll(
            `#${card.dataset.target} tbody .is-complete`
        ).length;
        let progressBar = card.querySelector("progress");

        if (countProcess > 0) {
            let valueprocess = countProcess * process;
            progressBar.value = valueprocess;
        } else {
            progressBar.value = 0;
        }
    }

    function observeRow(row, card) {
        const observer = new MutationObserver(function (mutationsList) {
            for (let mutation of mutationsList) {
                if (mutation.attributeName === "class") {
                    updateProgress(card);
                }
            }
        });

        observer.observe(row, {
            attributes: true,
            attributeFilter: ["class"],
        });
    }
    const cardalls = document.querySelectorAll(".card-all");
    cardalls.forEach(function (card) {
        let practice = document.querySelectorAll(
            `#${card.dataset.target} tbody tr`
        );

        practice.forEach(function (row) {
            observeRow(row, card);
        });

        updateProgress(card);
    });


    //thu phóng roadmap
    const svg = document.querySelector("svg");

    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let startX, startY;
    let isPanning = false;

    // Hàm cập nhật matrix
    function updateTransform() {
        const matrix = `matrix(${scale}, 0, 0, ${scale}, ${translateX}, ${translateY})`;
        svg.setAttribute("transform", matrix);
    }

    // Sự kiện phóng to/thu nhỏ tại vị trí con trỏ chuột
    svg.addEventListener("wheel", function (event) {
        event.preventDefault();
        const zoomFactor = 0.1;

        // Lấy tọa độ chuột tương đối với SVG
        const point = svg.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        const svgP = point.matrixTransform(
            svg.getScreenCTM().inverse()
        );

        // Xác định scale mới
        const oldScale = scale;
        scale *=
            event.deltaY < 0 ? 1 + zoomFactor : 1 / (1 + zoomFactor);

        // Điều chỉnh vị trí dịch chuyển để phóng to/thu nhỏ tại vị trí con trỏ chuột
        translateX += (svgP.x - translateX) * (1 - scale / oldScale);
        translateY += (svgP.y - translateY) * (1 - scale / oldScale);

        updateTransform();
    });

    // Sự kiện bắt đầu kéo thả
    svg.addEventListener("mousedown", function (event) {
        isPanning = true;
        startX = event.clientX - translateX;
        startY = event.clientY - translateY;
    });

    // Sự kiện kết thúc kéo thả
    svg.addEventListener("mouseup", function () {
        isPanning = false;
    });

    // Sự kiện di chuyển chuột (kéo thả)
    svg.addEventListener("mousemove", function (event) {
        if (!isPanning) return;
        translateX = event.clientX - startX;
        translateY = event.clientY - startY;
        updateTransform();
    });