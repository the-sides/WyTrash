var map, searchManager;

function GetMap() {
    var myStyle = {
        "elements": {
            "water": { "fillColor": "#b1bdd7" },
            "waterPoint": { "iconColor": "#a1e0ff" },

            "road": { "strokeColor": "#e6e5e4" },




            "airport": { "fillColor": "e3e2de" },
            "education": { "fillColor": "e7ebc4" },





        },
        "version": "1.0"
    };
    map = new Microsoft.Maps.Map('#myMap', {
        credentials: 'Akpb2n3B-I_jM3__sHZwT7R_5hPiX7X8M31UajNLjTvl9KoZrj_Ns_6cqX_HVBnT',
        customMapStyle: myStyle,
        mapTypeId: Microsoft.Maps.MapTypeId.aerial,
        enableClickableLogo: false
    });

    //Add your post map load code here.

    Microsoft.Maps.loadModule(['Microsoft.Maps.AutoSuggest', 'Microsoft.Maps.Search'], function () {
        var manager = new Microsoft.Maps.AutosuggestManager({ map: map });
        manager.attachAutosuggest('#searchBox', '#searchBoxContainer', suggestionSelected);
        searchManager = new Microsoft.Maps.Search.SearchManager(map);
    });
    var layer = new Microsoft.Maps.Layer();
    $.get("/trip-report", function (data, status) {
        for (i = 0; i < data.length; i++) {
            //console.log(data);
            var loc = new Microsoft.Maps.Location(data[i].lat, data[i].long);

            var pin = new Microsoft.Maps.Pushpin(loc, {
                title: data[i].Price,
                icon: '/images/pushpinv2.png',
                color: '#0074e4',
                catId: i
            });

            layer.add(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function (e) {
                id = e.target._options.catId;
                pin_click(data[id]);
            });
        }
    });


    map.layers.insert(layer);


}

function suggestionSelected(result) {

    map.setView({ bounds: result.bestView });

}

function geocode() {
    var query = document.getElementById('searchBox').value;
    var searchRequest = {
        where: query,
        callback: function (r) {
            if (r && r.results && r.results.length > 0) {
                map.setView({ bounds: r.results[0].bestView });
            }
        },
        errorCallback: function (e) {
            alert("No results found.");
        }
    };
    searchManager.geocode(searchRequest);
}
function get_pins() {
    $.get("/trip-report", function (data, status) {
        return data;
    });
}

function pin_click(data) {
    $('.overlay').show();
    $('.pinpopup').show();
    console.log(data);
    $('.violationImage').attr('src', data.imgName);
    $('.violation').html(data.complaint);
}
$(document).ready(function () {
    $('.closeBtn').click(function () {
        $('.overlay').hide();
        $('.pinpopup').hide();

    });
});