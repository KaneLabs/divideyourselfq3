function LocationController($scope, $stateParams, $http){
  var state = $stateParams.state || "Colorado",
    city = $stateParams.city || "Boulder";

  $scope.location = {state, city};

  $http.get(`http://maps.googleapis.com/maps/api/geocode/json?address=${city},${state}`).then(data => {
    center = data.data.results[0].geometry.location;
    if(map) map.setCenter(center);
  });

  map ? loadMap() : mapConfig.onload = loadMap;

  function loadMap(){
    google.maps.event.addListener(map, "idle", () => {
      loadPostsInBounds($scope, $http);
    });
  }
}

app.controller("BodyController", makeBodyController);
function makeBodyController($scope, UsersService, apiInterceptor, NewCommentService, NewPostService){
  $scope.commServ = NewCommentService($scope),
  $scope.postServ = NewPostService($scope);
  $scope.newPost = {};
  $scope.togglePosts = () => {
    $scope.showPosts = !$scope.showPosts;
    $scope.showNewPost = false;
  };

  $scope.testOpenImage = (post, index) => post.openImage === index;
  $scope.nextImage = post => post.openImage++;
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
  };

  $scope.signup = {};
  $scope.signup.showNewProfile = false;
  $scope.signup.toggleNewProfile = function() {
    $scope.signup.showNewProfile = !$scope.signup.showNewProfile;
  };

  $scope.profile = {};
  $scope.profile.showProfile = false;
  $scope.profile.toggleShowProfile = function() {
    console.log('function');
    $scope.profile.showProfile = !$scope.profile.showProfile;
  };
};
makeBodyController.$inject = ['$scope','UsersService', 'apiInterceptor', 'NewCommentService', "NewPostService"];
