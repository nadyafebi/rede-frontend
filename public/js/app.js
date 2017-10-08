// Map-related Variables
var map;
var styledMapType;
var infoWindow;
var coord;
var coordObj;

// Input-related Variables
var inputTextBox = $('#text-box')[0];
var inputLangBox = $('#lang-box')[0];
var langBoxVisible = false;
var inputButton = $('#submit-button')[0];
var contentString;
var isInput = false;
var inputText;
var inputLang;
var langData;
var hover_lang;

var jsonObj= {
"ab" : "US English Female",
"aa" : "US English Female",
"af" : "Afrikaans Male",
"ak" : "US English Female",
"sq" : "Albanian Male",
"am" : "US English Female",
"ar" : "Arabic Male",
"an" : "Spanish Female",
"hy" : "Armenian Male",
"as" : "Hindi Female",
"av" : "US English Female",
"ae" : "Arabic Male",
"ay" : "Spanish Female",
"az" : "Turkish Female",
"bm" : "US English Female",
"ba" : "Turkish Female",
"eu" : "US English Female",
"be" : "Russian Female",
"bn" : "Hindi Female",
"bh" : "Hindi Female",
"bi" : "US English Female",
"bs" : "Bosnian Male",
"br" : "French Female",
"bg" : "Slovak Male",
"my" : "Chinese Female",
"ca" : "Catalan Male",
"ch" : "US English Female",
"ce" : "Russian Female",
"ny" : "US English Female",
"zh" : "Chinese Female",
"cv" : "Turkish Female",
"kw" : "French Female",
"co" : "Romanian Male",
"cr" : "US English Female",
"hr" : "Croatian Male",
"cs" : "Czech Male",
"da" : "Danish Male",
"dv" : "US English Female",
"nl" : "Dutch Female",
"dz" : "Chinese Female",
"en" : "US English Female",
"eo" : "Esperanto Male",
"et" : "Swedish Female",
"ee" : "US English Female",
"fo" : "Danish Male",
"fj" : "US English Female",
"fi" : "Finnish Male",
"fr" : "French Female",
"ff" : "US English Female",
"gl" : "Portuguese Female",
"ka" : "US English Female",
"de" : "Italian Female",
"el" : "Greek Female",
"gn" : "Latin Female",
"gu" : "Hindi Female",
"ht" : "Portuguese Female",
"ha" : "US English Female",
"he" : "US English Female",
"hz" : "US English Female",
"hi" : "Hindi Female",
"ho" : "US English Female",
"hu" : "Hungarian Female",
"ia" : "US English Female",
"id" : "US English Female",
"ie" : "US English Female",
"ga" : "US English Female",
"ig" : "US English Female",
"ik" : "US English Female",
"io" : "US English Female",
"is" : "Icelandic Male",
"it" : "Italian Female",
"iu" : "US English Female",
"ja" : "Japanese Female",
"jv" : "US English Female",
"kl" : "US English Female",
"kn" : "Tamil Male",
"kr" : "Arabic Male",
"ks" : "Hindi Female",
"kk" : "Turkish Female",
"km" : "Vietnamese Male",
"ki" : "US English Female",
"rw" : "US English Female",
"ky" : "Turkish Female",
"kv" : "Russian Female",
"kg" : "US English Female",
"ko" : "Korean Female",
"ku" : "US English Female",
"kj" : "US English Female",
"la" : "Latin Female",
"lb" : "French Female",
"lg" : "US English Female",
"li" : "Dutch Female",
"ln" : "US English Female",
"lo" : "Thai Female",
"lt" : "Slovak Male",
"lu" : "US English Female",
"lv" : "Latvian Male",
"gv" : "US English Female",
"mk" : "Macedonian Male",
"mg" : "US English Female",
"ms" : "US English Female",
"ml" : "Tamil Male",
"mt" : "US English Female",
"mi" : "US English Female",
"mr" : "Hindi Female",
"mh" : "US English Female",
"mn" : "Chinese Female",
"na" : "US English Female",
"nv" : "US English Female",
"nd" : "US English Female",
"ne" : "Hindi Female",
"ng" : "US English Female",
"nb" : "Norwegian Male",
"nn" : "Norwegian Male",
"no" : "Norwegian Male",
"ii" : "Chinese Female",
"nr" : "US English Female",
"oc" : "US English Female",
"oj" : "US English Female",
"cu" : "Slovak Male",
"om" : "US English Female",
"or" : "US English Female",
"os" : "US English Female",
"pa" : "Hindi Female",
"pi" : "Arabic Male",
"fa" : "Arabic Male",
"pl" : "Polish Female",
"ps" : "US English Female",
"pt" : "Portuguese Female",
"qu" : "US English Female",
"rm" : "Romanian Male",
"rn" : "US English Female",
"ro" : "Romanian Male",
"ru" : "Russian Female",
"sa" : "Hindi Female",
"sc" : "US English Female",
"sd" : "Hindi Female",
"se" : "Finnish Male",
"sm" : "US English Female",
"sg" : "US English Female",
"sr" : "Serbian Male",
"gd" : "US English Female",
"sn" : "US English Female",
"si" : "US English Female",
"sk" : "Slovak Female",
"sl" : "Slovak Female",
"so" : "US English Female",
"st" : "US English Female",
"es" : "Spanish Female",
"su" : "US English Female",
"sw" : "Swahili Male",
"ss" : "US English Female",
"sv" : "Swedish Male",
"ta" : "Tamil Male",
"te" : "Tamil Male",
"tg" : "US English Female",
"th" : "Thai Female",
"ti" : "US English Female",
"bo" : "Chinese Female",
"tk" : "Turkish Female",
"tl" : "US English Female",
"tn" : "US English Female",
"to" : "US English Female",
"tr" : "Turkish Female",
"ts" : "US English Female",
"tt" : "US English Female",
"tw" : "US English Female",
"ty" : "US English Female",
"ug" : "Turkish Female",
"uk" : "Russian Female",
"ur" : "Hindi Female",
"uz" : "Turkish Female",
"ve" : "US English Female",
"vi" : "Vietnamese Male",
"vo" : "US English Female",
"wa" : "US English Female",
"cy" : "Welsh Male",
"wo" : "US English Female",
"fy" : "US English Female",
"xh" : "US English Female",
"yi" : "US English Female",
"yo" : "US English Female",
"za" : "US English Female",
"zu" : "US English Female"
}

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

//Play sound
function playsound() {
   responsiveVoice.speak(langData[hover_lang], jsonObj[hover_lang]);
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
  console.log("Clicked");
  $('#search').hide();
  $('#loading').show();

  inputText = inputTextBox.value;
  inputText = inputText.replace(' ', '+');

  var url = "https://cors-anywhere.herokuapp.com/https://rede-182207.appspot.com/?lang=auto&text=" + inputText;

  $.getJSON(url, function (data) {
    langData = data;
    inputLang = langData.detected_language;
    if (!langBoxVisible)
    {
      $('#lang-box').show();
      langBoxVisible = true;
    }

    var languageName = convertLanguage(inputLang);

    $('#language')[0].innerHTML = languageName;
    isInput = true;

    $('#search').show();
    $('#loading').hide();
    console.log("Done");
  });
});

function convertLanguage(lang) {
  var arr = [];
  for (i in isoLangs) {
    arr.push([i, isoLangs[i]]);
  }

  var language;
  for (var i = 0; i < arr.length; i++) {
    if (inputLang == arr[i][0]) {
      language = arr[i][1]['name'];
    }
  }
  return language;
}

// Translate text from one language to another.
function translate(countryName, transLang) {
  // Names exception
  if (countryName == "India")
  {
    transLang = "hi";
  }
  if (countryName == "Pakistan")
  {
    transLang = "ur";
  }
  if (countryName == "Malaysia")
  {
    transLang = "ms";
  }

  setWindow(langData[transLang], coordObj);
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

      // Names exception
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
        var lang = data1[0].languages[0].iso639_1;
        hover_lang = lang;
        translate(countryName, lang);
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
  setTimeout(playsound,3000)
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
