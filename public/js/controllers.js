var Magic = (number, callback) => {
  var argumentArray = [];
  return data => {
    argumentArray.push(data);
    if(argumentArray.length === number) return callback(argumentArray);
  };
};

function HomeController($scope, $state, $http, MapService){
  $scope.linkBuilder = linkBuilder;
  $scope.deletePost = post => deletePost($scope, $state, $http, MapService, post);
  MapService.setCenterHome();
  MapService.getPosts($scope, $state);
  mapConfig.onidle = () => MapService.getPosts($scope, $state);
  $scope.searchFilter = (input) => {
    return Object.keys(input).map(key => input[key]).reduce((check, e) => {
      if(check) return check;
      if(typeof e === "string" && e.toLowerCase().indexOf($scope.$parent.search.toLowerCase()) > -1) return true;
      return false;
    }, false);
  };
};

function LocationController($scope, $state, $stateParams, $http, MapService){
  $scope.$parent.showPosts = false;
  $scope.togglePosts = $scope.$parent.togglePosts;
  $scope.linkBuilder = linkBuilder;
  $scope.deletePost = post => deletePost($scope, $state, $http, MapService, post);
  MapService.getLocation(() => {
    if(magicCenter) magicCenter();
  });
  MapService.setCenterLocation([$stateParams.state, $stateParams.city]);
  MapService.getPosts($scope, $state);
  mapConfig.onidle = () => MapService.getPosts($scope, $state);
};

function deletePost($scope, $state, $http, MapService, post){
  post.marker.setMap(null);
  post.marker = null;
  $http.post("/posts/delete", {post: post, token: localStorage.userToken}).then(data => {
    if(data.success) $scope.posts = $scope.posts.filter(e => e.id !== post.id);
    MapService.getPosts($scope, $state);
  });
};

function PostPageController($scope, $state, $stateParams, MapService){
  $scope.linkBuilder = linkBuilder;
  MapService.getLocation(() => {
    if(magicCenter) magicCenter();
  });
  MapService.setCenterPost([$stateParams.state, $stateParams.city]);
  MapService.getPosts($scope, $state, $stateParams.post);
  mapConfig.onidle = () => MapService.getPosts($scope, $state, $stateParams.post);
};

function BoardController($scope, $state, $http) {
  $scope.view = {};
  $scope.view.msg = 'hello';
  $scope.view.boardPosts = [];

  $http.get("/theboard/posts").then(data => {
    console.log(data.data);
    for (var i = 0; i < data.data.length; i++) {
      $scope.view.boardPosts.push({
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
  })
}

function linkBuilder(post, backCheck){
  if(!post) return;
  if(backCheck) return {state: post.lat, city: post.lng};
  return {state: post.lat, city: post.lng, post: post.id};
};

app.controller("BodyController", makeBodyController);
function makeBodyController($scope, UsersService, apiInterceptor, NewCommentService, NewPostService, $http, ChatService, TribeService, $state){

  $scope.linkBuilder = linkBuilder;

  if(localStorage.userToken) $scope.user = jwt_decode(localStorage.userToken).user;

  var chatMagic = Magic(1, () => {
    $scope.chat = ChatService($scope);
  });

  if($scope.user) chatMagic();

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
  };

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
      $scope.friends.showFriends = false;
    }else {
      $scope.subnav.show = true;
    };
  };

  $scope.profile.toggleProfile = (id) => {
    if ($scope.profile.isActiveUser(id) && $scope.profile.profileView === "activeUser") {
      $scope.profile.profileView = null;
    } else if ($scope.profile.isActiveUser(id) && $scope.profile.profileView === null) {
      $scope.profile.profileView = "activeUser";
    } else if (!$scope.profile.isActiveUser(id) && $scope.profile.profileView === "profileUser") {
      $scope.profile.profileView = null;
    } else {
      $scope.profile.profileView = "profileUser";
    };
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
        });
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

  $scope.submitSignIn = () => {
    var data = $scope.sign;
    UsersService.signIn(data.email, data.password, data.username, updateUserStatus);
    $scope.sign = {};
  };

  $scope.submitSignUp = () => {
    var data = $scope.sign;
    UsersService.signUp(data.email, data.password, data.username, updateUserStatus);
    $scope.profile.showProfile = true;
    $scope.sign = {};
  };

  $scope.signOut = () => {
    $scope.profile.showProfile = false;
    $scope.user = null;
    $scope.messages = $scope.messages.reduce((a, e) => {
      if(e.marker) e.marker.setMap(null);
      return a;
    }, []);
    $scope.chat.close();
    localStorage.removeItem("userToken");
    $scope.subnav.show = false;
  };

  function updateUserStatus(data){
    localStorage.userToken = data.token;
    $scope.user = data.user;
    $scope.subnav.show = true;
    chatMagic();
  };

  $scope.getProfile = (id) => {
    console.log("getProfile(id): ", id);
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
  };

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
      $scope.locationFeature.showChangeLoc = !$scope.locationFeature.showChangeLoc;
      $scope.searchFeature.showSearch = false;
      $scope.signin.show = false;
      $scope.signup.show = false;
    },
    goTo: function(){
      var state = $scope.locationFeature.state;
      var city = $scope.locationFeature.city;
      $state.go('city', {state: $scope.locationFeature.state, city: $scope.locationFeature.city}, {reload: true})
    }
  };

  $scope.upvote = (id, type, post) => {
    post.points += 1;
    $http.post(`/theboard/upvote/${type}/${post.id}`);
  };

  $scope.downvote = (id, type, post) => {
    post.points -= 1;
    $http.post(`/theboard/downvote/${type}/${post.id}`);
  };



  $scope.friends = {};
  $scope.friends.getFriends = (id) => {
    if($scope.user){
      $http.get(`/friends/${id}`).then( data => {
        $scope.friends.friendsList = data.data;
      });
    };
  };

  $scope.friends.addFriend = (id) => {
    $http.post(`/friends/${id}`).then( data => {
      $scope.friends.friendsList.push(data)
      console.log($scope.friends.friendsList.indexOf(data));
    });
  };

  $scope.friends.removeFriend = (id) => {
    $http.delete(`/friends/${id}`).then( data => {
      console.log($scope.friends.friendsList.indexOf(data.data[0]));
      $scope.friends.friendsList.splice($scope.friends.friendsList.indexOf(data.data[0]), 1)
      $scope.profile.toggleProfile(id);
      console.log($scope.friends.friendsList.indexOf(data.data[0]));
    });
  };

  $scope.friends.showFriends = false;
  $scope.friends.toggleShowFriends = () => {
    $scope.friends.showFriends = !$scope.friends.showFriends;
  };

  $scope.friends.isFriend = (id) => {
    if ($scope.friends.friendsList) {
      for (var i = 0; i < $scope.friends.friendsList.length; i++) {
        if ($scope.friends.friendsList[i].friend_id) {
          return true;
        }
      }
      return false;
    };
  };

  $scope.tribe = TribeService;
  $scope.search = '';

};
makeBodyController.$inject = ['$scope','UsersService', 'apiInterceptor', 'NewCommentService', "NewPostService","$http", "ChatService", 'TribeService', "$state"];
