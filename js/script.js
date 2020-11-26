function formatDate() {
    let currentDate = new Date();
    let hours = currentDate.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = currentDate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    let date = currentDate.getDate();
    let day = days[currentDate.getDay()];
    let month = months[currentDate.getMonth()];
    let formattedDate = `${day} ${month} ${date}, ${hours}:${minutes}`;
    return formattedDate;
}
let h2 = document.querySelector("h2#current-date");
h2.innerHTML = formatDate();

function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 66;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 19;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

function viewWeather(response) {
    document.querySelector("#city-name").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
        response.data.main.temp
    );
    document.querySelector(
        "#humidity"
    ).innerHTML = `humidity: ${response.data.main.humidity}%`;
    document.querySelector("#wind").innerHTML = `wind: ${Math.round(
      response.data.wind.speed
    )} km/h`;
}

function search(city) {
    let apiKey = "125ae54afb30daf43aec3cdb943d26b0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(viewWeather);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    search(city);
}

function searchLocation(position) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(viewWeather);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#form-search");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);