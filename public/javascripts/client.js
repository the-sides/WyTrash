console.log("Welcome to client-side script")

// GOOGLE MAPS
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 35.9606384, lng: -83.9207392},
    zoom: 15
  });
}

$(function(){
  $('#jstatus').text("GO");
  
})