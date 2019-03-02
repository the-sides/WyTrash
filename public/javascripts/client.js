console.log("Welcome to client-side script")

// GOOGLE MAPS
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 35.9606384, lng: -83.9207392},
    zoom: 15
  });


  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var markers = locations.map(function(location, i) {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length]
    });
  });
  var markerCluster = new MarkerClusterer(map, markers,
    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

}

var locations = [{lat:35.963733, lng:-83.917751},{lat: 35.9606384, lng: -83.9207392}];

function updateMap(data){
  console.log(data.positions)
  // return da
  // locations = data.positions;
  // for(keys in data.positions){

  //   console.log(data.positions[keys])
  // }

  
  // return true;
}

$(function(){
  $('#jstatus').text("GO");
  $.get("/trip-report", function(data,status){
    console.log("Data: ", data);
    console.log("Status: ", status);
    locations = data.positions;
  })
})