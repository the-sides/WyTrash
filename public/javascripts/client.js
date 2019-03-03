console.log("Welcome to client-side script")

// GOOGLE MAPS
var map, locations;
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var rowsN = 0;
var pinTable = [];
var pinReactor = [];
var selection = -1;
var pinCloser = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 35.9606384, lng: -83.9207392},
    zoom: 15
  });
}

function updateAddressStatus(center){
  $('#address-result').text("Calculating...")
  for(pin in pinTable){
    if ((Math.abs(pinTable[pin].lat - center.lat) < 0.00015) 
    || (Math.abs(pinTable[pin].long - center.lng) < 0.00015)){
      $('#address-result').text("Keep your trash you filthy animal. "+pinTable[pin].complaint);
      return true;
    }
  }
  $('#address-result').text("Your trash has been taken.");
}


function updateTable(data){
  for(key in data){
    let row = $("<tr>", {"class":"rowNode", "id":"node"+rowsN});

    // Pin's label
    let col = $("<td>", {"class":"rowData"}).text(labels[rowsN++ % labels.length])
    row.append(col);

    // Pin's complaint
    col = $("<td>", {"class":"rowData"}).text(data[key].complaint)
    row.append(col);

    // Pin's picture
    let picLink = $("<img>", {"class":"list-thumbnail","src":data[key].imgName})
    col = $("<td>", {"class":"rowData"}).html(picLink)
    row.append(col);

    // Attach newly built row
    $("#report-table-body").append(row);

    // Add to [global]pinTable
    pinTable.push(data[key]);
  }

}
function updateMap(data){
  console.log(data)
  var myLatlng;

  for(key in data){
    console.log(data[key])
    myLatlng = new google.maps.LatLng(data[key].lat, data[key].long);

    var infowindow = new google.maps.InfoWindow({
      content: "<div style='color:black;'>\
                <p>"+data[key].complaint+"</p>\
                <img src='"+data[key].imgName+"'></div>"
                // <img src='https://storage.googleapis.com/whyismytrashstillhere.com/1551600088.285217.jpeg'></div>"
    })

    var marker = new google.maps.Marker({
        position: myLatlng,
        title:data[key].complaint,
        label: labels[(rowsN + key) % labels.length]
    });
    google.maps.event.addListener(marker,'click', (function(marker,infowindow){ 
      let func = function() {
          infowindow.open(map,marker);
      };
      let closer = function(){
        infowindow.close(map, marker);
      }
      pinReactor.push(func);
      pinCloser.push(closer)
      return func;
    })(marker,infowindow)); 
    marker.setMap(map);
  }
}

function geocodeSearch(query){
  if(query === ""){ console.log("pfft, gtfo"); return false; }
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address':query}, function(results, status){
    let lat = results[0].geometry.location.lat();
    let lng = results[0].geometry.location.lng();
    let center = {lat:lat, lng:lng};
    console.log(lat);
    console.log(lng);
    map.setCenter(center);
    updateAddressStatus(center);
  })
  return true;
}

// Event Callbacks
function addressLookupClick(){
  console.log("Searching ", $('#address-lookup').val());
  geocodeSearch($('#address-lookup').val());
}

$(function(){
  $.get("/trip-report", function(data,status){
    console.log("Data: ", data);
    console.log("Status: ", status);
    // console.log(data);
    updateMap(data);
    updateTable(data);
  })

  // Event Listeners
  $('#address-lookup').keypress(function(e){
    if(e.keyCode == 13) addressLookupClick();
  })
  $('#address-lookup-btn').click(addressLookupClick)
  $('#report-container').on("click",".rowNode",function(){
    if(selection != -1)
      pinCloser[selection]();
    selection = $(this).attr("id").substring(4);
    let center = {lat:pinTable[selection].lat, lng:pinTable[selection].long}
    map.setCenter(center);
    pinReactor[selection]();

  })
})
