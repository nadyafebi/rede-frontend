// Map-related Variables
var map;
var styledMapType;
var infoWindow;
var coordJS;            // A JS object.
var coordGM;            // A Google Maps object.

// Input-related Variables
var textBox = $('#textBox')[0];
var langBox = $('#langBox');
var submitButton = $('#submitButton')[0];
var langBoxVisible = false;
var isInput = false;
var textInput           // The text that the user input.

// Icon-related Variables
var searchIcon = $('#searchIcon');
var loadingIcon = $('#loadingIcon');

// Language-related Variables
var langData;           // Translated strings from all languages.
var langInput;          // The language that the user input.
var langHover;          // The language that the user hover to.

// Start website by hiding stuffs.
loadingIcon.hide();

// Geo API Key
var geo_api_key = process.env['GEOCODING_API_KEY'];

// Map initialization.
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
  url.push('&callback=drawMap');  // Callback to drawMap().
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

// Algorithm from Google to make coordinates.
function constructNewCoordinates(polygon) {
  var newCoordinates = [];
  var coordinates = polygon['coordinates'][0];
  for (var i in coordinates) {
    newCoordinates.push(new google.maps.LatLng(coordinates[i][1], coordinates[i][0]));
  }
  return newCoordinates;
}

// Get coordinates from mouse position.
function getCoordinates(pnt) {
  var latitude = pnt.lat();
  latitude = latitude.toFixed(4);
  var longitude = pnt.lng();
  longitude = longitude.toFixed(4);
  coordJS = {lat: latitude, lng: longitude};
  coordGM = new google.maps.LatLng(latitude, longitude);
}

// Input handling.
submitButton.addEventListener('click', function() {
  console.log("Clicked");
  searchIcon.hide();
  loadingIcon.show();
  if (langBoxVisible) {
    langBox.slideUp();
    langBoxVisible = false;
  }

  textInput = textBox.value;
  textInput = textInput.split(' ').join('+');

  var transUrl = "https://cors-anywhere.herokuapp.com/https://rede-182207.appspot.com/?lang=auto&text=" + textInput;

  $.getJSON(transUrl, function (data) {
    langData = data;
    langInput = data.detected_language;

    if (!langBoxVisible)
    {
      langBox.slideDown();
      langBoxVisible = true;
    }

    $('#language')[0].innerHTML = convertLanguage(langInput);

    isInput = true;

    loadingIcon.hide();
    searchIcon.show();
    console.log("Done");
  });
});

// Convert language from double digit to full name.
function convertLanguage(lang) {
  var arr = [];
  for (i in isoLangs) {
    arr.push([i, isoLangs[i]]);
  }

  var language;
  for (var i = 0; i < arr.length; i++) {
    if (lang == arr[i][0]) {
      language = arr[i][1]['name'];
    }
  }
  return language;
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
    var geoUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + coordJS.lat + "," + coordJS.lng + "&key=AIzaSyAvm9iztqVSlyrr8ePE1NmPsLlLN8VSe7Q";
    $.getJSON(geoUrl, function (data) {
      var countryName = getCountry(data.results[0].address_components);

      // Names exception & handling.
      switch(countryName)
      {
        case "South Korea":
        case "North Korea":
          countryName = "korea";
          break;
        case "New Zealand":
          countryName = "australia";
          break;
        case "Republic of the Congo":
        case "Democratic Republic of the Congo":
          countryName = "congo";
          break;
        case "United Arab Emirates":
        case "Saudi Arabia":
          countryName = "arabia";
          break;
        case "Myanmar (Burma)":
          countryName = "myanmar";
          break;
        case "United States":
          countryName = "us";
          break;
        default:
          countryName = countryName.split(' ').join('+');
      }

      var langUrl = "https://restcountries.eu/rest/v2/name/" + countryName;
      $.getJSON(langUrl, function (data1) {
        langHover = data1[0].languages[0].iso639_1;
        var translated = translate(countryName, langHover);

        infoWindow.setContent(translated);
        infoWindow.setPosition(coordGM);
        infoWindow.open(map);
        setTimeout(playSound, 3000);
      });
    });
  }
}

// Get country name from Geocode API.
function getCountry(addrComponents) {
  for (var i = 0; i < addrComponents.length; i++) {
    if (addrComponents[i].types[0] == "country") {
      return addrComponents[i].long_name;
    }
    if (addrComponents[i].types.length == 2) {
      if (addrComponents[i].types[0] == "political") {
        return addrComponents[i].long_name;
      }
    }
  }
  return false;
}

// Play sound.
function playSound() {
   responsiveVoice.speak(langData[langHover], voiceData[langHover]);
}

// Translate text from one language to another.
function translate(countryName, langTrans) {
  // Names exception.
  switch (countryName)
  {
    case "India":
      langTrans = "hi";
      break;
    case "Pakistan":
      langTrans = "ur";
      break;
    case "Malaysia":
      langTrans = "ms";
      break;
    case "Cameroon":
      langTrans = "fr";
      break;
  }

  return langData[langTrans];
}

// Hide window when hover out.
function hideWindow() {
  if (isInput)
  {
    infoWindow.setContent('');
    infoWindow.close();
  }
}
