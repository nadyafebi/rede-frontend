// Map-related Variables
var map;
var styledMapType;
var infoWindow;

// Input-related Variables
var inputTextBox = $('#text-box')[0];
var inputLangBox = $('#lang-box')[0];
var inputButton = $('#submit-button')[0];
var translation;
var isInput = false;

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
    console.log(countryName);
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
      google.maps.event.addListener(country, 'mouseover', function() {
        showWindow(countryName);
        this.setOptions({fillOpacity: 0.25});
      });
      google.maps.event.addListener(country, 'mouseout', function() {
        hideWindow();
        this.setOptions({fillOpacity: 0});
      });

      country.setMap(map);
    }
  }
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

  translate(inputText, inputLang);
});

function translate(text, lang) {
  var url = "https://cors-anywhere.herokuapp.com/https://rede-182207.appspot.com/?lang=" + lang + "&text=" + text;
  $.getJSON(url, function(data) {
    translation = data;
    isInput = true;
  });
}

function highlightMap() {
  var world_geometry = new google.maps.FusionTablesLayer({
    query: {
      select: 'geometry',
      from: '1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk',
      where: "ISO_2DIGIT IN ('RU', 'KZ', 'KG')"
    },
    styles: [{
      polygonOptions: {
        fillColor: '#00ff00',
        fillOpacity: 0.25
      }
    }],
    map: map,
    suppressInfoWindows: true
  });
}

function createWindow() {
  var contentString = '<p id="country-name"></p><p id="translation"></p>';

  infoWindow = new google.maps.InfoWindow({
    content: contentString,
    position: {lat: 0, lng: 0},
    disableAutoPan: true
  });
}

function showWindow(name) {
  if (isInput)
  {
    infoWindow.setContent(name);
    infoWindow.open(map);
  }
}

function hideWindow() {
  if (isInput)
  {
      infoWindow.close();
  }
}

/*
function createWindow(name) {
  var contentString = name + ' Здравствуйте';

  var infoWindow = new google.maps.InfoWindow({
    content: contentString,
    position: {lat: 61.495, lng: 104.98315},
    disableAutoPan: true
  });

  infoWindow.open(map);
}

function removeWindow(name) {

}
*/
