var searchBtn = document.querySelector("#search-btn");
var searchCard = document.querySelector(".search-card");
var resultsCard = document.querySelector(".results-card");

// function for search button
function handleSearchSumbit(event) {
  event.preventDefault();

  var cityInputVal = document.querySelector("#city-input").value;

  // call from localstorage and append to #prev-search

  // API call for city & save to localstorage
  var getWeatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={cc11ae7480c164c7b800ffa97b091fd9}";

  // API call for 5 day forcast
  var getFiveDayUrl =
    "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={cc11ae7480c164c7b800ffa97b091fd9}";
}

// click event for search button
searchBtn.addEventListener("click", handleSearchSumbit)