// Replace with your WeatherAPI.com API key
const apiKey = '8adcaf23632c4f21b60164941250506'; // Get your API key from https://www.weatherapi.com
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const temp = document.getElementById('temp');
const weatherIcon = document.getElementById('weather-icon');
const weatherDesc = document.getElementById('weather-desc');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

// Function to update weather icon based on weather condition
function updateWeatherIcon(condition) {
    const iconMap = {
        'Sunny': 'fa-sun',
        'Clear': 'fa-sun',
        'Partly cloudy': 'fa-cloud-sun',
        'Cloudy': 'fa-cloud',
        'Overcast': 'fa-cloud',
        'Mist': 'fa-smog',
        'Patchy rain possible': 'fa-cloud-rain',
        'Patchy snow possible': 'fa-snowflake',
        'Patchy sleet possible': 'fa-snowflake',
        'Patchy freezing drizzle possible': 'fa-snowflake',
        'Thundery outbreaks possible': 'fa-bolt',
        'Blowing snow': 'fa-snowflake',
        'Blizzard': 'fa-snowflake',
        'Fog': 'fa-smog',
        'Freezing fog': 'fa-smog',
        'Patchy light drizzle': 'fa-cloud-rain',
        'Light drizzle': 'fa-cloud-rain',
        'Freezing drizzle': 'fa-cloud-rain',
        'Heavy freezing drizzle': 'fa-cloud-rain',
        'Patchy light rain': 'fa-cloud-rain',
        'Light rain': 'fa-cloud-rain',
        'Moderate rain at times': 'fa-cloud-rain',
        'Moderate rain': 'fa-cloud-rain',
        'Heavy rain at times': 'fa-cloud-showers-heavy',
        'Heavy rain': 'fa-cloud-showers-heavy',
        'Light freezing rain': 'fa-cloud-rain',
        'Moderate or heavy freezing rain': 'fa-cloud-showers-heavy',
        'Light sleet': 'fa-snowflake',
        'Moderate or heavy sleet': 'fa-snowflake',
        'Patchy light snow': 'fa-snowflake',
        'Light snow': 'fa-snowflake',
        'Patchy moderate snow': 'fa-snowflake',
        'Moderate snow': 'fa-snowflake',
        'Patchy heavy snow': 'fa-snowflake',
        'Heavy snow': 'fa-snowflake',
        'Ice pellets': 'fa-snowflake',
        'Light rain shower': 'fa-cloud-rain',
        'Moderate or heavy rain shower': 'fa-cloud-showers-heavy',
        'Torrential rain shower': 'fa-cloud-showers-heavy',
        'Light sleet showers': 'fa-snowflake',
        'Moderate or heavy sleet showers': 'fa-snowflake',
        'Light snow showers': 'fa-snowflake',
        'Moderate or heavy snow showers': 'fa-snowflake',
        'Light showers of ice pellets': 'fa-snowflake',
        'Moderate or heavy showers of ice pellets': 'fa-snowflake',
        'Patchy light rain with thunder': 'fa-bolt',
        'Moderate or heavy rain with thunder': 'fa-bolt',
        'Patchy light snow with thunder': 'fa-bolt',
        'Moderate or heavy snow with thunder': 'fa-bolt'
    };
    
    weatherIcon.className = 'fas ' + (iconMap[condition] || 'fa-cloud');
}

// Function to fetch weather data
async function getWeatherData(city) {
    try {
        console.log('Fetching weather for:', city);
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`
        );
        
        const data = await response.json();
        console.log('API Response:', data);
        
        if (data.error) {
            throw new Error(data.error.message || 'Failed to fetch weather data');
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        alert('Error: ' + error.message);
        return null;
    }
}

// Function to update UI with weather data
function updateUI(data) {
    cityName.textContent = data.location.name;
    temp.textContent = Math.round(data.current.temp_c);
    weatherDesc.textContent = data.current.condition.text;
    humidity.textContent = data.current.humidity + '%';
    windSpeed.textContent = Math.round(data.current.wind_kph) + ' km/h';
    updateWeatherIcon(data.current.condition.text);
}

// Event listener for search button
searchBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    console.log('Searching for city:', city);
    const weatherData = await getWeatherData(city);
    if (weatherData) {
        updateUI(weatherData);
    }
});

// Event listener for Enter key
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission
        searchBtn.click();
    }
}); 