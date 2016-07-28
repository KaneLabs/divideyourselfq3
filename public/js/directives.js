app.directive('dyProfile',function(){
  return {
    restrict: "AC",
    templateUrl: "partials/profile.html",
    // scope: {
    //   user: "="
    // },
    controllers: "ProfileController"
  };
});

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
