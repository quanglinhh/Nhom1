
document.addEventListener("DOMcontentloaded", function (e){
    const citySearch = document.getElementById("city");
    citySearch.onkeydown = function (event){
        if(event.keyCode == 13){
            loadWeather(this.value)
        }
    }
});

function loadWeather(city) {
    var weather_API = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c8e69a70e46e8bf8c295679e86315c5f&units=metric&mode=html";
    var xhr = new XMLHttpRequest();
    var responseJson = JSON.parse(this.responseText);
    console.log( responseJson);
}
    /*
    xhr.open("GET", weather_API, true);
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            //Kết quả trả về thành kieu json
            var responseJson = JSON.parse(this.responseText);
            var htmlContent = "";
            var cityName = responseJson.name;
            var temp = responseJson.main.temp;
            var cloud = responseJson.clouds.dt;
            var wind = responseJson.wind.speed;
            var pressure = responseJson.main.pressure;
            var cityId = responseJson.id;

            htmlContent += '<div onclick="showWeather(\'' + cityId + '\')">'
            htmlContent += '<div >' + cityName + '</div>'
            htmlContent += '<div >' + temp + '</div>'
            //htmlContent += '<div >' + cloud + '</div>'
            //htmlContent += '<div >' + wind + '</div>'
            //htmlContent += '<div >' + pressure + '</div>'
            htmlContent += '</div>'
            document.getElementById("weatherContainer").innerHTML = htmlContent;

            }
        }
    xhr.send();
}
/*
const input = document.getElementById("input");
const city = document.getElementById("city");
const cityName = document.getElementById("cityName");
const Temp = document.getElementById("temp");
//const Description = document.getElementById("description");

const xhr = new XMLHttpRequest();
xhr.open('GET',"https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=c8e69a70e46e8bf8c295679e86315c5f&units=metric");
xhr.onload = function(){
    const data = JSON.parse(xhr.responseText);
    cityName.innerHTML = data.name;
    Temp.innerHTML = data.main.temp;
    //Description.innerHTML = data.weather[0].description;
};
xhr.send();
*/

