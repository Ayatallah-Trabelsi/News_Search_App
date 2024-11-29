const apiKey='480c4588116d492cb1452e70450a351a'

const blogContainer= document.getElementById('blog-container');
const searchField= document.getElementById('search-input');
const searchButton= document.getElementById('search-button');

searchButton.addEventListener('click',async ()=>{
    const query= searchField.value.trim();
    if(query.length !==0){
        try{
            const articles= await fetchNewsByQuery(query);
            displayBlogs(articles);
        }catch(error){
            console.error("Error fetching news by query",error);
        }
    }
})

async function fetchNewsByQuery(query){
        try{
            const apiUrl= `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
            const response= await fetch(apiUrl);
            const data= await response.json();
            return data.articles;
        }catch(error){
            console.error("Error fetching news by query",error);
            return [];
        }
}

async function fetchRandomNews(){
    try{
        const apiUrl= `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`
        const response=await fetch(apiUrl)
        const data= await response.json()
        return data.articles;

    }catch(error){
        console.error("Error fetching random news",error);
        return []
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML= ""
    articles.forEach((article)=>{
        const blogCard= document.createElement('div');
        blogCard.classList.add('blog-card');

        const img= document.createElement('img');
        img.src=article.urlToImage;
        img.alt=article.title;

        const title= document.createElement('h2');
        const TruncatedTitle= article.title.length>30? article.title.slice(0,30)+'...':article.title;
        title.textContent=TruncatedTitle;

        const description= document.createElement('p');
        const TruncatedDescription= article.description.length>100? article.description.slice(0,100)+'...':article.description;
        description.textContent=TruncatedDescription;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        blogCard.addEventListener('click',()=>{
            window.open(article.url,'_blank');
        });

        blogContainer.appendChild(blogCard);

    })
}    

(async ()=>{
    try{
        const articles=await fetchRandomNews();
        displayBlogs(articles);
    }catch(error){
        console.error("Error fetching random news",error);
    }
    
})();