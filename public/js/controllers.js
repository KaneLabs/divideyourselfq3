function HomeController($scope, $state, MapService){
  $scope.linkBuilder = linkBuilder;
  MapService.setCenterHome();
  MapService.getPosts($scope, $state);
  mapConfig.onidle = () => MapService.getPosts($scope, $state);
}

function LocationController($scope, $state, $stateParams, MapService){
  $scope.$parent.showPosts = false;
  $scope.togglePosts = $scope.$parent.togglePosts;
  $scope.linkBuilder = linkBuilder;
  MapService.setCenterLocation([$stateParams.state, $stateParams.city]);
  MapService.getPosts($scope, $state);
  mapConfig.onidle = () => MapService.getPosts($scope, $state);
}

function PostPageController($scope, $state, $stateParams, MapService){
  $scope.linkBuilder = linkBuilder;
  MapService.setCenterPost([$stateParams.state, $stateParams.city]);
  MapService.getPosts($scope, $state, $stateParams.post);
  mapConfig.onidle = () => MapService.getPosts($scope, $state, $stateParams.post);
}

function linkBuilder(post, backCheck){
  if(!post) return;
  if(backCheck) return {state: post.lat, city: post.lng};
  return {state: post.lat, city: post.lng, post: post.id};
}

app.controller("BodyController", makeBodyController);
function makeBodyController($scope, UsersService, apiInterceptor, NewCommentService, NewPostService, $http){
  if(localStorage.userToken) $scope.user = jwt_decode(localStorage.userToken).user;
  $scope.commServ = NewCommentService($scope);
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
  $scope.sideNav = {
    show: false
  };
  $scope.profile.activeUser = {};
  $scope.profile.profileUser = {};
  $scope.profile.profileView = null;
  $scope.profile.showProfile = false;

  $scope.profile.toggle = () => {
    $scope.sideNav.show = !$scope.sideNav.show;
    if($scope.sideNav.show === true){
      $scope.subnav.show = false;
      $scope.locationFeature.showChangeLoc = false;
      $scope.searchFeature.showSearch = false;
    }else {
      $scope.subnav.show = true;
    }
  }

  $scope.profile.toggleProfile = (id) => {
    if ($scope.profile.isActiveUser(id) && $scope.profile.profileView === "activeUser") {
      $scope.profile.profileView = null;
    } else if ($scope.profile.isActiveUser(id) && $scope.profile.profileView === null) {
      $scope.profile.profileView = "activeUser";
    } else if (!$scope.profile.isActiveUser(id) && $scope.profile.profileView === "profileUser") {
      $scope.profile.profileView = null;
    } else {
      $scope.profile.profileView = "profileUser";
    }
  };

  $scope.profile.getUser = (id) => {
    if ($scope.profile.isActiveUser(id)) {
      $scope.profile.activeUser = $scope.user;
      $scope.profile.activeUser.posts = $scope.profile.getUserPosts(id,$scope.profile.isActiveUser(id));
    } else {
      $http.get(`/users/${id}`).then( data => {
        $scope.profile.profileUser = data.data;
        $scope.profile.profileUser.posts = $scope.profile.getUserPosts(id,$scope.profile.isActiveUser(id));
      });
    };
  };
  $scope.profile.getUserPosts = (id,isActive) => {
    var userPosts = [];
    $http.get(`/users/${id}/posts`).then(function(data){
      for (var i = 0; i < data.data.length; i++) {
        userPosts.push({
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
      };
      if (isActive) {
        $scope.profile.activeUser.posts = userPosts;
      } else {
        $scope.profile.profileUser.posts = userPosts;
      };
    });
  };
  $scope.profile.isActiveUser = (id) => {
    if ($scope.user.id === id) {
      return true;
    } else {
      return false;
    };
  };
  $scope.profile.hideProfile = () => {
    $scope.profile.profileView = null;
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
    $scope.signin.show = false;
  };

  $scope.signin = {};
  $scope.signin.show = false;
  $scope.signin.toggle = function() {
    $scope.signin.show = !$scope.signin.show;
    $scope.locationFeature.showChangeLoc = false;
    $scope.searchFeature.showSearch = false;
    $scope.signup.show = false;
  };

  $scope.subnav = {};
  if($scope.user){
    $scope.subnav.show = true;
  }else{
    $scope.subnav.show = false;
  }

  $scope.searchFeature = {
    showSearch: false,
    toggleShowSearch: function(){
      console.log('function');
      $scope.searchFeature.showSearch = !$scope.searchFeature.showSearch;
      $scope.locationFeature.showChangeLoc = false;
      $scope.signin.show = false;
      $scope.signup.show = false;

    }
  };
  $scope.locationFeature = {
    showChangeLoc: false,
    toggleShowChangeLoc: function(){
      console.log('function');

      $scope.locationFeature.showChangeLoc = !$scope.locationFeature.showChangeLoc;
      $scope.searchFeature.showSearch = false;
      $scope.signin.show = false;
      $scope.signup.show = false;
    }
  };

  $scope.upvote = (id, type, post) => {
    post.points += 1;
    $http.post(`/theboard/upvote/${type}/${post.id}`)
  };

  $scope.downvote = (id, type, post) => {
    post.points -= 1;
    $http.post(`/theboard/downvote/${type}/${post.id}`)
  };

  $scope.getFriends = (id) => {
    $http.get(`/friends/${id}`).then((data) => {
      console.log(data);
    })
  }

  $scope.addFriend = (id) => {
    $http.post(`/friends/${id}/add`).then((data) => {
      console.log(data);
    })
  }

};
makeBodyController.$inject = ['$scope','UsersService', 'apiInterceptor', 'NewCommentService', "NewPostService","$http"];
