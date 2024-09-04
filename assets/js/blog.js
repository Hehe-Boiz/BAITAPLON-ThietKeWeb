
window.addEventListener("load",function(){
    //Mở rộng thêm tin tức
    
    let loadBtn =document.querySelector(".load-more");
    let currentItems = 5;
    loadBtn.addEventListener("click",function(){
        let posts = document.querySelectorAll(".post");
        if(currentItems === posts.length){
            items = currentItems;
            for(let i = currentItems ; i > 0; i--){
                items = i;
                posts[i - 1].style.display = 'none';
                console.log(posts[i-1]);
            }
            currentItems = items;
            loadBtn.innerText = 'Load more'
        }
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