// jquery didn't work for these first two
//  doing it this way seemed simpler than however I needed to resolve the jquery issue
var searchFormEl = document.querySelector('#searchForm');
var cityInputEl = document.querySelector('#city');
var prevSearchesEl = $("#previousCities");

var todayResults = $("#results").find("#today");
var futureResults= $("#results").find("#future");


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
    var apiKey = "e0061d20649a643387d6b548aace1afa"; //For some reason this works on the first api call, but not the second
    var cityApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + name + "&limit=1&appid=" + apiKey;
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
    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + cityLat + "&lon=" + cityLon + "&cnt=6&units=imperial&appid=" + apiKey;
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
    fillTodayWeather(weatherSymbol[0], temp[0], wind[0], humid[0]);
    fillWeekWeather(weatherSymbol, temp, wind, humid);
}

function fillTodayWeather(weatherSymbol, temp, wind, humid) {
    var symbol = todayResults.find("#icon");
    var temperature = todayResults.find("#temp");
    var windSpeed = todayResults.find("#wind");
    var humidity = todayResults.find("#humid");
    symbol.text(weatherSymbol);
    temperature.text("Temperature: " + temp + "F");
    windSpeed.text("Wind Speed: " + wind + "mph");
    humidity.text("Humidity: " + humid + "%");
}

function fillTodayWeather(weatherSymbol, temp, wind, humid) {
  for (var i = 1; i < 6; i++) {
    var elId = "day" + i;
    var currentEl = futureResults.find(elId);
    var symbol = currentEl.find("#icon");
    var temperature = currentEl.find("#temp");
    var windSpeed = currentEl.find("#wind");
    var humidity = currentEl.find("#humid");
    symbol.text(weatherSymbol[i]);
    temperature.text("Temperature: " + temp[i] + "F");
    windSpeed.text("Wind Speed: " + wind[i] + "mph");
    humidity.text("Humidity: " + humid[i] + "%");
  }
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