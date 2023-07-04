let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let time = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0 ${now.getMinutes()}`;
}

let today = document.querySelector("#today");

today.innerHTML = `${day} ${time}:${minutes}`;

function form(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemp);
}
let click = document.querySelector("form");
click.addEventListener("submit", form);

function showTemp(response) {
  let celsiusTemperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = celsiusTemperature;

  let h1 = document.querySelector("#city-value");
  h1.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let windspeed = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#windspeed");
  windElement.innerHTML = `Wind: ${windspeed}km/h`;
  let iconElement = document.querySelector("#today-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheiTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = celsiusTemperature;
}
let celsiusTemperature = showTemp(response);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemp);
}

function currentBtn() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}
let press = document.querySelector(".btn-secondary");
press.addEventListener("click", currentBtn);
