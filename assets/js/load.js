//Tải file lên
function selectorSelec(selector) {
    return document.querySelector(selector);
}

function load(selector, path) {
    const cached = localStorage.getItem(path);
    if (cached) {
        selectorSelec(selector).innerHTML = cached;
    }

    fetch(path)
        .then((res) => res.text())
        .then((html) => {
            if (html !== cached) {
                selectorSelec(selector).innerHTML = html;
                localStorage.setItem(path, html);
            }
        })
        .finally(() => {
            window.dispatchEvent(new Event("template-loaded"));
        });
}
