const API_KEY = '912a85e1e7ae432cbf853336250704'; // Replace this with your actual API key from WeatherAPI.com
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

const searchButton = document.getElementById('search');
const locationInput = document.getElementById('location');
const weatherCard = document.querySelector('.weather-card');

searchButton.addEventListener('click', getWeather);
locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});

function showLoading() {
    weatherCard.innerHTML = '<p>Loading...</p>';
}

function showError(message) {
    weatherCard.innerHTML = `<p style="color: red;">${message}</p>`;
}

async function getWeather() {
    const location = locationInput.value.trim();
    if (!location) {
        alert('Please enter a city name');
        return;
    }

    showLoading();

    try {
        const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${location}&aqi=no`);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            showError(data.error?.message || 'City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError('Error fetching weather data. Please try again.');
    }
}

function displayWeather(data) {
    const { location, current } = data;
    weatherCard.innerHTML = `
        <h2>${location.name}, ${location.country}</h2>
        <div class="temperature">
            <span>${Math.round(current.temp_c)}</span>
            <span>°C</span>
        </div>
        <div class="details">
            <p>Humidity: ${current.humidity}%</p>
            <p>Wind Speed: ${current.wind_kph} km/h</p>
            <p>Condition: ${current.condition.text}</p>
        </div>
    `;
} 