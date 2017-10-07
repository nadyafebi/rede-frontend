var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 17.026782, lng: 9.378825},
    zoom: Math.ceil(Math.log2($(window).width())) - 8,

    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  });
}
