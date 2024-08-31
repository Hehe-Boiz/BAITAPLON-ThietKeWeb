fetch("./json/test-case-out.json")
    .then((response) => response.json())
    .then((exercises) => {
        const testCases = exercises["Contains Duplicate"].testCases;
        displayTestCase("Case 1", testCases);

        // Gán sự kiện click cho từng test case
        document.querySelectorAll(".test").forEach((test) => {
            test.addEventListener("click", function () {
                let testin = test.querySelector("span");
                let testName = testin.textContent;
                displayTestCase(testName, testCases);
            });
        });
    });

// Hàm để hiển thị test case
function displayTestCase(name, testCases) {
    // Tìm test case dựa trên tên
    const testCase = testCases.find((tc) => tc.name === name);

    // Kiểm tra nếu tìm thấy test case
    if (testCase) {
        const testContent = document.querySelector(".test-content");

        // Gán dữ liệu input
        const inputContent = testContent.querySelector(
            ".input-content pre code"
        );
        // Chuyển đổi mảng đối tượng thành văn bản JSON
        inputContent.textContent = JSON.stringify(testCase.input);

        // Gán dữ liệu output mong đợi
        const expectedOutput = testContent.querySelector(
            ".output-content-expected"
        );
        expectedOutput.textContent = testCase.output;
    }
}
