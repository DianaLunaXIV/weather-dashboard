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
let requestedWeather;
function getFromOneCall(){
    let requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentCity.lat}&lon=${currentCity.lon}&units=imperial&appid=dae07aaca7616262277cefcd84b42b42`;
    return fetch(requestURL)
        .then(response => response.json())
        .then(data => requestedWeather = data);
};

function appendWeatherData(){
    const requestedCurrentTemp = requestedWeather.current.temp;
    $('#mainCurrentTemperature').text(requestedCurrentTemp);
    
};