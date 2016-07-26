var map, mapConfig = {
  center: {lat: 40.0149856, lng: -105.2705456}
};

function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: mapConfig.center,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    zoom: 13
  });
  if(mapConfig.onload) mapConfig.onload();
  if(mapConfig.onclick) map.addListener("click", mapConfig.onclick);
};
