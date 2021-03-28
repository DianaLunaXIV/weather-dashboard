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
    if (dayIndex !== 'current'){
        let conditionIcon = requestedWeather.daily[dayIndex].weather[0].icon;
        return `http://openweathermap.org/img/wn/${conditionIcon}@2x.png`
    } else {
        let conditionIcon = requestedWeather.current.weather[0].icon;
        return `http://openweathermap.org/img/wn/${conditionIcon}@2x.png`
    }
};

//Append weather conditions for current city to HTML elements
//Yes, this function is ridiculously big. Maybe I'll break it into smaller components later.
function appendMainWeatherData(){
    const requestedCurrentTemp = requestedWeather.current.temp;
    const requestedCurrentFeelsLike = requestedWeather.current.feels_like;
    const requestedCurrentWindSpeed = requestedWeather.current.wind_speed;
    const requestedCurrentConditions = requestedWeather.current.weather[0].main;
    const requestedCurrentConditionIcon = appendIcon('current');
    const requestedCurrentHumidity = requestedWeather.current.humidity;
    const requestedCurrentUVIndex = requestedWeather.current.uvi;
    const requestedTodayHigh = requestedWeather.daily[0].temp.max;
    const requestedTodayLow = requestedWeather.daily[0].temp.min;
    const requestedTodayConditions = requestedWeather.daily[0].weather[0].main;
    const requestedTodayWindSpeed = requestedWeather.daily[0].wind_speed;
    const requestedTodayHumidity = requestedWeather.daily[0].humidity;
    const requestedTodayConditionIcon = appendIcon(0);
    const requestedTodayUVI = requestedWeather.daily[0].uvi;
    const requestedTomorrowHigh = requestedWeather.daily[1].temp.max;
    const requestedTomorrowLow = requestedWeather.daily[1].temp.min;
    const requestedTomorrowConditions = requestedWeather.daily[1].weather[0].main;
    const requestedTomorrowWindSpeed = requestedWeather.daily[1].wind_speed;
    const requestedTomorrowHumidity = requestedWeather.daily[1].humidity;
    const requestedTomorrowConditionIcon = appendIcon(1);
    const requestedTomorrowUVI = requestedWeather.daily[1].uvi;
    const requestedDay3High = requestedWeather.daily[2].temp.max;
    const requestedDay3Low = requestedWeather.daily[2].temp.min;
    const requestedDay3Conditions = requestedWeather.daily[2].weather[0].main;
    const requestedDay3WindSpeed = requestedWeather.daily[2].wind_speed;
    const requestedDay3Humidity = requestedWeather.daily[2].humidity;
    const requestedDay3ConditionIcon = appendIcon(2);
    const requestedDay3UVI = requestedWeather.daily[2].uvi;
    const requestedDay4High = requestedWeather.daily[3].temp.max;
    const requestedDay4Low = requestedWeather.daily[3].temp.min;
    const requestedDay4Conditions = requestedWeather.daily[3].weather[0].main;
    const requestedDay4WindSpeed = requestedWeather.daily[3].wind_speed;
    const requestedDay4Humidity = requestedWeather.daily[3].humidity;
    const requestedDay4ConditionIcon = appendIcon(3);
    const requestedDay4UVI = requestedWeather.daily[3].uvi;
    const requestedDay5High = requestedWeather.daily[4].temp.max;
    const requestedDay5Low = requestedWeather.daily[4].temp.min;
    const requestedDay5Conditions = requestedWeather.daily[4].weather[0].main;
    const requestedDay5WindSpeed = requestedWeather.daily[4].wind_speed;
    const requestedDay5Humidity = requestedWeather.daily[4].humidity;
    const requestedDay5ConditionIcon = appendIcon(4);
    const requestedDay5UVI = requestedWeather.daily[4].uvi;
    const requestedDay6High = requestedWeather.daily[5].temp.max;
    const requestedDay6Low = requestedWeather.daily[5].temp.min;
    const requestedDay6Conditions = requestedWeather.daily[5].weather[0].main;
    const requestedDay6WindSpeed = requestedWeather.daily[5].wind_speed;
    const requestedDay6Humidity = requestedWeather.daily[5].humidity;
    const requestedDay6ConditionIcon = appendIcon(5);
    const requestedDay6UVI = requestedWeather.daily[5].uvi;
    $('#mainCurrentConditionImage').attr("src", requestedCurrentConditionIcon);
    $('#mainCurrentConditionImage').attr("style", "display: initial;");
    $('#mainCurrentTemperature').text(`Currently: ${requestedCurrentTemp}`);
    $('#mainCurrentFeelsLike').text(`Feels like: ${requestedCurrentFeelsLike}`);
    $('#mainCurrentConditions').text(`Current conditions: ${requestedCurrentConditions}`);
    $('#mainCurrentWindSpeed').text(`Current wind speed: ${requestedCurrentWindSpeed}`);
    $('#mainCurrentHumidity').text(`Current humidity: ${requestedCurrentHumidity}`);
    $('#mainCurrentUVIndex').text(`UV Index: ${requestedCurrentUVIndex}`);
    $('#todayConditionImage').attr("src", requestedTodayConditionIcon);
    $('#todayConditionImage').attr("style", "display: initial;");
    $('#todayHighTemperature').text(`Today's High: ${requestedTodayHigh}`);
    $('#todayLowTemperature').text(`Today's Low: ${requestedTodayLow}`);
    $('#todayConditions').text(`Expected conditions: ${requestedTodayConditions}`);
    $('#todayWindSpeed').text(`Expected wind speed: ${requestedTodayWindSpeed}`);
    $('#todayHumidity').text(`Expected humidity: ${requestedTodayHumidity}`);
    $('#todayUVIndex').text(`Expected UV Index: ${requestedTodayUVI} `);
    $('#tomorrowConditionImage').attr("src", requestedTomorrowConditionIcon);
    $('#tomorrowConditionImage').attr("style", "display: initial;");
    $('#tomorrowHighTemperature').text(`Tomorrow's High: ${requestedTomorrowHigh}`);
    $('#tomorrowLowTemperature').text(`Tomorrow's Low: ${requestedTomorrowLow}`);
    $('#tomorrowConditions').text(`Expected conditions: ${requestedTomorrowConditions}`);
    $('#tomorrowWindSpeed').text(`Expected wind speed: ${requestedTomorrowWindSpeed}`);
    $('#tomorrowHumidity').text(`Expected humidity: ${requestedTomorrowHumidity}`);
    $('#tomorrowUVIndex').text(`Expected UV Index: ${requestedTomorrowUVI} `);
    $('#day3ConditionImage').attr("src", requestedDay3ConditionIcon);
    $('#day3ConditionImage').attr("style", "display: initial;");
    $('#day3HighTemperature').text(`Day 3's High: ${requestedDay3High}`);
    $('#day3LowTemperature').text(`Day 3's Low: ${requestedDay3Low}`);
    $('#day3Conditions').text(`Expected conditions: ${requestedDay3Conditions}`);
    $('#day3WindSpeed').text(`Expected wind speed: ${requestedDay3WindSpeed}`);
    $('#day3Humidity').text(`Expected humidity: ${requestedDay3Humidity}`);
    $('#day3UVIndex').text(`Expected UV Index: ${requestedDay3UVI} `);
    $('#day4ConditionImage').attr("src", requestedDay4ConditionIcon);
    $('#day4ConditionImage').attr("style", "display: initial;");
    $('#day4HighTemperature').text(`Day 4's High: ${requestedDay4High}`);
    $('#day4LowTemperature').text(`Day 4's Low: ${requestedDay4Low}`);
    $('#day4Conditions').text(`Expected conditions: ${requestedDay4Conditions}`);
    $('#day4WindSpeed').text(`Expected wind speed: ${requestedDay4WindSpeed}`);
    $('#day4Humidity').text(`Expected humidity: ${requestedDay4Humidity}`);
    $('#day4UVIndex').text(`Expected UV Index: ${requestedDay4UVI} `);
    $('#day5ConditionImage').attr("src", requestedDay5ConditionIcon);
    $('#day5ConditionImage').attr("style", "display: initial;");
    $('#day5HighTemperature').text(`Day 5's High: ${requestedDay5High}`);
    $('#day5LowTemperature').text(`Day 5's Low: ${requestedDay5Low}`);
    $('#day5Conditions').text(`Expected conditions: ${requestedDay5Conditions}`);
    $('#day5WindSpeed').text(`Expected wind speed: ${requestedDay5WindSpeed}`);
    $('#day5Humidity').text(`Expected humidity: ${requestedDay5Humidity}`);
    $('#day5UVIndex').text(`Expected UV Index: ${requestedDay5UVI} `);
    $('#day6ConditionImage').attr("src", requestedDay6ConditionIcon);
    $('#day6ConditionImage').attr("style", "display: initial;");
    $('#day6HighTemperature').text(`Day 6's High: ${requestedDay6High}`);
    $('#day6LowTemperature').text(`Day 6's Low: ${requestedDay6Low}`);
    $('#day6Conditions').text(`Expected conditions: ${requestedDay6Conditions}`);
    $('#day6WindSpeed').text(`Expected wind speed: ${requestedDay6WindSpeed}`);
    $('#day6Humidity').text(`Expected humidity: ${requestedDay6Humidity}`);
    $('#day6UVIndex').text(`Expected UV Index: ${requestedDay6UVI} `);
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
    } else if (cardID === 'day3UVIndex'){
        return requestedWeather.daily[2]
    } else if (cardID === 'day4UVIndex'){
        return requestedWeather.daily[3]
    } else if (cardID === 'day5UVIndex'){
        return requestedWeather.daily[4]
    } else if (cardID === 'day6UVIndex'){
        return requestedWeather.daily[5]
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