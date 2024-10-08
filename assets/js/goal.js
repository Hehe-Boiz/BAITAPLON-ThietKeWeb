
    let wrapcalendar = document.querySelector(".wrap-date");
    let calendarIcon = wrapcalendar.querySelector(".wrap-icon");
    let calendar = wrapcalendar.querySelector(".wrap-table");
    let calendarBody = wrapcalendar.querySelector(".date-table tbody");
    let currentMonth = wrapcalendar.querySelector(".time-table");
    let prevMonthBtn = wrapcalendar.querySelector(".pre-time");
    let nextMonthBtn = wrapcalendar.querySelector(".next-time");

    calendarIcon.addEventListener("click", function (event) {
        if (calendar.classList.contains("hidden")) {
            calendar.classList.remove("hidden");
            calendar.classList.add("show");
        } else {
            calendar.classList.remove("show");
            calendar.classList.add("hidden");
        }

        // Ngăn sự kiện click lan ra ngoài (để không bị tắt ngay khi nhấn vào nút)
        event.stopPropagation();
    });

    document.addEventListener("click", function (event) {
        if (
            !calendarIcon.contains(event.target) &&
            !calendar.contains(event.target)
        ) {
            if (calendar.classList.contains("show")) {
                calendar.classList.remove("show");
                calendar.classList.add("hidden");
            }
        }
    });

    let currentDate = new Date();

    prevMonthBtn.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        FixCalendar();
    });
    nextMonthBtn.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        FixCalendar();
    });

    FixCalendar();
    function FixCalendar() {
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth();
        currentMonth.textContent = `${month + 1}/${year}`;

        calendarBody.innerHTML = "";
        let firstDay = new Date(year, month, 1);
        let lastDay = new Date(year, month + 1, 0);

        let startDayOfWeek = firstDay.getDay();
        console.log(startDayOfWeek);
        if (startDayOfWeek === 0) {
            startDayOfWeek = 7;
        }

        // Điền các ngày vào bảng
        let row = document.createElement("tr");
        for (let i = 1; i < startDayOfWeek; i++) {
            let emptyCell = document.createElement("td");
            row.appendChild(emptyCell);
        }
        for (let day = 1; day <= lastDay.getDate(); day++) {
            let cell = document.createElement("td");
            let cellin = document.createElement("div");
            cellin.textContent = day;
            cellin.classList.add("center-date", "cursor");
            cell.appendChild(cellin);

            // tạo hàng mới nếu đủ 1 tuần
            if ((startDayOfWeek + day - 2) % 7 === 0) {
                console.log(day);
                calendarBody.appendChild(row);
                row = document.createElement("tr");
            }

            row.appendChild(cell);
        }
        if (row.children.length > 0) {
            calendarBody.appendChild(row);
        }
        attachDayClickEvents();
        attachDayClickEventsGoal()
    }

    // do chỉ gắn sự kiến click vào lần đầu thoi nên cần phải gắn lại khi đổi lịch
    function attachDayClickEvents() {
        // nơi chứa ngày tháng
        let DateContainer = document.querySelector(".date-goal");

        // Nhận ngày
        let days = document.querySelectorAll(".center-date");
        let Month = currentDate.getMonth() + 1;
        let Year = currentDate.getFullYear();

        days.forEach((day) => {
            day.addEventListener("click", function () {
                let td = day.closest("td");
                if (td.classList.contains("is-selecDate")) {
                    td.classList.remove("is-selecDate");
                    DateContainer.innerHTML = "";
                    DateContainer.textContent = "Chọn ngày hoàn thành";
                }
                let selectedDay = parseInt(day.textContent);
                let selectedDate = new Date(Year, Month - 1, selectedDay); 

                let today = new Date();
                //chỉ so sánh theo ngày nên đặt giờ về 0
                today.setHours(0, 0, 0, 0);

                // Kiểm tra nếu ngày được chọn là quá khứ
                if (selectedDate < today) {
                    alert("Bạn không thể chọn ngày trong quá khứ!");
                    return; 
                } else {
                    days.forEach((dayin) => {
                        let tdin = dayin.closest("td");
                        if (tdin && tdin.classList.contains("is-selecDate")) {
                            tdin.classList.remove("is-selecDate");
                        }
                    });
                    DateContainer.innerHTML = "";
                    let selectedDay = day.textContent;
                    let selectedMonth = Month;
                    let selectedYear = Year;
                    DateContainer.textContent =
                        +selectedDay + "/" + selectedMonth + "/" + selectedYear;
                    td.classList.add("is-selecDate");
                }
            });
        });
    }

    // kiểm tra xem người dùng nhập mục tiêu có đúng không
    let goal = document.querySelector(".goal");
    let resultParent = document.querySelector(".waring-goal");

    function checkNumber() {
        let contentGoal = goal.value.trim();
        let number = Number(contentGoal);

        if (isNaN(number) || contentGoal === "") {
            resultParent.classList.remove("hidden");
            resultParent.classList.add("show");
        } else {
            resultParent.classList.remove("show");
            resultParent.classList.add("hidden");
        }
    }

    goal.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            checkNumber();
            event.preventDefault(); 
        }
    });

    goal.addEventListener("input", function () {
        let contentGoal = goal.value.trim();
        if (contentGoal === "") {
            if (resultParent.classList.contains("show")) {
                resultParent.classList.remove("show");
                resultParent.classList.add("hidden");
            } else {
                resultParent.classList.add("hidden");
            }
        }
    });

    //nút chỉnh sửa mục tiêu
    let btngoal = document.querySelector(".wrap-setting-goal");
    let btngoalin = document.querySelector(".wrap-setting-goal img");

    let settinggoal = document.querySelector(".create-goal");
    let graph = document.getElementById("progressCircle");

    btngoal.addEventListener("click", function (event) {
        let sidebar = settinggoal.closest(".sidebar-left");
        if (settinggoal.classList.contains("hidden-goal")) {
            settinggoal.classList.remove("hidden-goal");
            settinggoal.classList.add("show-goal");
            if (btngoalin.classList.contains("rotate0")) {
                btngoalin.classList.remove("rotate0");
                btngoalin.classList.add("rotate360");
            } else {
                btngoalin.classList.add("rotate360");
            }
        } else {
            settinggoal.classList.remove("show-goal");
            settinggoal.classList.add("hidden-goal");
            if (btngoalin.classList.contains("rotate360")) {
                btngoalin.classList.remove("rotate3600");
                btngoalin.classList.add("rotate0");
            } else {
                btngoalin.classList.add("rotate0");
            }
        }

        // Ngăn sự kiện click lan ra ngoài (để không bị tắt ngay khi nhấn vào nút)
        event.stopPropagation();
    });

    document.addEventListener("click", function (event) {
        if (
            !btngoal.contains(event.target) &&
            !settinggoal.contains(event.target)
        ) {
            if (settinggoal.classList.contains("show-goal")) {
                settinggoal.classList.remove("show-goal");
                settinggoal.classList.add("hidden-goal");
            }
            if (btngoalin.classList.contains("rotate360")) {
                btngoalin.classList.remove("rotate3600");
                btngoalin.classList.add("rotate0");
            } else {
                btngoalin.classList.add("rotate0");
            }
        }
    });
