const inputRef = document.querySelector(".searchField");
const buttonRef = document.querySelector('button[type="submit"]');
const tempRef = document.querySelector(".weather .temp");
const locationRef = document.querySelector(".weather .time_location p");
const dateRef = document.querySelector(".weather .time_location span");
const conditionIconRef = document.querySelector(
  ".weather .weather_condition p img"
);
const conditionTextRef = document.querySelector(
  ".weather .weather_condition span"
);

buttonRef.addEventListener("click", function (e) {
  e.preventDefault();
  fetchWeatherData(inputRef.value);
});

function fetchWeatherData(location) {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=ce243b82d9da40f8ad9132812240612&q=${location}`
  )
    .then((res) => res.json())
    .then((data) => {
      setWeatherData(data);
    });
}

function setWeatherData(data) {
  tempRef.innerText = data.current.temp_c;
  locationRef.innerText = data.location.name;
  conditionIconRef.src = data.current.condition.icon;
  dateRef.innerText = data.location.localtime;
  conditionTextRef.innerText = data.current.condition.text;
}
