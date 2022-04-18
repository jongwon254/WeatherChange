let weather = {
    
    // get weather information from api with specific parameters
    "apiKey": "YOUR_API_KEY_HERE",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.apiKey
        )
        // check if input is correct
        .then((response) => {
            if (!response.ok) {
                alert("City not found.");
            }
            return response.json();
        })
        .then((data) => this.displayWeather(data));

    },

    // extract information from JSON object
    displayWeather: function(data) {

        // city name
        const { name } = data; 

        // weather icon and description (cloudy, sunny, ..)
        const { icon, description} = data.weather[0];

        // Temp in celcius and humidity
        const { temp, humidity } = data.main;

        // wind speed
        const { speed } = data.wind;

        // change placeholder text into actual data
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humiditiy: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");

        // change background according to weather forecast
        document.body.style.backgroundImage = "url('https://source.unsplash.com/random/800x600/?" + description + "')";
    },

    // get city from search bar
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

// listening to button click
document.querySelector(".search button").addEventListener("click", function() {
    weather.search(); 
});

// searching with enter key
document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

// get current location of user
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  // convert (lat,long) position into city name and fetch weather data of location
  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude =  position.coords.longitude;

    const geoApi = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude="
    + latitude  + "&longitude=" + longitude + "&localityLanguage=en";

    fetch(geoApi)
    .then(response => response.json())
    .then(data => {
        weather.fetchWeather(data.city);
    })
  }

// standard weather forecast of user location
getLocation();