function LocationController($scope, $rootScope, $stateParams, $http){
  var state = $stateParams.state || "Colorado",
    city = $stateParams.city || "Boulder";

  $scope.show = {post: null};
  $scope.linkBuilder = (post, backCheck) => {
    if(!post) return;
    if(backCheck) return {state: post.lat, city: post.lng};
    return {state: post.lat, city: post.lng, post: post.id};
  };

  $scope.location = {state, city};

  $http.get(`http://maps.googleapis.com/maps/api/geocode/json?address=${city},${state}`).then(data => {
    if(data.data.results[0]) center = data.data.results[0].geometry.location;
    else center = {lat: parseFloat(state), lng: parseFloat(city)};
    if(map) map.setCenter(center);
  });

  map ? loadMap() : mapConfig.onload = loadMap;

  function loadMap(){
    google.maps.event.addListener(map, "idle", () => {
      loadPostsInBounds($http, data => {
        if(!data.data.posts) return;
        $scope.posts = data.data.posts.map(post => {
          if($stateParams.post && post.id !== parseInt($stateParams.post)) return;
          new google.maps.Marker({
            position: {lat: parseFloat(post.lat), lng: parseFloat(post.lng)},
            map: map,
            title: post.title
          });
          post.media_url = post.media_url.split(",");
          post.openImage = 0;
          $scope.soloPost = $stateParams.post ? post : null;
          $rootScope.isSolo = $stateParams.post ? true : false;
          return post;
        });
      })
      // loadPostsInBounds($scope, $http, $stateParams.post, $rootScope);
    });
    if(map) google.maps.event.trigger(map, "idle");
  }
}

app.controller("BodyController", makeBodyController);
function makeBodyController($scope, UsersService, apiInterceptor, NewCommentService, NewPostService, $http){
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
    $scope.profile.showProfile = !$scope.profile.showProfile;
  };

  $scope.profile.getProfileUser = function(id) {
    $http.get(`/users/${id}`).then(function(data){
      console.log(data.data);
      $scope.user.userPosts = data.data;
    });
  };
};
makeBodyController.$inject = ['$scope','UsersService', 'apiInterceptor', 'NewCommentService', "NewPostService","$http"];
