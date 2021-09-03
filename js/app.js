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
    const nameOfCity = data.name;
    const temp = (data.main.temp - 273.15).toPrecision(3);

    // show result 
    document.getElementById('show_city').innerText = nameOfCity;
    document.getElementById('show_temperature').innerText = temp;
    console.log(temp);
}
