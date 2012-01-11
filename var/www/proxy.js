/*
    node-http-proxy
        with websockets from socketio
*/

var util = require('util'),
    colors = require('colors'),
    websocket = require('../../vendor/websocket'),
    httpProxy = require('../../lib/node-http-proxy');

try {
  var utils = require('socket.io/lib/socket.io/utils'),
      io = require('socket.io');
}
catch (ex) {
  console.error('Socket.io is required for this example:');
  console.error('npm ' + 'install'.green + ' socket.io@0.6.18'.magenta);
  process.exit(1);
}

//
// Setup our server to proxy standard HTTP requests
//
var proxy = new httpProxy.HttpProxy({
  target: {
    host: 'localhost', 
    port: 8080
  }
});
var proxyServer = http.createServer(function (req, res) {
  proxy.proxyRequest(req, res);
});

//
// Listen to the `upgrade` event and proxy the 
// WebSocket requests as well.
//
proxyServer.on('upgrade', function (req, socket, head) {
  var buffer = httpProxy.buffer(socket);

  setTimeout(function () {
    proxy.proxyWebSocketRequest(req, socket, head, buffer);
  }, 1000);
});

proxyServer.listen(80);

//
// Setup the web socket against our proxy
//
var ws = new websocket.WebSocket('ws://localhost:8081/socket.io/websocket/', 'borf');

ws.on('open', function () {
  ws.send(utils.encode('from client'));
});

ws.on('message', function (msg) {
  util.debug('Got message: ' + utils.decode(msg));
});

