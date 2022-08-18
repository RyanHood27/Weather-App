const WEATHER_API_KEY = "78c4424f64e48daafbf2f01d19903298";
const OPEN_CAGE_DATA_API_KEY = "eb1457ff2c7b48e1a3aa57dffc847cb5";

function weatherConditions(description) {
  const header = document.querySelector("header"),
    main = document.querySelector("main"),
    mainSectionColor = document.querySelector("main section"),
    footer = document.querySelector("footer");

  switch (true) {
    case description.includes("clouds"):
      (header.style.backgroundColor = "#13141a"),
        (footer.style.backgroundColor = "#13141a");
      main.style.backgroundImage =
        "url(/img/weatherConditions/cloudyWeather.png";
      mainSectionColor.style.backgroundColor = "rgba(19, 20, 26, 0.1)";
      break;
    case description.includes("sky"):
      (header.style.backgroundColor = "#055a87"),
        (footer.style.backgroundColor = "#055a87");
      main.style.backgroundImage = "url(/img/weatherConditions/clearSky.jpg";
      mainSectionColor.style.backgroundColor = "rgba(5, 90, 135, 0.1)";
      break;
    case description.includes("rain"):
      (header.style.backgroundColor = "#1B2F3A"),
        (footer.style.backgroundColor = "#1B2F3A");
      main.style.backgroundImage = "url(/img/weatherConditions/rain.jpg";
      mainSectionColor.style.backgroundColor = "rgba(27, 47, 58, 0.1)";
      break;
    case description.includes("thunderstorm"):
      (header.style.backgroundColor = "#000000"),
        (footer.style.backgroundColor = "#000000");
      main.style.backgroundImage =
        "url(/img/weatherConditions/thunderStorm.jpg";
      mainSectionColor.style.backgroundColor = "rgba(4, 4, 52, 0.1)";
      break;
    case description.includes("snow"):
      (header.style.backgroundColor = "#10131a"),
        (footer.style.backgroundColor = "#10131a");
      main.style.backgroundImage = "url(/img/weatherConditions/snow.jpg";
      mainSectionColor.style.backgroundColor = "rgba(16, 19, 26, 0.1)";
      break;
    case description.includes("mist"):
      (header.style.backgroundColor = "#6a826a"),
        (footer.style.backgroundColor = "#6a826a");
      main.style.backgroundImage = "url(/img/weatherConditions/mist.jpg";
      mainSectionColor.style.backgroundColor = "rgba(0, 128, 0, 0.1)";
      break;

    default:
      header.style.backgroundColor = "#000000";
      main.style.backgroundColor = "#696363";
      footer.style.backgroundColor = "#000000";
  }
}

export { WEATHER_API_KEY, OPEN_CAGE_DATA_API_KEY, weatherConditions };
