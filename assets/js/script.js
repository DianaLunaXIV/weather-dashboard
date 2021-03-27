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

//Use OneCall API asynchronously to retrieve weather conditions for the current city
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

function uvHighlight(){
    const element = document.getElementById("mainCurrentUVIndex");
    const currentUVI = requestedWeather.current.uvi;
    const uvClasses = ["uvLow", "uvModerate", "uvHigh", "uvVeryHigh", "uvExtreme"];
    uvClasses.forEach((classToRemove) => {
            element.classList.remove(classToRemove);
    })
    if (requestedWeather.current.uvi <= 2){
        element.classList.add("uvLow")
    } else if (2 < currentUVI && currentUVI <= 5){
        element.classList.add("uvModerate")
    } else if (5 < currentUVI && currentUVI <= 7){
        element.classList.add("uvHigh")
    } else if (7 < currentUVI && currentUVI <= 10){
        element.classList.add("uvVeryHigh")
    } else if (currentUVI > 10){
        element.classList.add("uvExtreme")
    } else return `Error with UVI value: ${requestedWeather.current.uvi}`
};

async function asyncCall(){
    $('mainCurrentTemperature').text('Loading...');
    await asyncGetFromOneCall();
    appendMainWeatherData();
    uvHighlight();
    appendSearchResult();
};

$('#searchButton').click(asyncCall);