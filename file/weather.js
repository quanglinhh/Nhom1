var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')
var name = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');
var time = document.querySelector('.time');


button.addEventListener('click',function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+
        '&appid=77abc29af7c70f73010035f963b0c520&units=metric&lang=vi')

        .then(response => response.json())
        .then(data => {
            var nameValue = data['name'];
            var tempValue = data['main']['temp'];
            var descValue = data['weather'][0]['description'];
            var timeValue = data['time'];

           name.innerHTML = nameValue
            temp.innerHTML = tempValue;
            desc.innerHTML = descValue;
            time.innerHTML = timeValue;
        })

        .catch(err => alert("Wrong city name!"))
})