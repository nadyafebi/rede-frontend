// Map-related Variables
var map;
var styledMapType;
var infoWindow;
var coord;
var coordObj;

// Input-related Variables
var inputTextBox = $('#text-box')[0];
var inputLangBox = $('#lang-box')[0];
var inputButton = $('#submit-button')[0];
var contentString;
var isInput = false;
var inputText;
var inputLang;

// Map Creation
function initMap() {
  // Create the map.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 30, lng: 0},
    zoom: Math.ceil(Math.log2($(window).width())) - 8,
    minZoom: Math.ceil(Math.log2($(window).width())) - 8,
    maxZoom: 5,

    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  });

  // Style the map.
  $.getJSON("js/mapstyle.json", function(data) {
    styledMapType = new google.maps.StyledMapType(data);
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
  });

  // Create a changeable info window.
  createWindow();

  // Request fusion table for countries data.
  var script = document.createElement('script');
  var url = ['https://www.googleapis.com/fusiontables/v2/query?'];
  url.push('sql=');
  var query = 'SELECT name, kml_4326 FROM ' +
  '1foc3xO9DyfSIF6ofvN0kp2bxSfSeKog5FbdWdQ';
  var encodedQuery = encodeURIComponent(query);
  url.push(encodedQuery);
  url.push('&callback=drawMap');
  url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
  script.src = url.join('');
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(script);
}

// Draw countries on map.
function drawMap(data) {
  var rows = data['rows'];
  for (var i in rows) {
    var countryName = rows[i][0];
    if (countryName != 'Antarctica') {
      var newCoordinates = [];
      var geometries = rows[i][1]['geometries'];
      if (geometries) {
        for (var j in geometries) {
          newCoordinates.push(constructNewCoordinates(geometries[j]));
        }
      } else {
        newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
      }
      var country = new google.maps.Polygon({
        paths: newCoordinates,
        strokeColor: '#000000',
        strokeOpacity: 0.1,
        strokeWeight: 1,
        fillColor: '#00FF00',
        fillOpacity: 0
      });

      // Country hover event.
      google.maps.event.addListener(country, 'mouseover', function(event) {
        getCoordinates(event.latLng);
        showWindow();
        this.setOptions({fillOpacity: 0.25});
      });

      // Country hover out event.
      google.maps.event.addListener(country, 'mouseout', function() {
        hideWindow();
        this.setOptions({fillOpacity: 0});
      });

      country.setMap(map);
    }
  }
}

// Get coordinates from mouse position.
function getCoordinates(pnt) {
  var latitude = pnt.lat();
  latitude = latitude.toFixed(4);
  var longitude = pnt.lng();
  longitude = longitude.toFixed(4);
  coord = {lat: latitude, lng: longitude};
  coordObj = new google.maps.LatLng(latitude, longitude);
}

// Algorithm from Google to make coordinates.
function constructNewCoordinates(polygon) {
  var newCoordinates = [];
  var coordinates = polygon['coordinates'][0];
  for (var i in coordinates) {
    newCoordinates.push(new google.maps.LatLng(coordinates[i][1], coordinates[i][0]));
  }
  return newCoordinates;
}

// Input handling.
inputButton.addEventListener('click', function() {
  inputText = inputTextBox.value;
  inputLang = inputLangBox.value;
  isInput = true;
});

// Translate text from one language to another.
function translate(text, oriLang, transLang) {
  var url = "https://cors-anywhere.herokuapp.com/https://rede-182207.appspot.com/?lang=" + oriLang + "&text=" + text;
  $.getJSON(url, function(data) {
    console.log(data[transLang]);
    setWindow(data[transLang], coordObj);
  });
}

// Create a changeable window.
function createWindow() {
  infoWindow = new google.maps.InfoWindow({
    content: '',
    position: {lat: 0, lng: 0},
    disableAutoPan: true
  });
}

// Show window at a certain position.
function showWindow() {
  if (isInput)
  {
    var geoUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + coord.lat + "," + coord.lng + "&key=" + GEOCODING_API_KEY;
    $.getJSON(geoUrl, function (data) {
      var countryName = getCountry(data.results[0].address_components);
      var langUrl = "https://restcountries.eu/rest/v2/name/" + countryName;
      $.getJSON(langUrl, function (data1) {
        var lang = data1[0].languages[0].iso639_1;
        translate(inputText, inputLang, lang);
      });
    });
  }
}

// Set window content.
function setWindow(content, position)
{
  infoWindow.setContent(content);
  infoWindow.setPosition(position);
  infoWindow.open(map);
}

// Hide window when hover out.
function hideWindow() {
  if (isInput)
  {
    infoWindow.setContent('');
    infoWindow.close();
  }
}

// Get country name from Geocode API.
function getCountry(addrComponents) {
  for (var i = 0; i < addrComponents.length; i++) {
    if (addrComponents[i].types[0] == "country") {
      return addrComponents[i].short_name;
    }
    if (addrComponents[i].types.length == 2) {
      if (addrComponents[i].types[0] == "political") {
        return addrComponents[i].short_name;
      }
    }
  }
  return false;
}
