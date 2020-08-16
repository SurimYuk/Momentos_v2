"use strict";

const weatherContainer = document.querySelector(".js-weather-container"),
  weather = weatherContainer.querySelector(".js-weather"),
  locationContainer = weatherContainer.querySelector(".js-location"),
  iconContainer = weatherContainer.querySelector(".js-weather-icon");

const WEATHER_API_KEY = "8b0ca7f6875996929bf30f0b5c090fbc";
const COORDS_LS = "coordinate";

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function getPositionSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  console.log(latitude, longitude);
  showWeather(coordsObj.latitude, coordsObj.longitude);
}

function getPositionFailed() {
  console.log("Can't get position info.");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(
    getPositionSuccess,
    getPositionFailed
  );
}

function getWeatherIcon(icon) {
  return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

function showWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      const weatherIcon = json.weather[0].icon;

      iconContainer.src = getWeatherIcon(weatherIcon);
      weather.innerText = `${temperature}℃`;
      locationContainer.innerText = place;
    });
}

function init() {
  const savedLocation = localStorage.getItem(COORDS_LS);
  if (savedLocation === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(savedLocation);
    showWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

init();
