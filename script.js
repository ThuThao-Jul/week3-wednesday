




async function getArticles() {
    let url = produceDefaultUrl()
    const response = await fetch(url);
    const json = await response.json();
    console.log({ json });
    const { articles } = json;

    document.getElementById("title").innerHTML = `CoderNews (${articles.length})`;

    const articlesHTML = articles.map(renderArticle);
  document.getElementById("newsList").innerHTML = articlesHTML.join("");
  }
getArticles()

function renderArticle(article) {
    
    return `
     
      <li class="mb-3 align-self-center article"> 
          ${article.title}
          <p class="updated"> Updated ${moment(article.publishedAt).fromNow()}</p>
          <img src="${article.urlToImage}" alt="Snow" height="auto" width="350vw"/>
          <p class="description"> ${article.description}</p>
        </div>
          <i class="fa fa-edit fa-xs"></i><h4 class="mb-0">Author: ${article.author}</h4>
          <h6 class="mb-0"> Source: <a href="${article.url}"> ${article.source.name}</a></h6>
         
      </li>
    
    `;
  }

    
   const languages=["ar", "zh", "en", "es", "fr", "ru"];
  function createLanguageList(){
      const languageHTML = languages.map( (l) => `<a href="http://127.0.0.1:5500/index.html?language=${l}"> ${l} </a>`,);
      document.getElementById('languages').innerHTML = "Language:" + languageHTML
  }
  createLanguageList()


  const categories = ['general', 'business','technology','sports','entertainment','health', 'science']
  function renderCategories (){
      const catogoryHTML = categories.map( (c) => `<a href="http://127.0.0.1:5500/index.html?category=${c}"> ${c} </a>`,);
      document.getElementById('categories').innerHTML = "Category:" + catogoryHTML
  }
renderCategories()


function produceDefaultUrl() {
   
let url="https://newsapi.org/v2/top-headlines?apiKey=7c222c778caf4f69b235c8d748bdaceb";

const urlParams = window.location.search.split("?")[1];
if (!urlParams) return url + "&language=en";
urlParams.split("&").map((p) => {
    // "Massage data" into workable form.
    const [key, value] = p.split("=");
    url += `&${key}=${value}`;
  });
  return url
}



let articles = [];
let allArticles = [];
function spam(q) {
    return `https://newsapi.org/v2/top-headlines?apiKey=7c222c778caf4f69b235c8d748bdaceb&page=${pageNumber}&q=${q}`;
  }


  async function fetchArticles(q) {
    let url = q ? spam(q) : produceDefaultUrl();
    
    try {
        const resp = await fetch(url);
        const json = await resp.json();

articles = json.articles;
allArticles = allArticles.concat(articles);
    }

    catch (error) {
        // Report the error to the person in charge, you!
        console.log({error});
        // GOOD: Open box of pizza before eating.
        // Grab out data we saved in previously successfully fetch() requests.
        articles = JSON.parse(localStorage.getItem("willWork"));
      }

      finally {
        // render Foo to the screen.
        console.log({ allArticles });
        renderArticles(allArticles);
      }
}

fetchArticles();

function searchNews(e) {
    const q = document.getElementById("searchTerm").value
    fetchArticles(q);
  }