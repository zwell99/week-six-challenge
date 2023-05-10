// jquery didn't work for these first two
//  doing it this way seemed simpler than however I needed to resolve the jquery issue
var searchFormEl = document.querySelector('#searchForm');
var cityInputEl = document.querySelector('#city');
//var prevSearchesEl = document.querySelector('#previousCities');
var prevSearchesEl = $("#previousCities");


var prevSearches = [];

function formSubmitHandler(event) {
    event.preventDefault();
    var cityName = cityInputEl.value;//.trim();

    if (cityName) {
        getCityWeather(cityName);
        prevSearchesEl.append(createButton(cityName)); // maybe skip the array and add directly to html?
      } else {
        alert('Please enter a city');
      }
}

function getCityWeather(name) {
    var cityApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + name + "&limit=1&appid="; // appid?
    var cityLat;
    var cityLon;
    fetch(cityApiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          cityLat = data.lat;
          cityLon = data.lon;
        })
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    var weatherSymbol = [];
    var temp = [];
    var wind = [];
    var humid = [];
    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + cityLat + "&lon=" + cityLon + "&cnt=6&units=imperial&appid=";
    fetch(weatherApiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          for (var i = 0; i < 6; i++) {
            weatherSymbol.push(data.list[i].weather[0].icon); // replace icon with main/description?
            temp.push(data.list[i].temp.day);
            wind.push(data.list[i].speed);
            humid.push(data.list[i].humidity);
          }
        })
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    console.log(weatherSymbol);
    console.log(temp);
    console.log(wind);
    console.log(humid);
    fillTodayWeather();
    fillWeekWeather();
}

function createButton(name) {
    var newButton = $("<button>");
    newButton.addClass("btn");
    //newButton.addId(name);
    newButton.text(name);
    newButton.click(function () {getCityWeather(name)});
    return newButton;
}

searchFormEl.addEventListener('submit', formSubmitHandler);