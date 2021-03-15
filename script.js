var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#username');
var key = 'cefff9e5ecfb93df0edc8e7345246ef1';
var newDiv = document.getElementById('search-history');
var allEntries={}
var i=0
var h=1
var x=0
localStorage.clear();
cityName="";
let cityArray=[]

var formSubmitHandler = function (event) {
    event.preventDefault();
    cityText = nameInputEl.value.trim();
    cityName = cityText.toUpperCase();
    searchWeater(event)
  }
  
var searchWeater = function (){
    //======================================================
    //Gets Today's Weather
       fetch('http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid='+key)
        .then(function(resp3) { return resp3.json() }) // Convert data to json
        .then(function(data3) {
            var fahrenheit = Math.round(((parseFloat(data3.main.temp)-273.15)*1.8)+32); 
            var iconCode = data3.weather[0].icon 
            var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
              document.getElementById('today-location').innerHTML ="<img src='"+iconUrl+"'>"+data3.name;
              document.getElementById('today-date').innerHTML ="Right now:";
              document.getElementById('today-temp').innerHTML ="Temperature: " + fahrenheit + '&deg;';
              document.getElementById('today-humidity').innerHTML ="Humidity: " + data3.main.humidity+"%";
              document.getElementById('today-windspeed').innerHTML ="Wind Speed: " + data3.wind.speed+" MPH";   
              })

        fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + key)
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
          drawWeather(data);
        })
        .catch(function() {
          alert("Enter a valid city.");
          return
        });
      }

      function drawWeather(d) {
        //CHECKS FOR UV INDEX
        var lat =d.city.coord.lat;
        var lon =d.city.coord.lon;
        fetch('http://api.openweathermap.org/data/2.5/uvi?lat='+lat+'&lon='+lon+'&appid='+key)
        .then(function(resp2) { return resp2.json() }) // Convert data to json
        .then(function(data2) {
        document.getElementById('today-uvindex').innerHTML ="UV Index: " + data2.value;

        if (data2.value<=3){
          document.getElementById('today-uvindex').style.color="lightgreen";
                  } else if(data2.value>=3 && data2.value<=8){
          document.getElementById('today-uvindex').style.color="yellow";
                  } else {
          document.getElementById('today-uvindex').style.color="red";
                  }

        })
        
        //5 DAY FORECAST
        document.getElementsByClassName("col")[0].style.backgroundColor="darkblue";
        document.getElementsByClassName("col")[1].style.backgroundColor="darkblue";
        document.getElementsByClassName("col")[2].style.backgroundColor="darkblue";
        document.getElementsByClassName("col")[3].style.backgroundColor="darkblue";
        document.getElementsByClassName("col")[4].style.backgroundColor="darkblue";

        var fahrenheit = Math.round(((parseFloat(d.list[0].main.temp)-273.15)*1.8)+32);
        var iconCode = d.list[4].weather[0].icon 
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        document.getElementById('day1-date').innerHTML ="<img src='"+iconUrl+"'>"+ d.list[0].dt_txt+":";
        document.getElementById('day1-temp').innerHTML ="Temperature: " + fahrenheit + '&deg;';
        document.getElementById('day1-humidity').innerHTML ="Humidity: " + d.list[0].main.humidity + "%";

        var iconCode = d.list[12].weather[0].icon 
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        var fahrenheit = Math.round(((parseFloat(d.list[8].main.temp)-273.15)*1.8)+32); 
        document.getElementById('day2-date').innerHTML ="<img src='"+iconUrl+"'>"+ d.list[8].dt_txt+":";
        document.getElementById('day2-temp').innerHTML ="Temperature: " + fahrenheit + '&deg;';
        document.getElementById('day2-humidity').innerHTML ="Humidity: " + d.list[8].main.humidity + "%";

        var iconCode = d.list[20].weather[0].icon 
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        var fahrenheit = Math.round(((parseFloat(d.list[16].main.temp)-273.15)*1.8)+32); 
        document.getElementById('day3-date').innerHTML ="<img src='"+iconUrl+"'>"+ d.list[16].dt_txt+":";
        document.getElementById('day3-temp').innerHTML ="Temperature: " + fahrenheit + '&deg;';
        document.getElementById('day3-humidity').innerHTML ="Humidity: " + d.list[16].main.humidity + "%";

        var iconCode = d.list[28].weather[0].icon 
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        var fahrenheit = Math.round(((parseFloat(d.list[24].main.temp)-273.15)*1.8)+32); 
        document.getElementById('day4-date').innerHTML ="<img src='"+iconUrl+"'>"+ d.list[24].dt_txt+":";
        document.getElementById('day4-temp').innerHTML ="Temperature: " + fahrenheit + '&deg;';
        document.getElementById('day4-humidity').innerHTML ="Humidity: " + d.list[24].main.humidity + "%";

        var iconCode = d.list[36].weather[0].icon 
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        var fahrenheit = Math.round(((parseFloat(d.list[32].main.temp)-273.15)*1.8)+32); 
        document.getElementById('day5-date').innerHTML ="<img src='"+iconUrl+"'>"+ d.list[32].dt_txt+":";
        document.getElementById('day5-temp').innerHTML ="Temperature: " + fahrenheit + '&deg;';
        document.getElementById('day5-humidity').innerHTML ="Humidity: " + d.list[32].main.humidity + "%";


      //Adds or removes event listeners for search history
        $(document).off('click','[id^="btn"]');

        $(document).on('click', '[id^="btn"]', function() {
          answer(event);
        });



  
  //=========Local Storage nonsense
  var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
  if(existingEntries == null) existingEntries = [];
  var searchHistory = {
      "city": cityName,
  };

    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    existingEntries.push(searchHistory);
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));

  var jsonString = localStorage.getItem("allEntries");
  allEntries = JSON.parse(jsonString);

//========Writes search history
if (cityName==cityArray[0]){
x+=1;
}
if (cityName==cityArray[1]){
  x+=1;
}
if (cityName==cityArray[2]){
  x+=1;
}
if (cityName==cityArray[3]){
  x+=1;
}  
if (cityName==cityArray[4]){
  x+=1;
}

if (x==0){

cityArray.push(cityName)
if (cityArray.length>=6){
cityArray.shift();
console.log(cityArray)
}


if(allEntries !== null){
if (i >=5){
  i-=5
  $("#btn"+i).remove();
  $("#br"+i).remove();
  i+=5
  var newSpan = document.createElement('button');
  var newBr = document.createElement('br');
  newSpan.innerText = searchHistory.city;
  newSpan.id = "btn"+i;
  newSpan.className="bttn"
  newBr.id= "br"+i;
  newDiv.appendChild(newSpan);
  newDiv.appendChild(newBr);
  $('#search-history').prepend(newSpan);
  $('#search-history').prepend(newBr);
} else {
      var newSpan = document.createElement('button');
      var newBr = document.createElement('br');
      newSpan.innerText = searchHistory.city;
      newSpan.id = "btn"+i;
      newSpan.className="bttn"
      newBr.id= "br"+i;
      newDiv.appendChild(newSpan);
      newDiv.appendChild(newBr);
  $('#search-history').prepend(newSpan);
  $('#search-history').prepend(newBr);
}
    i+=1
}

}

x=0


//Function for when search history clicked
    }

    function answer(event){
      console.log("This is a functioning button")
      console.log(allEntries)
      var historyName = event.target.innerHTML;
      console.log(historyName);
      cityName=historyName
      searchWeater(event)
    }

//Event listener for submit button
  userFormEl.addEventListener('submit', formSubmitHandler);



  

