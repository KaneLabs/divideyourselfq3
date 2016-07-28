app.factory('UsersService', $http => {
  return {
    // sign: (type, email, password, username, callback) => {
    //   $http.post(`/users/sign${type}`, {email, password, username}).then(data => {
    //     console.log("Back on the client", data);
    //     if(!data.data.token) return localStorage.removeItem("userToken");
    //     callback(data.data);
    //   });
    // },
    signIn: (email, password, username, callback) => {
      $http.post("/users/signin", {email, password, username}).then(data => {
        console.log("Back on the client", data);
        if(!data.data.token) return localStorage.removeItem("userToken");
        callback(data.data);
      });
    },
    signUp: (email, password, username, callback) => {
      $http.post("/users/signup", {email, password, username}).then(data => {
        console.log("Back on the client", data);
        if(!data.data.token) return localStorage.removeItem("userToken");
        callback(data.data);
      });
    },

    get: (id) => {
      $http.get(`/users/${id}`).then(data => {
      //TODO Do something with user data
      console.log(data.data);
      });
    }
  }
});

app.factory("NewPostService", $http => $scope => ({
  toggleLock: () => $scope.newPostActive = !$scope.newPostActive,
  create: posts => {
    var post = {
      user_id: $scope.user.id,
      title: $scope.newPost.title,
      body: $scope.newPost.body,
      media_url: $scope.newPost.media_url,
      lat: $scope.newPost.lat,
      lng: $scope.newPost.lng,
      timestamp: Date.now().toString()
    };
    $http.post("/posts/create", post).then(() => {
      post.media_url = [post.media_url];
      post.username = $scope.user.username;
      post.openImage = 0;
      post.comments = [];
      posts.push(post);
      loadPostsInBounds($scope, $http);
    });
    $scope.toggleNewPost();
  }
}));

app.factory("NewCommentService", $http => $scope => ({
  create: post => {
    var comment = {
      username: $scope.user.username,
      user_id: $scope.user.id,
      profile_url: $scope.user.profile_url,
      post_id: post.id,
      comment: post.newComment,
      timestamp: Date.now().toString()
    };
    post.comments.push(comment);
    console.log(post.comments);
    post.newComment = "";
    $http.post("/comments/create", comment);
  }
}));

app.factory("MapService", $http => {
  return {
    setCenterHome: () => {
      var isStored = localStorage.center && parseInt(localStorage.centerttl) > Date.now();
      if(isStored) mapConfig.center = JSON.parse(localStorage.center);
      else {
        navigator.geolocation.getCurrentPosition(data => {
          if(!data.coords) return;
          mapConfig.center = {lat: data.coords.latitude, lng: data.coords.longitude};
          if(map) map.panTo(mapConfig.center);
          localStorage.center = JSON.stringify(mapConfig.center);
          localStorage.centerttl = Date.now() + (1000 * 60 * 15);
        });
      }
      if(map) map.panTo(mapConfig.center);
    },
    setCenterLocation: () => {
      var loc = window.location.pathname.split("/");
      if(parseFloat(loc[1])){
        mapConfig.center = {lat: parseFloat(loc[1]), lng: parseFloat(loc[2])};
        if(map) map.panTo(mapConfig.center);
      }
      else {
        $http.get(`http://maps.googleapis.com/maps/api/geocode/json?address=${loc[2]},${loc[1]}`).then(data => {
          if(data.data.results[0]) mapConfig.center = data.data.results[0].geometry.location;
          if(map) map.panTo(mapConfig.center);
        });
      }
    },
    setCenterPost: loc => {
      if(!loc) loc = window.location.pathname.split("/").slice(1);
      mapConfig.center = {lat: parseFloat(loc[0]), lng: parseFloat(loc[1])};
      if(map) map.panTo(mapConfig.center);
    },
    getPosts: ($scope, $state, post_id) => {
      var loc = window.location.pathname.split("/");
      var bounds = map.getBounds();
      if(post_id) post_id = parseInt(post_id);
      if(!bounds) return;
      bounds = {minLat: bounds.f.f, maxLat: bounds.f.b, minLng: bounds.b.b, maxLng: bounds.b.f};
      $http.post("/locations", bounds).then(data => {
        if(!data.data.posts) return;
        $scope.posts = data.data.posts.map(post => {
          if(post_id && post.id !== post_id) return;
          post.marker = new google.maps.Marker({
            position: {lat: parseFloat(post.lat), lng: parseFloat(post.lng)},
            map: map,
            title: post.title
          });
          post.marker.addListener('click', () => $state.transitionTo("post", {state: post.lat, city: post.lng, post: post.id}));
          post.media_url = post.media_url.split(",");
          post.openImage = 0;
          if(post_id) $scope.soloPost = post;
          return post;
        }).filter(e => !!e);
      });
    }
  }
});
