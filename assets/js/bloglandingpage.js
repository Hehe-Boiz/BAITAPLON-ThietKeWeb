window.addEventListener("load",function(){
    let topPage = document.querySelector(".top-page");
    let topPages = this.document.querySelectorAll(".top-page-content");
    let prev = this.document.getElementById("prev");
    let next = this.document.getElementById("next");
    let numberTopPage = this.document.querySelector(".number-top-page .number-now")
    
    let pos = 0;
    let numberofPages= topPages.length - 1;
    
    next.addEventListener("click", function(){
        if(pos + 1 > numberofPages){
            pos = 0;
        }
        else{
            pos = pos + 1;
        }
        reloadSlider();
        numberTopPage.innerText = pos + 1;
    })
    prev.addEventListener("click", function(){
        if(pos === 0){
            pos = numberofPages;
        }
        else{
            pos = pos - 1;
        }
        reloadSlider();
        numberTopPage.innerText = pos + 1;
    })
    function reloadSlider(){
        let checkLeft = topPages[pos].offsetLeft;
        console.log(checkLeft);
        topPage.style.left = -checkLeft + 'px';
    }
})
