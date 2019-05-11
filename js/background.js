console.log("background.js");


const url = "https://atm-rails-burning-airlines.herokuapp.com/airplanes.json"

  $.ajax( url )
  .done(function(response){
    console.log('API response',response[1].model);
  });
