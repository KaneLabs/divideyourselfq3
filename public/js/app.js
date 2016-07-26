var app = angular.module("app", ["ui.router", "ngAnimate"]);

var map, center = {lat: 40.0149856, lng: -105.2705456};
function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {center: center, zoom: 10});
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

function addMapScript(){
  var script = document.createElement("script");
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBBQxTdpV5zVD6Yt-DufELYVrJrnz7JuMo&callback=initMap";
  document.body.appendChild(script);
}

function LocationController($scope, $stateParams, $http){
  var state = $stateParams.state || "Colorado",
    city = $stateParams.city || "Boulder";

  $http.get(`http://maps.googleapis.com/maps/api/geocode/json?address=${city},${state}`).then(data => {
    console.log("Result of Geocoding");
    center = data.data.results[0].geometry.location;
    addMapScript();
  });

  $scope.location = {
    state: $stateParams.state || "Colorado",
    city: $stateParams.city || "Boulder"
  };
  $http.get(`/api/${$scope.location.state}/${$scope.location.city}`).then(data => {
    $scope.posts = data.data.posts;
  });
}

app.filter("mapUrl", $sce => input => {
  var map = {
    key: "key=AIzaSyBBQxTdpV5zVD6Yt-DufELYVrJrnz7JuMo",
    type: "maptype=satellite",
    zoom: "zoom=13"
  };
  return $sce.trustAsResourceUrl(`https://www.google.com/maps/embed/v1/place?${map.type}&${map.key}&${map.zoom}&q=${input}`);
});

app.controller("BodyController", makeBodyController);
function makeBodyController($scope, UsersService){
  $scope.togglePosts = () => {
    $scope.showPosts = !$scope.showPosts;
    $scope.showNewPost = false;
  };
  $scope.toggleNewPost = () => {
    $scope.showNewPost = !$scope.showNewPost;
    $scope.showPosts = false;
  };
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
