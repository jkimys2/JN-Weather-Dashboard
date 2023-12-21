var searchBtn = document.querySelector("#search-btn");
var searchCard = document.querySelector(".search-card");
var resultsCard = document.querySelector(".results-card");
var currentSearchCard = document.querySelector("#current-search");
var fiveDayCard = document.querySelector("#five-day-card");

// function for search button
function handleSearch(event) {
  event.preventDefault();

  // call from localstorage and append to #prev-search

  // API call for city & save to localstorage
  var getCurrentWeather = function (lat, lon, name) {
    var getWeatherUrl =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=imperial&appid=cc11ae7480c164c7b800ffa97b091fd9";
    fetch(getWeatherUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayCurrentWeather(data, name);
        });
      } else {
        console.error("error");
      }
    });
  };

  
  var displayCurrentWeather = function (data, cityName) {
    var currentCity = document.querySelector("#current-city");
    var currentWeather = $("#current-weather");
    currentWeather.empty();
    currentCity.textContent = cityName + ", " + data.name;
    var icon = document.createElement("img");
    icon.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
    );
    currentCity.append(icon);
    var tempEl = $("<h3>")
      .addClass("card-text")
      .text("Temp: " + data.main.temp);
    var windEl = $("<h3>")
      .addClass("card-text")
      .text("Wind Speed: " + data.wind.speed);
    var humidityEl = $("<h3>")
      .addClass("card-text")
      .text("Humidity: " + data.main.humidity);
    currentWeather.append(tempEl, windEl, humidityEl);
    // currentCity.append(icon)
    getForecast(data.coord.lat, data.coord.lon);
  };


  var getLatLon = function () {
    var cityInputVal = document.querySelector("#city-input").value;
    var geoUrl =
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      cityInputVal +
      "&limit=5&appid=cc11ae7480c164c7b800ffa97b091fd9";
    fetch(geoUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          var lat = data[0].lat;
          var lon = data[0].lon;
          var name = data[0].name;
          getCurrentWeather(lat, lon, name);
        });
      } else {
        console.error("error");
      }
    });
  };
  getLatLon();


  var getForecast = function (lat, lon) {
    var getWeatherUrl =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=imperial&appid=cc11ae7480c164c7b800ffa97b091fd9";
    fetch(getWeatherUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          var forecastArray = [];
          console.log(data);
          for (var i = 0; i < data.list.length; i++) {
            console.log(data.list[i]);
            var forecastTime = data.list[i].dt_txt.split(" ").pop();
            console.log(forecastTime);
            if (forecastTime === "12:00:00") {
              forecastArray.push(data.list[i]);
            }
          }
          console.log(forecastArray);
        });
      } else {
        console.error("error");
      }
    });
  };
  // API call for 5 day forcast
  //   var lat =
  //   var lon =
  //   var getFiveDayUrl =
  //     "api.openweathermap.org/data/2.5/forecast?lat=" +
  //     lat +
  //     "&lon=" +
  //     lon +
  //     "&appid=cc11ae7480c164c7b800ffa97b091fd9";
}
// click event for search button
searchBtn.addEventListener("click", handleSearch);
