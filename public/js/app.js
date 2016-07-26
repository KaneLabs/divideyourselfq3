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
  if(mapConfig.onclick) map.addListener("click", mapConfig.onclick);
}

app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){
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
  $httpProvider.interceptors.push('apiInterceptor')
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

  $http.get(`/api/${state}/${city}`).then(data => {
    $scope.posts = data.data.posts;
  });
}

app.filter("mapUrl", $sce => input => {
  var map = {
    key: "key=AIzaSyBBQxTdpV5zVD6Yt-DufELYVrJrnz7JuMo",
    type: "maptype=satellite",
    zoom: "zoom=20"
  };
  return $sce.trustAsResourceUrl(`https://www.google.com/maps/embed/v1/place?${map.type}&${map.key}&${map.zoom}&q=${input}`);
});

app.controller("BodyController", makeBodyController);
function makeBodyController($scope, UsersService, apiInterceptor){
  $scope.newPost = {};
  $scope.togglePosts = () => {
    $scope.showPosts = !$scope.showPosts;
    $scope.showNewPost = false;
  };
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
makeBodyController.$inject = ['$scope','UsersService', 'apiInterceptor'];

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

app.factory('apiInterceptor', function(){
  return {
    request: function(config){
      var token = localStorage.getItem('userToken')
      if (token){
        config.headers.Authorization = "Bearer " + token;
        return config
      }
    }
  }
});
