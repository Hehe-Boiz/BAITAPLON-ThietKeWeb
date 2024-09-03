window.addEventListener("load",function(){
    let loadBtn =document.querySelector(".load-more");
    let posts = document.querySelectorAll(".post");
    let currentItems = 5;
    loadBtn.addEventListener("click",function(){
        for(let i = currentItems; i < currentItems + 5; i++ ){
            if(i === posts.length){
                currentItems = i;
                loadBtn.style.display = 'none';
                break;
            }
            posts[i].style.display = 'flex';
        }
        if(currentItems < posts.length){
            currentItems+=5
        }    
    })

    let inputtext = this.document.getElementById("search");
    let btnenter = this.document.getElementById("enter");
    btnenter.addEventListener("click",function(){
        let texts = document.querySelectorAll(".post-title a");
        for(text of texts){
            if(text.innerText.toLowerCase().includes(inputtext.value.toLowerCase())){
                text.parentElement.parentElement.parentElement.style.display = 'flex';
            }
            else{
                text.parentElement.parentElement.parentElement.style.display = 'none';
            }
        }
    })
})