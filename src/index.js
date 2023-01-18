fetch("http://localhost:3000/movies")
    .then((resp) => resp.json())
    .then((movieItems = []) => {
        for(let movie of movieItems){
            renderMovie(movie);
            bloodDict[movie.title] = movie.blood_amount;
        }
        showFirstMovie(movieItems[0]);
        watchButtonHandler();
        bloodFormHandler();
    })
const watchedDict = {};
const bloodDict = {};
function renderMovie(movie){
    const movieImage = document.createElement("img");
    const movieList = document.querySelector("#movie-list");
    movieImage.src = movie.image;
    movieList.append(movieImage);

    const detailImage = document.querySelector("#detail-image");
    const title = document.querySelector("#title");
    const yearReleased = document.querySelector("#year-released");
    const description = document.querySelector("#description");
    const hasWatched = document.querySelector("#watched");
    const bloodAmount = document.querySelector("#amount");
    watchedDict[movie.title] = movie.watched;
    movieImage.addEventListener("click", (e) =>{
        detailImage.src = movie.image;
        title.textContent = movie.title;
        yearReleased.textContent = movie.release_year;
        description.textContent = movie.description;
        
        if(watchedDict[movie.title]){
            hasWatched.textContent = "Watched";
        }
        else {
            hasWatched.textContent = "Unwatched";
        }
        bloodAmount.textContent = bloodDict[movie.title];
    })
}

function showFirstMovie(firstMovie){
    const detailImage = document.querySelector("#detail-image");
    const title = document.querySelector("#title");
    const yearReleased = document.querySelector("#year-released");
    const description = document.querySelector("#description");
    const hasWatched = document.querySelector("#watched");
    const bloodAmount = document.querySelector("#amount");

    detailImage.src = firstMovie.image;
    title.textContent = firstMovie.title;
    yearReleased.textContent = firstMovie.release_year;
    description.textContent = firstMovie.description;
    if(firstMovie.watched){
        hasWatched.textContent = "Watched";
        watchedDict[title.textContent] = true;
    }
    else {
        hasWatched.textContent = "Unwatched";
        watchedDict[title.textContent] = false;
    }
    bloodAmount.textContent = firstMovie.blood_amount;
    bloodDict[title.textContent] = firstMovie.blood_amount;
}

function watchButtonHandler(){
    const watchButton = document.querySelector("#watched");
    
    watchButton.addEventListener("click", (e) => {
        const currentMovieName = document.querySelector("#title").textContent;
        if(watchButton.textContent === "Watched"){
            watchButton.textContent = "Unwatched";
            watchedDict[currentMovieName] = false;
            console.log(movieList);
        }
        else{
            watchButton.textContent = "Watched";
            watchedDict[currentMovieName] = true;
        }
    })
}

function bloodFormHandler(){
    const bloodForm = document.querySelector("#blood-form");
    bloodForm.addEventListener("submit",(e) => {
        e.preventDefault();
        const currentMovieName = document.querySelector("#title").textContent;
        const bloodInput = document.querySelector("#blood-amount");
        const bloodTotal = document.querySelector("#amount");
        bloodTotal.textContent = parseInt(bloodTotal.textContent) + parseInt(bloodInput.value);
        bloodDict[currentMovieName] = parseInt(bloodTotal.textContent);
    })
}