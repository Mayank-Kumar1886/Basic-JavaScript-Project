const API_KEY = "96a959718a724690a8c647c72085782e";
const url = `https://newsapi.org/v2/everything?q=`;

window.addEventListener("load",()=> fetchNews("India"));

const fetchNews = async(query)=>{
   const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data = await response.json();
   console.log(data)
   bindData(data.articles);
}
const bindData = (articles)=>{
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";
    articles.forEach((article) => {
       if(!article.urlToImage) return;
       const cardClone = newsCardTemplate.content.cloneNode(true);
       fillDataInCard(cardClone , article);
       cardsContainer.appendChild(cardClone);
       
    })
}

const fillDataInCard = (cardClone , article) =>{
   const newsImg = cardClone.querySelector("#news-img");
   const newsTitle = cardClone.querySelector("#news-title");
   const newsSource = cardClone.querySelector("#news-source");
   const newsDesc = cardClone.querySelector("#news-desc");

   newsImg.src = article.urlToImage;
   newsTitle.innerHTML = article.title;
   newsDesc.innerHTML = article.description;
   
   const date = new Date(article.publishedAt).toLocaleString("en-US", {
     timeZone: "Asia/Kolkata",
   });
   newsSource.innerHTML = `${article.source.name} . ${date}`;

   cardClone.firstElementChild.addEventListener("click" , () => {
       window.open(article.url , "_blank");
   })
}
 let curSelectedNav = null;  
const onNavItemClick = (id)=>{
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");


}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});