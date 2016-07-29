var x;

app.factory("ChatService", () => $scope => {
  var chat = new WebSocket(`ws://${window.location.hostname}:3000`);

  $scope.messages = localStorage.messages ? JSON.parse(localStorage.messages) : [];

  chat.onmessage = e => {
    var data = JSON.parse(e.data),
      sender = $scope.messages.find(e => e.username === data.fromUser);
    if(data.connect) return console.log(data.message);
    console.log(data);
    if(data.fromUser && !sender){
      sender = {
        live: false,
        username: data.fromUser,
        log: []
      };
      $scope.messages.push(sender);
    }
    if(data.online) sender.live = true;
    if(data.offline) sender.live = false;
    if(data.message) sender.log.push({
      fromUser: data.fromUser,
      message: data.message,
      timestamp: data.timestamp
    });
    $scope.$apply();
  }

  chat.onopen = () => {
    if(!localStorage.center || !$scope.user) return;
    chat.send(JSON.stringify({
      connect: true,
      fromUser: $scope.user.username,
      center: localStorage.center
    }));
    $scope.$apply();
  };

  var service = {
    send: (toUser, message) => {
      var conversation = $scope.messages.find(e => e.username === toUser),
        fromUser = $scope.user.username,
        // message = $scope.messageInputs[toUser],
        timestamp = Date.now();
      if(!conversation || !conversation.live) return console.log(`User '${toUser}' is offline`);
      conversation.log.push({fromUser, message, timestamp});
      chat.send(JSON.stringify({toUser, fromUser, message, timestamp}));
      $scope.$apply();
    }
  };
  x = service;
  return service;
});

app.directive("chat", () => ({
  templateUrl: "partials/chat.html"
}));
