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
    let timeElement = document.querySelector("#time")

    timeElement.innerHTML = formatDate(date); 
    cityElement.innerHTML = response.data.city; 
    temperatureElement.innerHTML = temperature;  
    descriptionElement.innerHTML = description; 
    humidityElement.innerHTML = humidity + "%"; 
    windElement.innerHTML = windSpeed + " km/h"; 
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
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`; 
    axios.get(apiUrl).then(refreshWeather); 
    console.log(apiUrl);
}

function handleSearchSubmit(event) {
    event.preventDefault(); 
    let searchInput = document.querySelector("#search-form-input"); 
    searchCity(searchInput.value); 
}
let searchFormElement = document.querySelector("#search-form"); 
searchFormElement.addEventListener("submit", handleSearchSubmit); 

searchCity("Lisbon"); 