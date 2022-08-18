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
} from "./apiKeys.js";

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

// ||Get the user device location //
let geocode = {
  getLocation: () => {
    // if browser support navigator.geolocation api, else for default 'Philippine location' //
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, console.error);
    } else {
      getWeather("Japan");
    }

    function success(data) {
      geocode.reverseGeocode(data.coords.latitude, data.coords.longitude);
    }
  },

  reverseGeocode: (latitude, longitude) => {
    let api_url = "https://api.opencagedata.com/geocode/v1/json";

    let request_url =
      api_url +
      "?" +
      "key=" +
      OPEN_CAGE_DATA_API_KEY +
      "&q=" +
      encodeURIComponent(latitude + "," + longitude) +
      "&pretty=1" +
      "&no_annotations=1";

    let request = new XMLHttpRequest();
    request.open("GET", request_url, true);

    request.onload = function () {
      if (request.status === 200) {
        // Success!
        let data = JSON.parse(request.responseText);
        getWeather(data.results[0].components.city);
      } else if (request.status <= 500) {
        console.log("unable to geocode! Response code: " + request.status);
        let data = JSON.parse(request.responseText);
        console.log("error msg: " + data.status.message);
      } else {
        console.log("server error");
      }
    };

    request.onerror = function () {
      // There was a connection error of some sort
      console.log("unable to connect to server");
    };

    request.send(); // make the request
  },
};
geocode.getLocation();

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
