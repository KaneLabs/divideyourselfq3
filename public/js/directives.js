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
