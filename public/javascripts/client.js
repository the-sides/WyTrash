console.log("Welcome to client-side script")

// GOOGLE MAPS
var map, locations;
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var rowsN = 0;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 35.9606384, lng: -83.9207392},
    zoom: 15
  });
}

function updateTable(data){
  // console.log(data)
  for(key in data){
    let row = $("<tr>", {"class":"rowNode"});

    // Pin's label
    let col = $("<td>", {"class":"rowData"}).text(labels[rowsN++ % labels.length])
    row.append(col);

    // Pin's complaint
    col = $("<td>", {"class":"rowData"}).text(data[key].complaint)
    row.append(col);

    // Pin's picture
    let picLink = $("<a>", {"href":"https://www.google.com"}).text("link")
    col = $("<td>", {"class":"rowData"}).html(picLink)
    row.append(col);

    // Attach newly built row
    $("#report-table-body").append(row);
  }

}
var markers = []
function updateMap(data){
  console.log(data)
  var myLatlng;

  for(key in data){
    console.log(data[key])
    myLatlng = new google.maps.LatLng(data[key].lat, data[key].long);

    var infowindow = new google.maps.InfoWindow({
      content:"<div style='color:black;'><p>hi :)</p></div>"
    })

    var marker = new google.maps.Marker({
        position: myLatlng,
        title:data[key].complaint,
        label: labels[(rowsN + key) % labels.length]
    });
    markers.push(marker);
    map.addListener('click', function(){
      infowindow.open(map, markers[markers.length-1])
    })
    markers[markers.length-1].setMap(map);
  }
    // for(key in map.markers){
    // }
  // var markers = data.positions.map(function(location, i) {
  //   return new google.maps.Marker({
  //     position: location,
  //     label: labels[i % labels.length]
  //   });
  // });

  // for(i in markers)
}

function geocodeSearch(query){
  if(query === ""||" "){ console.log("pfft, gtfo"); return false; }
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
    // console.log(data);
    updateMap(data);
    updateTable(data);
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