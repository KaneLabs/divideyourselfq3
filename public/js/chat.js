var x;

app.factory("ChatService", () => $scope => {
  var host = location.origin.replace(/^http/, 'ws'),
    chat = new WebSocket(host);

  $scope.messages = localStorage.messages ? JSON.parse(localStorage.messages) : [];

  chat.onmessage = e => {
    var data = JSON.parse(e.data),
      sender = $scope.messages.find(e => e.username === data.fromUser);
    console.log(e.data);
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
    if(data.online){
      sender.live = true;
      if(data.center) sender.marker = new google.maps.Marker({
        icon: "mapicons/dude.png",
        position: JSON.parse(data.center),
        map: map,
        title: data.fromUser
      });
      else console.log(data);
    }
    if(data.offline){
      sender.live = false;
      if(sender.marker){
        sender.marker.setMap(null);
        sender.marker = null;
      }
    }
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
    send: convo => {
      var toUser = convo.username,
        message = convo.input,
        conversation = $scope.messages.find(e => e.username === toUser),
        fromUser = $scope.user.username,
        timestamp = Date.now();
      if(!conversation || !conversation.live) return console.log(`User '${toUser}' is offline`);
      conversation.log.push({fromUser, message, timestamp});
      chat.send(JSON.stringify({toUser, fromUser, message, timestamp}));
      convo.input = "";
    }
  };
  x = service;
  return service;
});

app.directive("chat", () => ({
  templateUrl: "partials/chat.html"
}));
