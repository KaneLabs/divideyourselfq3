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

function loadPostsInBounds($scope, $http){
  var bounds = map.getBounds();
  $http.post("/api/locations", {minLat: bounds.f.f, maxLat: bounds.f.b, minLng: bounds.b.b, maxLng: bounds.b.f})
    .then(data => {
      if(!data.data.posts) return;
      $scope.posts = data.data.posts.map(post => {
        new google.maps.Marker({
          position: {lat: parseFloat(post.lat), lng: parseFloat(post.lng)},
          map: map,
          title: post.title
        });
        post.media_url = post.media_url.split(",");
        post.openImage = 0;
        return post;
      });
    });
}
