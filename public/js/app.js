var app = angular.module("app", ["ui.router", "ngAnimate"]);

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
}

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "partials/home.html",
      controller: LocationController
    })
    .state("state", {
      url: "/:state",
      templateUrl: "partials/home.html",
      controller: LocationController
    })
    .state("city", {
      url: "/:state/:city",
      templateUrl: "partials/home.html",
      controller: LocationController
    })
    .state("post", {
      url: "/:state/:city/:post",
      templateUrl: "partials/home.html",
      controller: LocationController
    });
  $locationProvider.html5Mode(true);
});

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
function makeBodyController($scope, UsersService){
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
  }
};
makeBodyController.$inject = ['$scope','UsersService'];

app.factory('UsersService', $http => {
  return {
    sign: (type, email, password, username, callback) => {
      $http.post(`/users/sign${type}`, {email, password, username}).then(data => {
        console.log("Back on the client", data);
        if(!data.data.token) return localStorage.removeItem("userToken");
        callback(data.data);
      });
    }
  }
});
