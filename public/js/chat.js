var Magic = (number, callback) => {
  var argumentArray = [];
  return data => {
    argumentArray.push(data);
    if(argumentArray.length === number) return callback(argumentArray);
  }
};

var magicCenter;

app.factory("ChatService", () => $scope => {
  if(!$scope.user) return;
  var host = location.origin.replace(/^http/, 'ws'),
    chat = {}

  $scope.messages = [];

  startChat(chat);

  function startChat(chat){
    console.log("Starting Chat");
    chat.socket = new WebSocket(host);
    chat.socket.onopen = onOpen;
    chat.socket.onmessage = onMessage;
    chat.socket.onclose = () => startChat(chat);
  }

  function onOpen(){
    console.log("Socket Opened");
    if(!localStorage.center && !magicCenter) magicCenter = Magic(2, sendLocation);
  }

  function onMessage(e){
    console.log("Got Data", e.data);
    var data = JSON.parse(e.data);
    if(data.fromUser === $scope.user.username) return;
    var sender = $scope.messages.find(e => e.username === data.fromUser);
    if(!sender && !data.connect){
      sender = {live: false, username: data.fromUser, log: []};
      $scope.messages.push(sender);
    }
    if(data.connect) dataConnect(data);
    if(data.online) dataOnline(data, sender);
    if(data.offline) dataOffline(sender);
    if(data.message) dataMessage(data, sender);
    $scope.$apply();
  }

  function dataConnect(data){
    console.log("Connected to Server");
    magicCenter ? magicCenter() : sendLocation();
  }

  function dataOnline(data, sender){
    sender.live = true;
    sender.marker = new google.maps.Marker({
      icon: "mapicons/dude.png",
      position: typeof data.center === "string" ? JSON.parse(data.center) : data.center,
      map: map,
      title: data.fromUser
    });
  }

  function dataOffline(sender){
    console.log("User Offline:", sender.username);
    sender.live = false;
    if(sender.marker){
      sender.marker.setMap(null);
      sender.marker = null;
    }
  }

  function dataMessage(data, sender){
    console.log("Got Message:", data);
    var message = {fromUser: data.fromUser, message: data.message, timestamp: data.timestamp};
    sender.log.push(message);
  }

  function sendLocation(){
    console.log("Sending Location");
    var message = {connect: true, fromUser: $scope.user.username, center: JSON.parse(localStorage.center)};
    chat.socket.send(JSON.stringify(message));
  }

  return {
    send: convo => {
      console.log("Sending Data", message);
      var toUser = convo.username,
        message = convo.input,
        conversation = $scope.messages.find(e => e.username === toUser),
        fromUser = $scope.user.username,
        timestamp = Date.now();
      if(!conversation || !conversation.live) return console.log(`User '${toUser}' is offline`);
      conversation.log.push({fromUser, message, timestamp});
      chat.socket.send(JSON.stringify({toUser, fromUser, message, timestamp}));
      convo.input = "";
    }
  };
});

app.directive("chat", () => ({templateUrl: "partials/chat.html"}));
