//Generate required unix time for API call
const generateDateTime = Date.now();
let searchInputValue = $('#citySearchBar').val()
let currentCity = {};

function geocodingFetch(){
    let requestURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInputValue},US&limit=20&appid=dae07aaca7616262277cefcd84b42b42`;
    let returnedJSON;
    fetch(requestURL)
        .then(response => response.json())
        .then(data => JSON.parse(data).map(returnedJSON));
    return returnedJSON;
};

//Use OpenWeather's Geocoding API to filter search terms and convert them to lat,long. Limit to US only for now.
$( function() {
    //This is the jQuery Autocomplete source array.
    // const availableMatches = citiesList.map(city => `${city.name}, ${city.state}`);
    const availableMatches = [];
    
    
    $("#citySearchBar").autocomplete({
        source: availableMatches,
        select: function(event, ui) {
            console.log(event, ui.item.coord.lon);
            currentCity.lon = ui.item.coord.lon;
            console.log(event, ui.item.coord.lat);
            currentCity.lat = ui.item.coord.lat;
        }
    })
});
//Using the chosen city, replace the lat/lon values and use them in the OneCall API.
function getFromOneCall(){
    let requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentCity.lat}&lon=${currentCity.lon}&units=imperial&appid=dae07aaca7616262277cefcd84b42b42`;
    fetch(requestURL)
        .then(response => response.json())
        .then(data => console.log(data));

};