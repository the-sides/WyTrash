console.log("Welcome to client-side script")

// GOOGLE MAPS
var map, locations;
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 35.9606384, lng: -83.9207392},
    zoom: 15
  });
}


function updateMap(data){
  console.log(data)
  var markers = data.positions.map(function(location, i) {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length]
    });
  });

  for(i in markers)
    markers[i].setMap(map);
}

function geocodeSearch(query){
  if(query === ""){ console.log("pfft, gtfo"); return false; }
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address':query}, function(results, status){
    let lat = results[0].geometry.location.lat()
    let lng = results[0].geometry.location.lng()
    let center = {lat:lat, lng:lng}
    console.log(lat)
    console.log(lng)
    map.setCenter(center)

    /*      If we're mapping pins... which we aren't...

    data = {positions:[{lat:"",lng:""}]};
    data.positions[0].lat = lat
    data.positions[0].lng = lng                  */
    // Don't add the pin on a map. Center map view on pin, and update status to...
    // Give estimate on route...
    // If within 24 hours, check for reports within 100 feet, provide feedback
    // updateMap(data);
  })
  return true;
}

$(function(){
  $.get("/trip-report", function(data,status){
    console.log("Data: ", data);
    console.log("Status: ", status);
    updateMap(data);
  })

  function addressLookupClick(){
    console.log("Searching ", $('#address-lookup').val());
    geocodeSearch($('#address-lookup').val());
  }
  $('#address-lookup').keypress(function(e){
    if(e.keyCode == 13) addressLookupClick();
  })
  $('#address-lookup-btn').click(addressLookupClick)
})
  /////////////////////////////////////////
  ///////////    TRASH      ///////////////
  /////////////////////////////////////////
  // Pre-loaded cluster
  // var markers = locations.map(function(location, i) {
  //   return new google.maps.Marker({
  //     position: location,
  //     label: labels[i % labels.length]
  //   });
  // });
  // var markerCluster = new MarkerClusterer(map, markers,
  //   {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
  
  // <!-- <script>
  //   var myLatlng = new google.maps.LatLng(35,-84);
  //   var mapOptions = {
  //     zoom: 4,
  //     center: myLatlng
  //   }
  //   // I'm using 
  //   // var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  //   var marker = new google.maps.Marker({
  //       position: myLatlng,
  //       title:"Hello World!"
  //   });
  //   // To add the marker to the map, call setMap();
  //   // map is a global variable defined in client.js
  //   marker.setMap(map);
  // </script> -->

  // <!-- Map Initial Load -->
  // <!-- <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA2BkiI59erV23pjx7bfHwvVniaqQFyVLg&callback=initMap" ></script> -->
  // <!-- Marker Clusters -->
  // <!-- <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script> -->