const weatherCity = document.querySelector('.weather_city');
const weatherTemp = document.querySelector('.weather_temp');
const weatherIcon = document.querySelector('.weather_icon');
const weatherLike = document.querySelector('.weather_like');
const searchCity = document.querySelector('#searchCity');
let cityEnter = "Киров"

async function weather (){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityEnter}&appid=8863aa32b8dc6777a27722522c3c0462&units=metric`);
        const data = await response.json();
        console.log(data)
        weatherTemp.innerHTML = parseInt(data.main.temp) + "°";
        weatherCity.innerHTML = data.name;
        weatherIcon.innerHTML = data.weather[0]['description']
    }catch(err){    
        alert("ошибочка");
    };
}

weather ()

searchCity.addEventListener('keydown', function(event){
    if(event.code == 'Enter'){
        cityEnter = this.value
        console.log(cityEnter)
        this.value = ''
    }
    async function weather (){
        try{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityEnter}&appid=8863aa32b8dc6777a27722522c3c0462&units=metric`);
            const data = await response.json();
            console.log(data)
            weatherTemp.innerHTML = parseInt(data.main.temp) + "°";
            weatherCity.innerHTML = data.name;
            weatherIcon.innerHTML = data.weather[0]['description']
        }catch(err){
            console.log("ошибочка");
        };
    }
    
    weather ()

})

