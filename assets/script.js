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
    var cityName;
    var weatherApiUrl = "https://api.openweathermap.org/" + cityName; // this needs to be worked on
    console.log("Hello world");
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