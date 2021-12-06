const input = document.getElementById("input");
const city = document.getElementById("city");
const cityName = document.getElementById("cityName");
const Temp = document.getElementById("temp");
const Description = document.getElementById("description");

const xhr = new XMLHttpRequest();
xhr.open('GET',"https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=c8e69a70e46e8bf8c295679e86315c5f&units=metric");
xhr.send();
xhr.onload = () =>{
    const data = JSON.parse(xhr.response);
    cityName.innerHTML = data.name;
    Temp.innerHTML = data.main.temp;
    Description.innerHTML = data.weather[0].description;
};
