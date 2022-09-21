const UI = {
    weatherCity: document.querySelector('.city'),
    weatherTemp: document.querySelector('.weather_temp'),
    weatherIcon: document.querySelector('.weather_icon'),
    weatherLike: document.querySelector('.weather_like'),
    searchCity: document.querySelector('#searchCity'),
    forecastMorning: document.querySelector('.forecast__morning'),
    forecastDay: document.querySelector('.forecast__day'),
    forecastEvnight: document.querySelector('.forecast__evnight'),
    like: document.querySelector('#like'),
    likeCytiChoice: document.querySelector('.likeCyti__choice'),
    // choiceCityClose: document.querySelectorAll('.choice-city-close'),
    // likeCytiChoiceCity: document.querySelectorAll('.likeCyti__choice-city'),
}


let cityEnter = "Киров"
let lastDataId = null;
let LastDataName = null;



async function fetchWeatherInfo (){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityEnter}&appid=8863aa32b8dc6777a27722522c3c0462&units=metric`);
        const data = await response.json();
        // console.log(data)
        lastDataId = data.id;
        LastDataName = data.name

        const forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityEnter}&appid=8863aa32b8dc6777a27722522c3c0462&units=metric`);
        const dataCast = await forecast.json();
        // console.log(dataCast);

        innerUI (data, dataCast);
        paintWhiteHert ();
    }catch(err){    
        alert("ошибочка");
    };
}

fetchWeatherInfo ()

function innerUI (data, dataCast){
    UI.weatherTemp.innerHTML = parseInt(data.main.temp) + "°";
    UI.weatherCity.innerHTML = data.name;
    UI.weatherIcon.innerHTML = data.weather[0]?.['description'];

    UI.forecastMorning.innerHTML = parseInt(dataCast.list[0].main.temp)+ "°";
    UI.forecastDay.innerHTML = parseInt(dataCast.list[2].main.temp)+ "°";
    UI.forecastEvnight.innerHTML = parseInt(dataCast.list[4].main.temp)+ "°";
}

// input enter
UI.searchCity.addEventListener('keydown', event => {
    if(event.code == 'Enter'){
        cityEnter = searchCity.value
        searchCity.value = ''
        fetchWeatherInfo ()
    }
})



function paintWhiteHert (){
    UI.like.style.fill = 'white'
}

UI.like.addEventListener('click', event => {
    UI.like.style.fill = 'tomato';
    youLikes (LastDataName)
})

// create new element
function createElementDiv(){
    let divInfo = document.createElement("div");
    divInfo.classList.add("likeCyti__choice-city");
    let crossLock = document.createElement('span');
    crossLock.classList.add("choice-city-close");
    crossLock.innerHTML = 'X';
}

// create Array
let masResult = [];


function createElementArr (){
    let a = localStorage.getItem('keysName');
    let storageMas = a ? JSON.parse(a) : [];
    masResult = storageMas; 
    for( let i = 0; i < masResult.length; ++i){
        let divInfo = document.createElement("div");
        divInfo.classList.add("likeCyti__choice-city");
        let crossLock = document.createElement('span');
        crossLock.classList.add("choice-city-close");
        crossLock.innerHTML = 'X';
        UI.likeCytiChoice.prepend(divInfo)
        divInfo.innerHTML = masResult[i]
        divInfo.append(crossLock) 
    }
    // masResult.forEach((item) => {
    //     UI.likeCytiChoice.prepend(divInfo)
    //     divInfo.innerHTML += item
    //     divInfo.append(crossLock) 
    // })
}

createElementArr ();

function youLikes (LastDataName) {
    let divInfo = document.createElement("div");
    divInfo.classList.add("likeCyti__choice-city");
    let crossLock = document.createElement('span');
    crossLock.classList.add("choice-city-close");
    crossLock.innerHTML = 'X';
    if(LastDataName != localStorage.getItem(LastDataName)){
        UI.likeCytiChoice.prepend(divInfo);
        divInfo.innerHTML = LastDataName;
        divInfo.append(crossLock);
    }
    let likeCytiChoiceCity = document.querySelectorAll('.likeCyti__choice-city')
    localStorage.setItem(LastDataName, LastDataName);
    saveLocal()

    let choiceCityClose = document.querySelectorAll('.choice-city-close');
    choiceCityClose.forEach((item) => {
    item.addEventListener('click', (event) => {
        let nameCity = item.previousSibling.textContent;
        localStorage.removeItem(nameCity)
        //
        indexName = masResult.indexOf(nameCity)
        masResult.splice(indexName)
        //
        localStorage.setItem('keysName', JSON.stringify(masResult))
        //
        item.parentNode.remove()
        console.log(storage)
    })
})
}


function saveLocal(){
    for( let i = 0; i < masResult.length; i++ ) {
        if(masResult[i] == LastDataName){
            return;
        }
    }
    masResult.push(LastDataName) 
    localStorage.setItem('keysName', JSON.stringify(masResult))
    let storageMas = JSON.parse(localStorage.getItem('keysName'))
    masResult = storageMas;
    console.log(masResult);

    let likeCytiChoiceCity = document.querySelectorAll('.likeCyti__choice-city')
likeCytiChoiceCity.forEach((item) => {
    item.addEventListener('click', (event) => {
        let nameCyti = item.firstChild.textContent;
        cityEnter = nameCyti
        console.log(nameCyti)
        fetchWeatherInfo ()
    })
})
}

let likeCytiChoiceCity = document.querySelectorAll('.likeCyti__choice-city')
likeCytiChoiceCity.forEach((item) => {
    item.addEventListener('click', (event) => {
        let nameCyti = item.firstChild.textContent;
        cityEnter = nameCyti
        console.log(nameCyti)
        fetchWeatherInfo ()
    })
})

// close choise like
let choiceCityClose = document.querySelectorAll('.choice-city-close');
choiceCityClose.forEach((item) => {
    item.addEventListener('click', (event) => {
        let nameCity = item.previousSibling.textContent;
        localStorage.removeItem(nameCity)
        //
        indexName = masResult.indexOf(nameCity)
        masResult.splice(indexName)
        //
        localStorage.setItem('keysName', JSON.stringify(masResult))
        //
        item.parentNode.remove()
        console.log(storage)
    })
})

