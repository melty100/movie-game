
//var myURL = "https://api.themoviedb.org/3/certification/movie/list?api_key=" + api;
//var getCredits = "https://api.themoviedb.org/3/credit/{credit_id}?api_key=" + api;

var api = "a610c6a9537cc833aef3465e46fba9e6";
var person = "";
var movie = "";
var userInput = "";

initGame();
console.log("movie check here " + checkActorinMovie("danny devito", "Matilda"));

$("#submit-btn").on("click", function () {
    let temp = $("#person").val();
    userInput = temp;
    temp.trim();
    person = temp.replace(" ", "&20");
    //console.log(person);

    var getPerson = "https://api.themoviedb.org/3/search/person?api_key=" + api + "&language=en-US&query=" + person + "&page=1&include_adult=false";

    $.ajax({
        url: getPerson,
        method: "GET"
    }).then(function (res) {
      
        console.log(res);
        let personId = res.results[0].id;
        let getMovieCredits = "https://api.themoviedb.org/3/person/" + personId + "/movie_credits?api_key=" + api + "&language=en-US";


        $.ajax({
            url: getMovieCredits,
            method: "GET"
        }).then(function (movieResults) {
          //if cast[i].title.indexOf(userGuess) > 0, then score++
          //maybe consider an acceptable edit distance for typos?
          
          console.log(movieResults);
          $("#img-display").attr("src", "https://image.tmdb.org/t/p/w500" + movieResults.cast[0].poster_path);
        });
    });
});

$("#random-movie").on("click", function(){
  
  let randomPage = Math.floor(Math.random() * 499 + 1);

  let randomURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + api + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + randomPage;
  
  $.ajax({
      url: randomURL,
      method: "GET"
    }).then(function(res) {
        let randomIndex = Math.floor(Math.random * res.results.length + 1);
        console.log("Movie List: ");
        console.log(res);
  });
});

//checks the user input with the correct answer will be called on submit button
//we can also put our typo check in this function most likely
/* function checkAnswer() {
  
};

//this function will perform most of the ajax requests and will actually find the correct answer
function findAnswer() {
  
};

function retrieveNextQuestion() {
    
  
};
*/
function checkActorinMovie(tempactor, tempmovie) {

    var actor = "";
    tempactor.trim();
    actor = tempactor.replace(" ", "%20");
    var getPerson = "https://api.themoviedb.org/3/search/person?api_key=" + api + "&language=en-US&query=" + actor + "&page=1&include_adult=false";
    var actorIn = false;

    $.ajax({
        url: getPerson,
        method: "GET"
    }).then(function (res) {

        console.log(res);
      let actorGet = true;
      let actorGetIndex = 0;
      while(actorGet) {
        if(tempactor === res.results[actorGetIndex].name) {
          actorGet = false;
        }
      }
        let personId = res.results[actorGetIndex].id;
        console.log("personID " + personId);
        let getMovieCredits = "https://api.themoviedb.org/3/person/" + personId + "/movie_credits?api_key=" + api + "&language=en-US";

        $.ajax({
            url: getMovieCredits,
            method: "GET"
        }).then(function (movieResults) {
            let movieindexID = 0;
            let actorIn = false;
            console.log(movieResults);
            while (actorIn == false) {
              console.log(movieResults.cast[movieindexID].original_title);
                if (tempmovie === movieResults.cast[movieindexID].original_title) {
                    actorIn = true;
                    console.log("actors in it");
                }
                movieindexID++;
            }
            movieindexID = 0;
        });
    });
    return actorIn;
};
                

function initGame() {
};