//Generate required unix time for API call
const generateDateTime = Date.now();
let currentCity = {};
//Use OpenWeather's Geocoding API to filter search terms and convert them to lat,long. Limit to US only for now.
$( function() {
    //This is the jQuery Autocomplete source array.
    // const availableMatches = citiesList.map(city => `${city.name}, ${city.state}`);
    const availableMatches = citiesUS.map(city => ({
        ...city,
        value: `${city.name}, ${city.state}`
    }))
    $("#citySearchBar").autocomplete({
        source: availableMatches,
        minLength: 3,
        select: function(event, ui) {
            console.log(event, ui.item.name);
            currentCity.name = ui.item.name;
            console.log(event, ui.item.state);
            currentCity.state = ui.item.state;
            console.log(event, ui.item.coord.lon);
            currentCity.lon = ui.item.coord.lon;
            console.log(event, ui.item.coord.lat);
            currentCity.lat = ui.item.coord.lat;
        }
    })
});

//Use the current search term to search the api for weather conditions
let requestedWeather;
function getFromOneCall(){
    let requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentCity.lat}&lon=${currentCity.lon}&units=imperial&appid=dae07aaca7616262277cefcd84b42b42`;
    return fetch(requestURL)
        .then(response => response.json())
        .then(data => requestedWeather = data);
};

// yours works but this is another way to do it
async function asyncGetFromOneCall(){
    let requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentCity.lat}&lon=${currentCity.lon}&units=imperial&appid=dae07aaca7616262277cefcd84b42b42`;
    const response = await fetch(requestURL);
    requestedWeather = await response.json();
};

//Append weather conditions for current city to HTML elements
function appendMainWeatherData(){
    const requestedCurrentTemp = requestedWeather.current.temp;
    const requestedCurrentFeelsLike = requestedWeather.current.feels_like;
    const requestedCurrentUVIndex = requestedWeather.current.uvi;
    $('#mainCurrentTemperature').text(`Currently: ${requestedCurrentTemp}`);
    $('#mainCurrentFeelsLike').text(`Feels like: ${requestedCurrentFeelsLike}`);
    $('#mainCurrentUVIndex').text(`UV Index: ${requestedCurrentUVIndex}`);
    
};

function appendSearchResult(){
    $(`<li class="list-group-item">${currentCity.name}, ${currentCity.state}</li>`).appendTo('#previousResultsUL');
};

async function asyncCall(){
    $('mainCurrentTemperature').text('Loading...');
    // const result = await getFromOneCall();
    await asyncGetFromOneCall();
    appendMainWeatherData();
    appendSearchResult();
};

$('#searchButton').click(asyncCall);