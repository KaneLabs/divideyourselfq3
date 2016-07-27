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

function loadPostsInBounds($http, cb){
  var bounds = map.getBounds();
  if(!bounds) return;
  $http.post("/api/locations", {minLat: bounds.f.f, maxLat: bounds.f.b, minLng: bounds.b.b, maxLng: bounds.b.f}).then(cb);
}
