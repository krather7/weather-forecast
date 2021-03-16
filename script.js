//Define Globral Variables=============================
var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#username');
var key = 'cefff9e5ecfb93df0edc8e7345246ef1';
var newDiv = document.getElementById('search-history');
var allEntries={}
var i=0
var h=1
var x=0
var cityName="";
var cityArray=[]
var retrievedData=localStorage.getItem("searchedCity")
//======================================================
//User presses GET WEATHER button and runs searchWeather function to load weather forecast
var formSubmitHandler = function (event) {
    event.preventDefault();
    cityText = nameInputEl.value.trim();
    cityName = cityText.toUpperCase();
    searchWeater(event)
   }
//======================================================
//Main function that draws today's weather forecast=====
var searchWeater = function (){
       fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid='+key)
         .then(function(resp3) { return resp3.json() }) // Convert data to json
         .then(function(data3) {
            var fahrenheit = Math.round(((parseFloat(data3.main.temp)-273.15)*1.8)+32); 
            var iconCode = data3.weather[0].icon 
            var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
              document.getElementById('today-location').innerHTML ="<img src='"+iconUrl+"'>"+data3.name;
              document.getElementById('today-temp').innerHTML ="Temperature: " + fahrenheit + '&deg;';
              document.getElementById('today-humidity').innerHTML ="Humidity: " + data3.main.humidity+"%";
              document.getElementById('today-windspeed').innerHTML ="Wind Speed: " + data3.wind.speed+" MPH";   
              })
        fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + key)
          .then(function(resp) { return resp.json() })
          .then(function(data) {
          drawWeather(data);//Call function to draw UV INDEX and 5DAY FORECAST
        })//If the user enters a blank field or unvalid city, error message appears and function ends
        .catch(function() {
          alert("Enter a valid city.");
          return
        });
      }
  //======================================================
  //Function to draw UV INDEX and 5DAY FORECAST===========
      function drawWeather(d) {
        //CHECKS FOR UV INDEX
        var lat =d.city.coord.lat;
        var lon =d.city.coord.lon;
        fetch('https://api.openweathermap.org/data/2.5/uvi?lat='+lat+'&lon='+lon+'&appid='+key)
          .then(function(resp2) { return resp2.json() }) // Convert data to json
          .then(function(data2) {
        document.getElementById('today-uvindex').innerHTML ="UV Index: " + data2.value;
        if (data2.value<=3){//Drawing Green/Yellow/Red based on UV INDEX
          document.getElementById('today-uvindex').style.color="lightgreen";
                  } else if(data2.value>=3 && data2.value<=8){
          document.getElementById('today-uvindex').style.color="yellow";
                  } else {
          document.getElementById('today-uvindex').style.color="red";
                  }
        })
//5 DAY FORECAST USING FOR LOOP========================
for (y=0;y<=4;y++){
  j=y
  j*=8;//Date changes every Eight keys in data object
  document.getElementsByClassName("col")[y].style.backgroundColor="darkblue";//Create 5 Blue Squares
  var fahrenheit = Math.round(((parseFloat(d.list[j].main.temp)-273.15)*1.8)+32);//Converts temp to Fahrenheit
  var iconCode = d.list[j].weather[0].icon //Gets icon number from object
  var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";//Gets picture using icon number
  y+=1;//Element dates start at 1 instead of 0
  document.getElementById('day'+y+'-date').innerHTML ="<img src='"+iconUrl+"'>"+ d.list[j].dt_txt+":";//display date and icon
  document.getElementById('day'+y+'-temp').innerHTML ="Temperature: " + fahrenheit + '&deg;';//display temp
  document.getElementById('day'+y+'-humidity').innerHTML ="Humidity: " + d.list[j].main.humidity + "%";//display humidity
  y-=1//Resets y
}
//======================================================
//Moment Today's Date
var date = moment().format('dddd M-D-YYYY');
$('#currentDay').text(date);
date = moment().startOf('day').add(1, 'day')
//======================================================
//Adds or removes event listeners for search history
$(document).off('click','[id^="btn"]');
$(document).on('click', '[id^="btn"]', function() {
  answer(event);
});
//======================================================
//========Writes search history
//Checks to make sure the last 5 recent searches are not already in history, if so X will be greater than 1
for (j=0;j<cityArray.length;j++){
  if (cityName==cityArray[j]){
  x+=1;
}}

if (x==0){//If X is less than 1, then a new city has been searched
    cityArray.push(cityName)//Adds the new city to an array
    if (cityArray.length>=6){//If the new city causes more than 5 searches, the oldest city will be removed
      cityArray.shift();
}
      if (i >=5){//This runs after 5 cities have been searched
        i-=5//Sets i up to remove the oldest button
        $("#btn"+i).remove();//Removes the oldest city search button
        $("#br"+i).remove();//Removes linebreak between search city buttons
        i+=5//returns i to previous value
        var newSpan = document.createElement('button');//creates a new button
        var newBr = document.createElement('br');//creates a new linebreak
        newSpan.innerText = cityName;//new button text becomes recently searched city
        newSpan.id = "btn"+i;
        newSpan.className="bttn"
        newBr.id= "br"+i;
        newDiv.appendChild(newSpan);//adds button and br to html
        newDiv.appendChild(newBr);
        $('#search-history').prepend(newSpan);//jquery to put button and line break at the top of seach-history
        $('#search-history').prepend(newBr);//by default these were appearing below
        localStorage.setItem("searchedCity", JSON.stringify(cityArray));
    } else {//similiar to above, but this runs until search history fills with 5 cities
        var newSpan = document.createElement('button');
        var newBr = document.createElement('br');
        newSpan.innerText = cityName;
        newSpan.id = "btn"+i;
        newSpan.className="bttn"
        newBr.id= "br"+i;
        newDiv.appendChild(newSpan);
        newDiv.appendChild(newBr);
        $('#search-history').prepend(newSpan);
        $('#search-history').prepend(newBr);
        localStorage.setItem("searchedCity", JSON.stringify(cityArray));


}
    i+=1
}
x=0//resets x to 0 so it can check if its value goes above 0 in searched city history
}
//Function for when search history clicked===================
    function answer(event){
      var historyName = event.target.innerHTML;
      cityName=historyName
      searchWeater(event)
     }
//Event listener for submit button==========================
  userFormEl.addEventListener('submit', formSubmitHandler);
//Checks local storage and loads search history when page loads
  window.onload = function() {
    var searchHistory=JSON.parse(retrievedData)
    console.log(retrievedData)
    k=searchHistory.length-1
    cityName=(searchHistory[k])
    searchWeater()
  };