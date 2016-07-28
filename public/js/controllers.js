var Magic = (number, callback) => {
  var argumentArray = [];
  return data => {
    argumentArray.push(data);
    if(argumentArray.length === number) return callback(argumentArray);
  }
};

function LocationController($scope, $rootScope, $stateParams, $http){
  if(window.location.pathname !== "/" && !parseFloat(loc[1])){
    $http.get(`http://maps.googleapis.com/maps/api/geocode/json?address=${loc[2]},${loc[1]}`).then(data => {
      if(data.data.results[0]) mapConfig.center = data.data.results[0].geometry.location;
      if(map) map.setCenter(mapConfig.center);
    });
  }

  $scope.show = {post: null};
  $scope.linkBuilder = (post, backCheck) => {
    if(!post) return;
    if(backCheck) return {state: post.lat, city: post.lng};
    return {state: post.lat, city: post.lng, post: post.id};
  };
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
    $scope.profile.showProfile = false;
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

  $scope.profile = {};
  $scope.profile.showProfile = false;
  $scope.profile.toggleShowProfile = function() {
    $scope.profile.showProfile = !$scope.profile.showProfile;
  };
  $scope.profile.getProfileUser = function(id) {
    $scope.user.userPosts = [];
    $http.get(`/users/${id}`).then(function(data){
      for (var i = 0; i < data.data.length; i++) {
        $scope.user.userPosts.push({
          id: data.data[i].id,
          title: data.data[i].title,
          body: data.data[i].body,
          type: data.data[i].type,
          timestamp: data.data[i].timestamp,
          lat: data.data[i].lat,
          lng: data.data[i].lng,
          media_url: data.data[i].media_url.split(','),
          points: data.data[i].points
        })
      }
    });
  };

  $scope.sign = {};
  // $scope.openSign = type => {
  //   $scope.sign.type = ($scope.sign.type === type) ? "" : type;
  // };
  // $scope.submitSign = () => {
  //   // send data to server
  //   var data = $scope.sign;
  //   UsersService.sign(data.type, data.email, data.password, data.username, updateUserStatus);
  //   if ($scope.sign.type === 'up') {
  //     $scope.profile.showProfile = true;
  //   }
  //   $scope.sign = {};
  // };

  $scope.submitSignIn = () => {
    var data = $scope.sign;
    UsersService.signIn(data.email, data.password, data.username, updateUserStatus);

    $scope.sign = {};

  }

  $scope.submitSignUp = () => {
    var data = $scope.sign;
    UsersService.signUp(data.email, data.password, data.username, updateUserStatus);
    $scope.profile.showProfile = true;

    $scope.sign = {};

  }


  $scope.signOut = () => {
    $scope.profile.showProfile = false;
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
  $scope.signup.show = false;
  $scope.signup.toggle = function() {
    $scope.signup.show = !$scope.signup.show;
    $scope.locationFeature.showChangeLoc = false;
    $scope.searchFeature.showSearch = false;
  };

  $scope.signin = {};
  $scope.signin.show = false;
  $scope.signin.toggle = function() {
    $scope.signin.show = !$scope.signin.show;
    $scope.locationFeature.showChangeLoc = false;
    $scope.searchFeature.showSearch = false;
  };


  // $scope.profile = {};
  // $scope.profile.showProfile = false;
  // $scope.profile.toggleShowProfile = function() {
  //   console.log('function');
  //   $scope.profile.showProfile = !$scope.profile.showProfile;
  // };

  $scope.searchFeature = {
    showSearch: false,
    toggleShowSearch: function(){
      console.log('function');
      $scope.searchFeature.showSearch = !$scope.searchFeature.showSearch;
      $scope.locationFeature.showChangeLoc = false;
    }
  };
  $scope.locationFeature = {
    showChangeLoc: false,
    toggleShowChangeLoc: function(){
      console.log('function');
      $scope.locationFeature.showChangeLoc = !$scope.locationFeature.showChangeLoc;
      $scope.searchFeature.showSearch = false;
    }
  };
  
  $scope.upvote = (id, type, post) => {
    post.points += 1;
    $http.post(`/theboard/upvote/${type}/${id}`)
  };

  $scope.downvote = (id, type, post) => {
    post.points -= 1;
    $http.post(`/theboard/downvote/${type}/${id}`)
  };

};
makeBodyController.$inject = ['$scope','UsersService', 'apiInterceptor', 'NewCommentService', "NewPostService","$http"];
