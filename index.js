var myHttp  = new XMLHttpRequest;
var myData;
var search = document.getElementById("search");
var btnSearch = document.getElementById("btnSearch");
var myDate = new Date();
console.log(myDate);

btnSearch.addEventListener("click",function(){
    let city = search.value;
    getWeather(city);
    clear();
})

function getWeather(city){
    myHttp.open('GET',`http://api.weatherapi.com/v1/forecast.json?key=3ec1c9cf02b44c9fab4171059222110&q=${city}&days=3`);
    myHttp.send();
    myHttp.addEventListener("readystatechange",function(){
    if (myHttp.readyState == 4){
        myData = JSON.parse(myHttp.response);
        var location = myData.location.name;
        var condition = myData.current.condition;
        var tempC = myData.current.temp_c;
        var tempF = myData.current.temp_f;
        var forecast = myData.forecast.forecastday
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const d1 = new Date(forecast[0].date);
        const d2 = new Date(forecast[1].date);
        const d3 = new Date(forecast[2].date);
        let day1 = weekday[d1.getDay()];
        let day2 = weekday[d2.getDay()];
        let day3 = weekday[d3.getDay()];
        console.log(myData);
        console.log(myData.location);
        console.log(myData.current);
        console.log(myData.forecast);
        displayItem(location,tempC,tempF,forecast,day1,day2,day3,condition);
    }
    })
    console.log(myHttp.status);
}
function clear(){
    search.value = ""
}

function displayItem(location,tempC,tempF,forecast,day1,day2,day3,condition){
    var cartona=``;
    cartona = `
        <div class="col-md-4">
            <div class="card mainCard cardClass">
                <div class="card-header cardHeader d-flex jHlex justify-content-between align-items-center">
                    <div class="day">${day1}</div>
                    <div class="date">${forecast[0].date}</div>
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <h2>${location}</h2>
                        <h4>Temperature:</h4>
                        <div class="weatherIcon d-flex justify-content-between align-items-center">
                            <img src="${condition.icon}" alt="">
                            <div class='temps'>
                                <h4 class="text-end">${tempC} C'</h4>
                                <h4 class="text-end">${tempF} F'</h4>
                            </div>
                        </div>
                        <p class="text-center">${condition.text}</p>
                    </blockquote>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card mainCard cardClass">
                <div class="card-header cardHeader d-flex jHlex justify-content-between align-items-center">
                    <div class="day">${day2}</div>
                    <div class="date">${forecast[1].date}</div>
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <h2>${location}</h2>
                        <h4>Temperature:</h4>
                        <div class="weatherIcon d-flex justify-content-between align-items-center">
                            <img src="${forecast[1].day.condition.icon}" alt="">
                            <div class='temps'>
                                <h4 class="text-end">${forecast[1].day.avgtemp_c} C'</h4>
                                <h4 class="text-end">${forecast[1].day.avgtemp_f} F'</h4>
                            </div>
                        </div>
                        <p class="text-center">${forecast[1].day.condition.text}</p>
                    </blockquote>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card mainCard cardClass">
                <div class="card-header cardHeader d-flex jHlex justify-content-between align-items-center">
                    <div class="day">${day3}</div>
                    <div class="date">${forecast[2].date}</div>
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <h2>${location}</h2>
                        <h4>Temperature:</h4>
                        <div class="weatherIcon d-flex justify-content-between align-items-center">
                            <img src="${forecast[2].day.condition.icon}" alt="">
                            <div class='temps'>
                                <h4 class="text-end">${forecast[2].day.avgtemp_c} C'</h4>
                                <h4 class="text-end">${forecast[2].day.avgtemp_f} F'</h4>
                            </div>
                        </div>
                        <p class="text-center">${forecast[2].day.condition.text}</p>
                    </blockquote>
                </div>
            </div>
        </div>
    `
    document.getElementById("dataRow").innerHTML=cartona;
}

