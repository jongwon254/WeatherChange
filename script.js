var weather = {
    
    // get weather information from api with specific parameters
    "apiKey": "ecb0381659a4d82b4beb615cc0f84b6c",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.apiKey
        )
        .then((response) => response.json())
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

        chrome.tabs.executeScript({
            file: "app.js"
        })
        
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

// standard location at loading = Munich
weather.fetchWeather("Munich");

// background of page
chrome.tabs.executeScript({
    file: "app.js"
})