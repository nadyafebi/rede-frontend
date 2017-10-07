var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 17.026782, lng: 9.378825},
    zoom: 3,

    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  });
}
