// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// 844ec1c0353468ff6ba5ee6c915f2b6f

let cityName;
const API_KEY = '844ec1c0353468ff6ba5ee6c915f2b6f'


const searchBtn = document.querySelector(".searchBtn");
const input = document.querySelector('input[type="text"]')
const temperatureEl = document.querySelector('.temp');
const cityEl = document.querySelector('.city');
const humidityEl = document.querySelector('.humidity');
const windEl = document.querySelector('.wind')
const weather_img = document.querySelector(".weather-icon");


async function weatherData(){
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY }`;

    try{
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data);

        // Check if the API response indicates an error
        if(data.cod === "404"){
            cityEl.textContent = "City not Found. Please try again!";
            cityEl.style = 'color: red'
            temperatureEl.textContent = '';
            humidityEl.textContent = '';
            windEl.textContent = '';
            return
        }

        // data from API response
        const city_name = data.name;
        const temp = data.main.temp;
        const tempInCelsius = (temp - 273.15).toFixed(2);
        const humidity = data.main.humidity;
        const wind = data.wind.speed;
        const weatherCondition = data.weather[0].main;
        const weatherDescription = data.weather[0].description;

        // Update UI elements
        cityEl.textContent = city_name;
        temperatureEl.textContent = tempInCelsius;
        humidityEl.textContent = humidity;
        windEl.textContent = wind;

        // Update weather image based on condition
        let imagePath = '';
        switch(weatherCondition.toLowerCase()){
            case 'rain':
                imagePath = 'images/rain.png';
                break;
            case 'clouds':
                imagePath = 'images/clouds.png';
                break;
            case 'clear':
                imagePath = 'images/clear.png';
                break;
            case 'drizzle':
                imagePath = 'images/drizzle.png';
                break;
            case 'mist':
                imagePath = 'images/mist.png';
                break;
            case 'snow':
                imagePath = 'images/snow.png';
                break;
            default: 
                imagePath = 'images/clouds.png'
        }
        weather_img.setAttribute('src', imagePath);

    } catch(error){
        console.log(error.message);
    }
    
}


searchBtn.addEventListener("click", () => {
    cityName = input.value ;
    console.log(cityName);
    if(cityName.trim() === ''){
        console.error("City name cannot be empty");
        cityEl.textContent = "Please enter a city name!";
        return;
    }
    weatherData()
})