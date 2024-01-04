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
    console.log(apiUrl);
}

function handleSearchSubmit(event) {
    event.preventDefault(); 
    let searchInput = document.querySelector("#search-form-input"); 
    searchCity(searchInput.value); 
}

function displayForecast() {
    let days = ["Tue", "Wed", "Thu", "Fri", "Sat"]; 
    let forecastHtml = ""; 
    
    days.forEach(function(days) {
        forecastHtml = forecastHtml + `
        <div class="row">
        <div class="col-2">
        <div class="weather-forecast-date">${days}</div>
        <img
        src="https://cdn1.iconfinder.com/data/icons/weather-line-5/500/weather-02-512.png"
        alt=""
        width="50px"
        />
        <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max"
        ><strong>18°</strong></span
        >
        <span class="weather-forecast-temperature-min">12°</span>
        </div>
        </div>
        </div>
        `
    })
    
    let forecastElement = document.querySelector("#forecast"); 
    forecastElement.innerHTML = forecastHtml; 
}

let searchFormElement = document.querySelector("#search-form"); 
searchFormElement.addEventListener("submit", handleSearchSubmit); 

searchCity("Los Angeles"); 
displayForecast(); 