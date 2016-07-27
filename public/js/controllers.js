function LocationController($scope, $stateParams, $http, $rootScope){
  var state = $stateParams.state || "Colorado",
    city = $stateParams.city || "Boulder";

  $http.get(`http://maps.googleapis.com/maps/api/geocode/json?address=${city},${state}`).then(data => {
    center = data.data.results[0].geometry.location;
    if(map) map.setCenter(center);
  });

  $scope.location = {state, city};

  if(!map) mapConfig.onload = loadMap;
  else loadMap();

  function loadMap(){
    google.maps.event.addListener(map, "idle", () => {
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
    });
  }
}

app.controller("BodyController", makeBodyController);
function makeBodyController($scope, UsersService, apiInterceptor){
  $scope.newPost = {};
  $scope.togglePosts = () => {
    $scope.showPosts = !$scope.showPosts;
    $scope.showNewPost = false;
  };

  $scope.testOpenImage = (post, index) => post.openImage === index;
  $scope.nextImage = post => {
    post.openImage++;
    console.log("WHAT");
  }
  $scope.prevImage = post => post.openImage--;

  $scope.activateNewPost = () => {
    if($scope.user) $scope.newPostActive = !$scope.newPostActive;
  };
  $scope.toggleNewPost = e => {
    if(!$scope.user || !$scope.newPostActive) return $scope.showNewPost = false;
    if(e){
      $scope.newPost.lat = e.latLng.lat();
      $scope.newPost.lng = e.latLng.lng();
    }
    $scope.showNewPost = !$scope.showNewPost;
    $scope.showPosts = false;
  };

  function mapClick(e){
    $scope.toggleNewPost(e);
    $scope.$apply();
  }

  if(map) map.addListener("click", mapClick);
  else mapConfig.onclick = mapClick;

  $scope.sign = {};
  $scope.openSign = type => {
    $scope.sign.type = ($scope.sign.type === type) ? "" : type;
  };
  $scope.submitSign = () => {
    // send data to server
    var data = $scope.sign;
    UsersService.sign(data.type, data.email, data.password, data.username, updateUserStatus);
    $scope.sign = {};
  };
  $scope.signOut = () => {
    $scope.user = null;
    localStorage.removeItem("userToken");
  };

  function updateUserStatus(data){
    localStorage.userToken = data.token;
    $scope.user = data.user;
  };

  $scope.getProfile = (id) => {
    UsersService.get(id);
  }

  $scope.signup = {};
  $scope.signup.showNewProfile = false;
  $scope.signup.toggleNewProfile = function() {
    $scope.signup.showNewProfile = !$scope.signup.showNewProfile;
  };
};
makeBodyController.$inject = ['$scope','UsersService', 'apiInterceptor'];
