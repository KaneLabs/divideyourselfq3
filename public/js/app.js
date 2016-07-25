var app = angular.module("app", ["ui.router", "ngAnimate"]);

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

function LocationController($scope, $stateParams, $http){
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
function makeBodyController($scope,UsersService) {
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
    if($scope.sign.type === type) $scope.sign.type = "";
    else $scope.sign.type = type;
  };
  $scope.submitSign = () => {
    // send data to server
    UsersService.authenticate($scope.sign.email,$scope.sign.password);
  };
};
makeBodyController.$inject = ['$scope','UsersService'];


app.factory('UsersService',function($http) {
  return {
    authenticate: function(email,password) {
      var req = {
        url: '/users/signin',
        method: "POST",
        data: {
          email: email,
          password: password
        }
      };
      return $http(req);
    }
  };
});
