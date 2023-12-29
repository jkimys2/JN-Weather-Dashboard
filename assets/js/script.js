var searchBtn = $("#search-btn");
var searchCard = $(".search-card");
var resultsCard = $(".results-card");
var currentSearchCard = $("#current-search");
var savedSearches = JSON.parse(localStorage.getItem("city")) || [];
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
          displayCurrentWeather(data, name);
        });
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
      .text("Temp: " + data.main.temp + " °F");
    var windEl = $("<h3>")
      .addClass("card-text")
      .text("Wind Speed: " + data.wind.speed + " MPH");
    var humidityEl = $("<h3>")
      .addClass("card-text")
      .text("Humidity: " + data.main.humidity + " %");
    currentWeather.append(tempEl, windEl, humidityEl);
    getForecast(data.coord.lat, data.coord.lon);
    saveSearch(cityName);
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
          var lat = data[0].lat;
          var lon = data[0].lon;
          var name = data[0].name;
          getCurrentWeather(lat, lon, name);
        });
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
          for (var i = 0; i < data.list.length; i++) {
            var forecastTime = data.list[i].dt_txt.split(" ").pop();
            if (forecastTime === "12:00:00") {
              forecastArray.push(data.list[i]);
            }
          }
          displayForecast(forecastArray);
        });
      }
    });
  };
  var displayForecast = function (data) {
    var fiveDayCard = $("#five-day-card");
    var fiveDayText = $("#five-day-text");
    fiveDayText.text("5 Day Forecast:");

    for (var i = 0; i < data.length; i++) {
      var date = $("<h4>")
        .text(data[i].dt_txt.split(" ")[0])
        .addClass("forecast-background");
      var icon = document.createElement("img");
      icon
        .setAttribute(
          "src",
          "http://openweathermap.org/img/wn/" +
            data[i].weather[0].icon +
            "@2x.png"
        );
      icon.style.backgroundColor = "rgb(0, 123, 255)";
        date.append(icon)
      date.addClass("forecast-background");
      var temp = $("<h5>")
        .text(data[i].main.temp + " °F")
        .addClass("forecast-background");
      var wind = $("<h5>")
        .text(data[i].wind.speed + " MPH")
        .addClass("forecast-background");
      var humidity = $("<h5>")
        .text(data[i].main.humidity + " %")
        .addClass("forecast-background");
      var dataCard = $("<div>").addClass("data-card");
      dataCard.append(date, temp, wind, humidity);
      fiveDayCard.append(dataCard);
    }
  };
  var saveSearch = function (city) {
    localStorage.setItem("city", city);
  };
}
// click event for search button
searchBtn.click(handleSearch);
