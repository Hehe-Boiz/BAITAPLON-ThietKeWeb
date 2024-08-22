// ============= Check ==============
let checks = document.querySelectorAll(".check");
checks.forEach(function (check) {
    check.addEventListener("click", function () {
        let icon = check.querySelector("i.fa-solid.fa-check");
        if (icon ) {
            // Nếu đã có, loại bỏ thẻ <i>
            icon.remove();
            check.classList.remove('is-success');
        } else {
            const newElement = document.createElement("i");
            newElement.classList.add("fa-solid", "fa-check");
            check.classList.add('is-success')
            check.appendChild(newElement);
        }
    });
});
