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
    $http.post("/api/posts", post).then(() => {
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
    $http.post("/api/comments", comment);
  }
}));
