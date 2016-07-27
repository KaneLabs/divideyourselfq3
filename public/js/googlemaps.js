var map,
  loc = window.location.pathname.split("/"),
  isHome = window.location.pathname === "/",
  mapConfig = {
    center: localStorage.center ? JSON.parse(localStorage.center) : {
      lat: parseFloat(loc[1]) || 40.0149856,
      lng: parseFloat(loc[2]) || -105.2705456
    }
  };

if(isHome){
  navigator.geolocation.getCurrentPosition(data => {
    if(!data.coords) return;
    mapConfig.center = {lat: data.coords.latitude, lng: data.coords.longitude};
    if(map) map.setCenter(mapConfig.center);
    localStorage.center = JSON.stringify(mapConfig.center);
  })
}

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
