const input = document.querySelector(".js-input"),
  button = document.querySelector(".js-button"),
  date = document.querySelector(".date"),
  time = document.querySelector(".time"),
  toggleWeatherIcon = document.querySelector(".js-weather-icon"),
  loadingSpinner = document.querySelector(".js-spinner");

import {
  WEATHER_API_KEY,
  OPEN_CAGE_DATA_API_KEY,
  weatherConditions,
} from "./js/hiddenModule.js";

// ||Search country information //
button.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value === "") {
    toggleWeatherIcon.classList.toggle("js-weather-icon-display");
    input.classList.toggle("js-input-toggle");
  } else {
    getWeather(input.value);
    input.value = "";
  }
});

// ||Getting weather information thru API //
const getWeather = async (city) => {
  loadingSpinner.classList.remove("hidden");
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${WEATHER_API_KEY}`
    );
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const resultData = await response.json();
    renderWeatherData(resultData);
  } catch {
    alert("Failed! Please try again.");
  } finally {
    loadingSpinner.classList.add("hidden");
  }
};

// ||Display weather information //
const renderWeatherData = (weatherData) => {
  const { name } = weatherData,
    { feels_like, humidity, temp } = weatherData.main,
    { icon, description } = weatherData.weather[0],
    { speed } = weatherData.wind;

  // ||weatherConditions(description) - function initialize in hiddenModule.js //
  weatherConditions(description);

  document.querySelector(".js-temperature-location").textContent = name;
  document.querySelector(".js-main-temperature").textContent = temp;
  document.querySelector(".js-temperature-condition").textContent =
    description.charAt(0).toUpperCase() + description.slice(1);

  document.querySelector(
    ".weather-condition-icon"
  ).src = `https://openweathermap.org/img/wn/${icon}.png`;
  document.querySelector(".js-bottom-temperature").textContent = `${temp}°C`;
  document.querySelector(".js-feels-like").textContent = `${feels_like}°C`;
  document.querySelector(".js-humidity").textContent = `${humidity}%`;
  document.querySelector(".js-speed").textContent = `${speed}km/h`;
};

// ||IIFE to get the user device location //
(function userLocation() {
  if (navigator.geolocation) {
    const confirmLocation = confirm("Allow to get your location?");
    confirmLocation == true
      ? navigator.geolocation.getCurrentPosition(getLocation, Error)
      : getWeather("Japan");
  } else {
    alert("Browser not supported, displaying default location");
  }

  function getLocation(data) {
    let { latitude, longitude } = data.coords;
    fetch(
      "https://api.opencagedata.com/geocode/v1/json" +
        "?" +
        "key=" +
        OPEN_CAGE_DATA_API_KEY +
        "&q=" +
        encodeURIComponent(latitude + "," + longitude) +
        "&pretty=1" +
        "&no_annotations=1"
    )
      .then((response) => response.json())
      .then((response) => {
        const userLocation = response.results[0].components.city;
        getWeather(userLocation);
      })
      .catch(() => {
        alert("Something went wrong");
      });
  }

  function Error(error) {
    if (error.code == 1) {
      alert("Location unavailable");
    } else {
      alert("Something went wrong");
    }
  }
})();

// ||Date and Time //
function dateTime() {
  const now = luxon.DateTime.now(),
    hour = now.toFormat("h"),
    min = now.toFormat("mm a");

  date.textContent = now.toFormat("LLLL dd, yyyy");
  hour <= 12
    ? (time.textContent = `${hour}:${min}`)
    : (time.textContent = `${hour}:${min}`);
}

setInterval(() => {
  dateTime();
}, 1000);
