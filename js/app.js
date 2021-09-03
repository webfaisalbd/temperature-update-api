// declare global variable 
const cityName = document.getElementById('city');
const searchButton = document.getElementById('search_button');

// api key 
const key = '79ca141e4eaf620893061d11b4e82d75';


// add event to clicking search button 
searchButton.addEventListener('click', function () {
    const search = cityName.value;
    // api url 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}`;

    // fetch data 
    fetch(url)
        .then(res => res.json())
        .then(data => display(data));

})

const display = data => {
    // calculation 
    // console.log(data);
    const nameOfCity = data.name;
    const temp = (data.main.temp - 273.15).toPrecision(3);
    const weatherStatus = data.weather[0].description;

    // show name of city , temperature and weather status 
    document.getElementById('show_city').innerText = nameOfCity;
    document.getElementById('show_temperature').innerText = temp;
    document.getElementById('weather_status').innerText = weatherStatus;

    // call function to convert sunset and sunrise
    // taking let because after the line it changes value
    let sunriseTime = convertUnixTimeToLocal(data.sys.sunrise);
    let sunsetTime = convertUnixTimeToLocal(data.sys.sunset);
    sunriseTime = sunriseTime.time12h
    sunsetTime = sunsetTime.time12h

    // show sunrise and sunset
    document.getElementById('sunrise').innerText = sunriseTime;
    document.getElementById('sunset').innerText = sunsetTime;
    //set icon 
    const url = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const iconAdd = document.getElementById('icon');
    iconAdd.setAttribute('src', url);
}


// convert unix time to local format
const convertUnixTimeToLocal = unixTime => {
    const milliSeconds = unixTime * 1000;
    const humanDateFormat = new Date(milliSeconds);
    const convertedTimeObject = {
        fullDate: humanDateFormat.toLocaleString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }),
        time12h: humanDateFormat.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        }),
    };
    return convertedTimeObject;
};

