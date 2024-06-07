const apiKey = '9b5e35ded2d8e3ded8fe7a5c1f1a1136'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('city').value;
    if (city.trim() === '') {
        alert('Please enter a city name');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found');
            } else if (response.status === 401) {
                throw new Error('Invalid API key');
            } else {
                throw new Error('Unable to fetch weather data');
            }
        }
        const data = await response.json();
        console.log(data); // For debugging
        displayWeather(data);
    } catch (error) {
        console.error(error); // For debugging
        alert(error.message);
    }
}

function displayWeather(data) {
    const location = `${data.name}, ${data.sys.country}`;
    const description = data.weather[0].description;
    const temperature = `Temperature: ${data.main.temp}°C`;
    const humidity = `Humidity: ${data.main.humidity}%`;

    document.getElementById('location').textContent = location;
    document.getElementById('description').textContent = description;
    document.getElementById('temperature').textContent = temperature;
    document.getElementById('humidity').textContent = humidity;
}
