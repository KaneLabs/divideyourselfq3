module.exports = app => {
  var server = require('http').createServer(),
    WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({server: server}),
    openSockets = [];

  wss.on('connection', ws => {
    connectionOpen(ws);
    ws.on('message', e => onMessage(ws, e));
    ws.on('close', () => onClose(ws));
  });

  function connectionOpen(ws){
    ws.send(JSON.stringify({connect: true, text: "Chat Enabled"}));
    openSockets.forEach(userSocket => {
      ws.send(JSON.stringify({online: true, fromUser: userSocket.username, center: userSocket.center}));
    });
  }

  function onMessage(ws, e){
    var data = JSON.parse(e);
    if(data.connect) dataConnect(ws, data);
    if(data.message) dataMessage(data);
  }

  function onClose(ws){
    var fromUserSocket = openSockets.find(e => e.ws === ws);
    if(!fromUserSocket) return;
    console.log("Closed", fromUserSocket.username);
    var fromUser = fromUserSocket.username;
    openSockets = openSockets.filter(e => e.ws !== ws);
    openSockets.forEach(userSocket => {
      userSocket.ws.send(JSON.stringify({offline: true, fromUser: fromUser}));
    });
  }

  function dataConnect(ws, data){
    console.log("Connected", data.fromUser);
    var newSocket = {ws: ws, username: data.fromUser, center: data.center};
    if(openSockets.find(e => e.username === data.fromUser)) return;
    openSockets.forEach(userSocket => {
      var message = {online: true, fromUser: data.fromUser, center: data.center};
      userSocket.ws.send(JSON.stringify(message));
    });
    openSockets.push(newSocket);
  }

  function dataMessage(data){
    console.log("Got Message", data.fromUser);
    var message = {fromUser: data.fromUser, message: data.message, timestamp: data.timestamp},
      toUserSocket = openSockets.find(e => e.username === data.toUser);
    if(toUserSocket) toUserSocket.ws.send(JSON.stringify(message));
  }

  server.on('request', app);
  server.listen(process.env.PORT || 3000);
};
