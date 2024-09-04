fetch("./json/roadmap.json")
    .then((response) => response.json())
    .then((info) => {
        // ẩn tab
        let zIndex = 1000;
        let escs = document.querySelectorAll(".esc");
        escs.forEach((esc) => {
            esc.addEventListener("click", function () {
                let tab = esc.closest(".tab");
                let bck = document.querySelector(".wrap-all");
                tab.classList.remove("active");
                tab.classList.add("off");

                bck.style.visibility = "hidden";
            });
        });

        let bck = document.querySelector(".wrap-all");
        bck.addEventListener("click", function () {
            let tabs = document.querySelectorAll(".tab");
            tabs.forEach((tab) => {
                if (tab.classList.contains("active")) {
                    tab.classList.remove("active");
                    tab.classList.add("off");
                }
            });
            bck.style.visibility = "hidden";
        });

        let cards = document.querySelectorAll("svg .card-all");
        function activateCard(card) {
            let tab = document.querySelector(".tab");
            let bck = document.querySelector(".wrap-all");
            tab.classList.add("active");
            bck.style.visibility = "visible";
            let contentlabel = card.textContent.trim();
            let topicData = info.find(
                (topic) => topic.topic_name === contentlabel
            );
            if (topicData) {
                document.querySelector(".title").innerHTML = "";
                document.querySelector(".title").textContent =
                    topicData.topic_name;
                let wrapVid = document.querySelector(".colum .wrap");
                wrapVid.innerHTML = "";
                topicData.lessons.forEach((lesson) => {
                    const wrapDivVid = document.createElement("div");
                    wrapDivVid.className = "wrap-row-vid";
                    
                    wrapDivVid.innerHTML = `
                        <div class="wrap-vid">
                            <iframe
                                src="${lesson.iframe.src}"
                                title="${lesson.iframe.title}"
                                frameborder="${lesson.iframe.frameborder}"
                                allow="${lesson.iframe.allow}"
                                referrerpolicy="${lesson.iframe.referrerpolicy}"
                                allowfullscreen>
                            </iframe>
                        </div>
                        <div class="row row-vid">
                            <span class="check-pre"><i class="fa-solid fa-check"></i></span>
                            <a class="vid" href="${lesson.youtube_link}">
                                <img class="play" src="assets/icons/play.svg" alt="" />
                                <p class="name">${lesson.lesson_name}</p>
                            </a>
                        </div>
                    `;
                    let divWrapall = document.createElement("div");
                    divWrapall.className = "wrapall-vid";
                    divWrapall.style.zIndex = zIndex--;
                    divWrapall.appendChild(wrapDivVid);
                    wrapVid.appendChild(divWrapall);
                });
                let practices = document.querySelector("table tbody");
                practices.innerHTML = "";
                topicData.exercises.forEach((exercise) => {
                    let row = document.createElement("tr");
                    row.innerHTML = `
                    <td>
                        <div class="center">
                            <span class="check">
                                <i class="fa-solid fa-check"></i>
                            </span>
                        </div>
                    </td>
                    <td>
                        <div class="center center-prb">
                            <a>${exercise.exercise_name}</a>
                        </div>
                    </td>
                    <td>
                        <div class="center ${exercise.difficulty.toLowerCase()}">${
                        exercise.difficulty
                    }</div>
                    </td>
                `;
                    practices.appendChild(row);
                });
            }
            let checkspre = document.querySelectorAll(".check-pre");
            checkspre.forEach(function (check) {
                check.addEventListener("click", function () {
                    let icon = check.querySelector("i");

                    // Kiểm tra nếu icon tồn tại
                    if (icon) {
                        if (icon.style.opacity === "1") {
                            icon.style.opacity = "0";
                            check.classList.remove("is-success");
                        } else {
                            icon.style.opacity = "1";
                            check.classList.add("is-success");
                        }
                    }
                });
            });
            let checks = document.querySelectorAll(".check");
            checks.forEach(function (check) {
                check.addEventListener("click", function () {
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
                    } 
                });
            });
        }

        cards.forEach((card) => {
            card.addEventListener("click", function () {
                activateCard(card);
            });
            // Sự kiện cảm ứng cho thiết bị di động
            card.addEventListener("touchstart", function () {
                activateCard(card);
            });
        });
    });
