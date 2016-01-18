var express = require('express');
var app = express();
var redis  = require('redis');
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
    console.log('Connected...');
});

var client2 = redis.createClient();
client2.subscribe("big_data_sim_channel");
client2.on("message", function(channel, message){
    console.log('Sending message..', JSON.parse(message));
    io.emit('events', message);
});

app.use(express.static('public'));

console.log('Started on port 3005...');
server.listen(3005);
