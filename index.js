const weatherCity = document.querySelector('.weather_city');
const weatherTemp = document.querySelector('.weather_temp');
const weatherIcon = document.querySelector('.weather_icon');
const weatherLike = document.querySelector('.weather_like');
const searchCity = document.querySelector('#searchCity');
let cityEnter = "Киров"
const forecastMorning = document.querySelector('.forecast__morning');
const forecastDay = document.querySelector('.forecast__day');
const forecastEvnight = document.querySelector('.forecast__evnight');

async function fetchWeatherInfo (){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityEnter}&appid=8863aa32b8dc6777a27722522c3c0462&units=metric`);
        const data = await response.json();
        console.log(data)

        const forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityEnter}&appid=8863aa32b8dc6777a27722522c3c0462&units=metric`);
        const dataCast = await forecast.json();
        console.log(dataCast);

        innerUI (data, dataCast);
    }catch(err){    
        console.log("ошибочка");
    };
}

fetchWeatherInfo ()

function innerUI (data, dataCast){
    weatherTemp.innerHTML = parseInt(data.main.temp) + "°";
    weatherCity.innerHTML = data.name;
    weatherIcon.innerHTML = data.weather[0]?.['description'];

    forecastMorning.innerHTML = parseInt(dataCast.list[0].main.temp)+ "°";
    forecastDay.innerHTML = parseInt(dataCast.list[2].main.temp)+ "°";
    forecastEvnight.innerHTML = parseInt(dataCast.list[4].main.temp)+ "°";
}

searchCity.addEventListener('keydown', event => {
    if(event.code == 'Enter'){
        cityEnter = searchCity.value
        console.log(cityEnter)
        searchCity.value = ''
    }
    fetchWeatherInfo ()
})


