var map;
var styledMapType;

function initMap() {
  $.getJSON("js/mapstyle.json", function(data) {
    styledMapType = new google.maps.StyledMapType(data);
    styleMap();
  });

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 17.026782, lng: 9.378825},
    zoom: Math.ceil(Math.log2($(window).width())) - 8,

    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  });
}

function styleMap() {
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');
}
