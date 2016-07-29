app.directive('dyProfile', () => ({
  templateUrl: "partials/profile.html",
  controllers: "ProfileController"
}));

app.directive("navbar", () => ({
  templateUrl: "partials/navbar.html"
}));

app.directive("subnav", () => ({
  templateUrl: "partials/subnav.html"
}));

app.directive("newpost", () => ({
  templateUrl: "partials/newpost.html"
}));

app.directive("comment", () => ({
  templateUrl: "partials/comment.html"
}));

app.directive("carosel", () => ({
  templateUrl: "partials/carosel.html"
}));

app.directive("post", () => ({
  templateUrl: "partials/post.html"
}));

app.directive("dyFriends", () => ({
  templateUrl: "partials/friends.html"
}));

app.directive("dyAddFriend", () =>({
  templateUrl: "partials/addFriend.html"
}))
