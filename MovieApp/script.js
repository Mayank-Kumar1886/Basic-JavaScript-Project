const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movie-container");
const inputBox = document.querySelector(".inputBox");

const getMovieInfo = async(movie)=>{
    const APIkey = "1e520e61";
    const url = `http://www.omdbapi.com/?apikey=${APIkey}&t=${movie}`

    const response =await fetch(url);
    const data = await response.json();
    showMovieData(data);
}

const showMovieData = (data)=>{
    movieContainer.innerHTML = "";
   const {Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster}= data;

   const movieElement = document.createElement('div');
   movieElement.classList.add('movie-info');
   movieElement.innerHTML = `<h2>${Title}</h2>
      <p><strong>Rating: &#11088</strong>${imdbRating}</p>
   `

   const movieGenreElement = document.createElement('div');
   movieGenreElement.classList.add('movie-genre');

   Genre.split(",").forEach((element)=>{
    const p = document.createElement('p');
    p.innerText = element;
    movieGenreElement.appendChild(p);
   })
   movieElement.appendChild(movieGenreElement)
   
   movieElement.innerHTML += `<p><strong>Released: </strong>${Released}</p>
                             <p><strong>Duration: </strong>${Runtime}</p>
                             <p><strong>Cast: </strong>${Actors}</p>
                             <p><strong>Plot: </strong>${Plot}</p>
   `
   const moviePosterElement = document.createElement('div');
   moviePosterElement.classList.add("movie-poster");
   moviePosterElement.innerHTML = `<img src="${Poster}"/>`
   movieContainer.appendChild(moviePosterElement)
   movieContainer.appendChild(movieElement);
} 

searchForm.addEventListener('submit',(event)=>{
     event.preventDefault();
     const movieName = inputBox.value.trim();
     if(movieName !== ""){
        getMovieInfo(movieName);
     }
})
