function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature"); 
    let temperature = Math.round(response.data.temperature.current); 
    let cityElement = document.querySelector("#weather-app-city"); 
    let description = response.data.condition.description; 
    let descriptionElement = document.querySelector("#description");
    let humidity = response.data.temperature.humidity; 
    let humidityElement = document.querySelector("#humidity"); 
    let windSpeed = response.data.wind.speed; 
    let windElement = document.querySelector("#wind"); 
    let date = new Date(response.data.time * 1000); 
    let timeElement = document.querySelector("#time"); 
    let iconElement = document.querySelector("#icon")
    
    timeElement.innerHTML = formatDate(date); 
    cityElement.innerHTML = response.data.city; 
    temperatureElement.innerHTML = temperature;  
    descriptionElement.innerHTML = description; 
    humidityElement.innerHTML = humidity + "%"; 
    windElement.innerHTML = windSpeed + " km/h"; 
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="icon" class="weather-app-icon" id="icon" />`; 
    
    getForecast(response.data.city); 
}

function formatDate(date) {
    let minutes = date.getMinutes(); 
    let hours = date.getHours(); 
    let days = [ "Sunday", "Monday", "Tuesdays", "Wednesday", "Thursday", "Friday", "Saturday", ]; 

    let day = days[date.getDay()]; 
    
    if (minutes < 10) {
        minutes = `0${minutes}`; 
    }

    return `${day} ${hours}:${minutes}`; 

}

function searchCity(city){
    let apiKey = "0460boe94324434b68t71afdcfb30fa4"; 
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`; 
    axios.get(apiUrl).then(refreshWeather); 
}

function handleSearchSubmit(event) {
    event.preventDefault(); 
    let searchInput = document.querySelector("#search-form-input"); 
    searchCity(searchInput.value); 
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000); 
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; 

    return days[date.getDay()]; 
}

function getForecast(city) {
    let apiKey = "0460boe94324434b68t71afdcfb30fa4"; 
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`; 
    axios(apiUrl).then(displayForecast); 
}

function displayForecast(response) {
    let forecastHtml = ""; 
    
    response.data.daily.forEach(function(day, index) {
        if (index < 5) { 
        forecastHtml = forecastHtml + `
        <div class="row">
        <div class="col-2">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <div>
        <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
        </div>
        <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max"
        ><strong>${Math.round(day.temperature.maximum)}°</strong></span
        >
        <span class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}°</span>
        </div>
        </div>
        </div>
        `
        }
    })
    
    let forecastElement = document.querySelector("#forecast"); 
    forecastElement.innerHTML = forecastHtml; 
}

let searchFormElement = document.querySelector("#search-form"); 
searchFormElement.addEventListener("submit", handleSearchSubmit); 

searchCity("Norwalk"); 
