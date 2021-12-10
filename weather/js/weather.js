document.addEventListener("DOMContentLoaded",function(event){
    var inputSearch = document.getElementById("city");
    inputSearch.onkeydown = function(event){
        if(event.keyCode==13){
            loadWeather(this.value);

        }
    }
    loadWeather("hanoi");
});

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const Description = document.getElementById("description");
const cloud = document.getElementById("cloud")
const humidity = document.getElementById("humidity")
const wind = document.getElementById("wind")
const pressure = document.getElementById("pressure")


function loadWeather(city){
    var weather_API = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c8e69a70e46e8bf8c295679e86315c5f&units=metric";
    var xhr = new XMLHttpRequest();
    xhr.open("GET",weather_API,true);
    xhr.onreadystatechange = function(){
        const data = JSON.parse(this.responseText);

        cityName.innerHTML = data.name;
        temp.innerHTML = data.main.temp;
        Description.innerHTML = data.weather[0].description;
        cloud.innerHTML =data.clouds.all;
        humidity.innerHTML =data.main.humidity;
        wind.innerHTML =data.wind.speed;
        pressure.innerHTML = data.main.pressure;

    };
    xhr.send();
}




