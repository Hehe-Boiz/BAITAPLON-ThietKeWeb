document.addEventListener("DOMContentLoaded", function () {
    require.config({
        paths: {
            vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs",
        },
    });
    require(["vs/editor/editor.main"], function () {
        console.log("Monaco editor loaded");

        const editorElement = document.querySelector(".code");
        if (!editorElement) {
            console.error("Editor element (.code) not found");
            return;
        }

        const editor = monaco.editor.create(editorElement, {
            value: [
                "function containsDuplicate(nums) {",
                "    const set = new Set(nums);",
                "    return set.size !== nums.length;",
                "}",
            ].join("\n"),
            language: "javascript",
            theme: "vs-light",
            minimap: {
                enabled: false,
            },
            automaticLayout: true,
            fontSize: 16,
        });

        let runTestCaseout = document.querySelector(".run-btn");

        let nameTask = document.querySelector(".name-task");

        const taskName = nameTask.textContent.trim();
        console.log("Task name:", taskName);

        fetch("./json/test-case-out.json")
            .then((response) => response.json())
            .then((exercises) => {
                const testCases = exercises[taskName].testCases;
                displayTestCase(testCases);
                setupTestCaseSelection();
            });

        runTestCaseout.addEventListener("click", function () {
            runTests(editor);
        });

        function runTests(editor) {
            const testCaseContents = document.querySelectorAll(".test-content");
            testCaseContents.forEach((testContent, index) => {
                console.log(`Running test case ${index + 1}`);

                const inputElement = testContent.querySelector(
                    ".input-content code"
                );
                const expectedOutputElement = testContent.querySelector(
                    ".output-content-expected"
                );
                const userOutputElement = testContent.querySelector(
                    ".output-content-user"
                );

                // chuyển thành dữ liệu cho JS
                const input = JSON.parse(inputElement.textContent);
                const expectedOutput = JSON.parse(
                    expectedOutputElement.textContent
                );

                try {
                    const userCode = editor.getValue();
                    console.log("User code:", userCode);
                    const func = new Function("return " + userCode)();

                    const result = func(input);
                    console.log("Test result:", result);

                    //chuyển giá trị thành Json để gán vào html 
                    userOutputElement.textContent = JSON.stringify(result);

                    if (
                        JSON.stringify(result) ===
                        JSON.stringify(expectedOutput)
                    ) {
                        testContent.classList.add("passed");
                    } else {
                        testContent.classList.remove("passed");
                    }
                } catch (error) {
                    console.error("Error running test case:", error);
                    userOutputElement.textContent = `Error: ${error.message}`;
                    testContent.classList.remove("passed");
                }
            });

            updateFinalMessage();
        }

        function updateFinalMessage() {
            const testCaseContents = document.querySelectorAll(".test-content");
            const passedTests = document.querySelectorAll(
                ".test-content.passed"
            ).length;
            const totalTests = testCaseContents.length;

            const finalMessage = document.querySelector(".good");
            let bck = document.querySelector(".bck");
            if (passedTests === totalTests) {
                finalMessage.classList.remove("hidden");
                bck.classList.remove("hidden");
                bck.classList.add("show");
            } else {
                finalMessage.classList.add("hidden");
                bck.classList.add("hidden");
            }
        }

        function resizeEditor() {
            editor.layout();
        }
        window.addEventListener("resize", resizeEditor);
        resizeEditor();
    });
});

// Hàm để hiển thị test case
function displayTestCase(testCases) {
    let i = 0;
    const wrapall = document.querySelector(".body-test");
    testCases.forEach((testCase) => {
        let testContentWrap = document.createElement("div");
        testContentWrap.className = `test-content Case${i + 1}`;
        testContentWrap.innerHTML = `
        <div class="input">
            <div class="input-name">nums =</div>
            <div class="input-content">
                <pre><code>${JSON.stringify(testCase.input)}</code></pre>
            </div>
        </div>
        <div class="output-expected">
            <div class="output-name-expected">
                Expected output:
            </div>
        </div>
        <div class="output-content-expected">${JSON.stringify(
            testCase.output
        )}</div>
        <div class="output-user">
            <div class="output-name-user">
                Your Output:
            </div>
            <div class="output-content-user"></div>
        </div>
        `;
        if (i + 1 > 1) {
            testContentWrap.style.display = "none";
        }
        wrapall.appendChild(testContentWrap);
        i++;
    });
}

function setupTestCaseSelection() {
    let testCaseContents = document.querySelectorAll(".test-content");
    let optionCases = document.querySelectorAll(".tests .test");
    optionCases.forEach((optionCase) => {
        optionCase.addEventListener("click", function () {
            let Opi = optionCase.querySelector("span").textContent;
            let textOpi = Opi.replace(/\s+/g, "");
            testCaseContents.forEach((testCaseContent) => {
                testCaseContent.style.display = "none";
            });
            testCaseContents.forEach((testCaseContent) => {
                if (testCaseContent.classList.contains(`${textOpi}`)) {
                    testCaseContent.style.display = "block";
                }
            });
        });
    });
}
