//Tải file lên
function selectorSelect(selector) {
    return document.querySelector(selector);
}

function load(selector, path) {
    const cached = localStorage.getItem(path);
    if (cached) {
        selectorSelect(selector).innerHTML = cached;
    }

    fetch(path)
        .then((res) => res.text())
        .then((html) => {
            if (html !== cached) {
                selectorSelect(selector).innerHTML = html;
                localStorage.setItem(path, html);
            }
        })
        .finally(() => {
            window.dispatchEvent(new Event("template-loaded"));
        });
}