window.addEventListener("load",function(){
    //Mở rộng thêm tin tức
    
    let loadBtn =document.querySelector(".load-more");
    let currentItems = 5;
    let posts = document.querySelectorAll(".post");
    loadBtn.addEventListener("click",function(){
        if(currentItems === posts.length){
            for(let i = currentItems ; i > 0; i--){
                posts[i - 1].style.display = 'none';
            }
            for(let i = 0;i<5;i++){
                posts[i].style.display = 'flex';
            }
            currentItems = 5;
            loadBtn.innerText = 'Load more'
        }else{
            item = 0
            for(let i = currentItems; i < currentItems + 5; i++ ){
            item = i;
            if(item === posts.length){
                loadBtn.innerText= 'Collapse'
                break;
            }
            posts[i].style.display = 'flex';
        }
        currentItems = item; 
        }
    })

    //Tìm kiếm tin tức

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