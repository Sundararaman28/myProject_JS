const apiKey = '03a1779ce2f5049bb6a18dbcce1192e2'; 
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.querySelector('.inputCity-js');

function search() {
   const cityName = cityInput.value.trim();
   if (cityName === '') {
       alert('Please enter a city name');
       return;
   }
   addtohistory(cityName);
   fetchWeatherData(`${baseUrl}?q=${cityName}&appid=${apiKey}`);
}

let searchHistory = []
function myLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                console.log('Latitude:', latitude);
                console.log('Longitude:', longitude);
    
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    
                fetch(apiUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        const cityName = data.name;
                        addtohistory(cityName);
                        alert(`You are in ${cityName}`);
                        displayWeatherData(data);
                    })
                    .catch(error => {
                        console.error('Error fetching weather data:', error);
                    });
            },
            error => {
                console.error('Error getting location:', error);
            }
        );
    } else {
        console.error('Geolocation is not supported by your browser.');
    }
}
function addtohistory(cityName){
    searchHistory.unshift(cityName);
    searchHistory = searchHistory.slice(0,6);
}

function showHistory() {
    const historydiv = document.getElementById('weatherDisplay');
    historydiv.innerHTML ='';
    for(let i =0; i < searchHistory.length; i++){
        const item = document.createElement('li');
        item.textContent = searchHistory[i];
        historydiv.appendChild(item);
    }
}




function fetchWeatherData(url) {
   console.log(url);
   fetch(url)
       .then(response => {
           if (!response.ok) {
               throw new Error('Network response was not ok');
           }
           return response.json();
       })
       .then(data => {
           displayWeatherData(data);
       })
       .catch(error => {
           console.error('Error fetching weather data:', error);
           alert('Error fetching weather data. Please try again.');
       });
}


function displayWeatherData(data) {
   const temperature = data.main.temp;
   const humidity = data.main.humidity;
   const windSpeed = data.wind.speed;
   const weatherDescription = data.weather[0].description;

   weatherDisplay.innerHTML = `
       <p>Temperature: ${temperature} K</p>
       <p>Humidity: ${humidity}%</p>
       <p>Wind Speed: ${windSpeed} m/s</p>
       <p>Weather Description: ${weatherDescription}</p>
   `;
}
