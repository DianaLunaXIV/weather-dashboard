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
        change: function(event, ui) {
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

//Append weather icon to img card
function appendIcon(dayIndex){
    let conditionIcon = requestedWeather.daily[dayIndex].weather[0].icon;
    return `http://openweathermap.org/img/wn/${conditionIcon}@2x.png`
};

//Append weather conditions for current city to HTML elements
function appendMainWeatherData(){
    const requestedCurrentTemp = requestedWeather.current.temp;
    const requestedCurrentFeelsLike = requestedWeather.current.feels_like;
    const requestedCurrentUVIndex = requestedWeather.current.uvi;
    const requestedTodayHigh = requestedWeather.daily[0].temp.max;
    const requestedTodayLow = requestedWeather.daily[0].temp.min;
    const requestedTodayConditions = requestedWeather.daily[0].weather[0].main;
    const requestedTodayConditionIcon = appendIcon(0);
    const requestedTodayUVI = requestedWeather.daily[0].uvi;
    const requestedTomorrowHigh = requestedWeather.daily[1].temp.max;
    const requestedTomorrowLow = requestedWeather.daily[1].temp.min;
    const requestedTomorrowConditions = requestedWeather.daily[1].weather[0].main;
    const requestedTomorrowConditionIcon = appendIcon(1);
    const requestedTomorrowUVI = requestedWeather.daily[1].uvi;
    $('#mainCurrentConditionImage').attr("src", requestedTodayConditionIcon);
    $('#mainCurrentConditionImage').attr("style", "display: initial;");
    $('#mainCurrentTemperature').text(`Currently: ${requestedCurrentTemp}`);
    $('#mainCurrentFeelsLike').text(`Feels like: ${requestedCurrentFeelsLike}`);
    $('#mainCurrentUVIndex').text(`UV Index: ${requestedCurrentUVIndex}`);
    $('#todayConditionImage').attr("src", requestedTodayConditionIcon);
    $('#todayConditionImage').attr("style", "display: initial;");
    $('#todayHighTemperature').text(`Today's High: ${requestedTodayHigh}`);
    $('#todayLowTemperature').text(`Today's Low: ${requestedTodayLow}`);
    $('#todayConditions').text(`Expected conditions: ${requestedTodayConditions}`);
    $('#todayUVIndex').text(`Expected UV Index: ${requestedTodayUVI} `);
    $('#tomorrowConditionImage').attr("src", requestedTomorrowConditionIcon);
    $('#tomorrowConditionImage').attr("style", "display: initial;");
    $('#tomorrowHighTemperature').text(`Tomorrow's High: ${requestedTomorrowHigh}`);
    $('#tomorrowLowTemperature').text(`Tomorrow's Low: ${requestedTomorrowLow}`);
    $('#tomorrowConditions').text(`Expected conditions: ${requestedTomorrowConditions}`);
    $('#tomorrowUVIndex').text(`Expected UV Index: ${requestedTomorrowUVI} `);
};

function appendSearchResult(){
    $(`<li class="list-group-item">${currentCity.name}, ${currentCity.state}</li>`).appendTo('#previousResultsUL');
};

function getWeatherForCardID(cardID){
    if (cardID === 'mainCurrentUVIndex'){
        return requestedWeather.current
    } else if (cardID === 'todayUVIndex'){
        return requestedWeather.daily[0]
    } else if (cardID === 'tomorrowUVIndex'){
        return requestedWeather.daily[1]
    } else {
        console.log('Something went wrong in getWeatherForCardID.', cardID)
    }
};

function uvHighlight(){
    const uvIndexes = document.querySelectorAll(".grabbedUVI");
    const uvClasses = ["uvLow", "uvModerate", "uvHigh", "uvVeryHigh", "uvExtreme"];
    uvIndexes.forEach((index) => {
        uvClasses.forEach((classToRemove) => {
                index.classList.remove(classToRemove)
        })
        const weather = getWeatherForCardID(index.id);
        const UVI = weather.uvi;
        if (UVI <= 2){
            index.classList.add("uvLow")
        } else if (2 < UVI && UVI <= 5){
            index.classList.add("uvModerate")
        } else if (5 < UVI && UVI <= 7){
            index.classList.add("uvHigh")
        } else if (7 < UVI && UVI <= 10){
            index.classList.add("uvVeryHigh")
        } else if (UVI > 10){
            index.classList.add("uvExtreme")
        } else return `Error with UVI value: ${UVI}`
    });
};


async function asyncCall(){
    $('mainCurrentTemperature').text('Loading...');
    await asyncGetFromOneCall();
    appendMainWeatherData();
    uvHighlight();
    appendSearchResult();
};

$('#searchButton').click(asyncCall);

function handleHistoryClick(event){
    const availableMatches = citiesUS.map(city => ({
        ...city,
        value: `${city.name}, ${city.state}`}));
    const cityName = event.target.innerText;
    const clickedCity = availableMatches.find(city => city.value === cityName);
    console.log("What is the value of city?", clickedCity)
    $('#citySearchBar').val(cityName);
    currentCity.name = clickedCity.name;
    currentCity.state = clickedCity.state;
    currentCity.lon = clickedCity.coord.lon;
    currentCity.lat = clickedCity.coord.lat;
    asyncCall();
}

$('ul#previousResultsUL').click(handleHistoryClick);