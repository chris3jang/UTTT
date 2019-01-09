const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

server.listen(process.env.PORT || 8080);
let rooms = 0, player1Name, player2Name;

const occupiedRooms = {};

const generateRoomName = () => {
	let name = "";
	const letters = "abcdefghijklmnopqrstuvwxyz";
	const numbers = "0123456789";
	for(let i = 0; i < 4; i++) {
		name += letters.charAt(Math.floor(Math.random() * letters.length));
	}
	for(let j = 0; j < 4; j++) {
		name += numbers.charAt(Math.floor(Math.random() * numbers.length));
	}
	return name;
}

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

io.on('connection', function(socket){

	socket.on('createGameOnline', function(data){
	  player1Name = data.name;
	  const roomName = generateRoomName()
	  occupiedRooms[roomName] = [data.name]

	  socket.join(roomName);
	  socket.emit('newGameCreated', {name: data.name, room: roomName});
	});

	socket.on('joinExistingGame', function(data){
		occupiedRooms[data.room][1] = data.name
		socket.emit('newGameCreated', {name: data.name, room: data.room});
	  var room = io.nsps['/'].adapter.rooms[data.room];
	  if( room && room.length == 1){
	    socket.join(data.room);
	    socket.broadcast.to(data.room).emit('player1', {opponentName: data.name});
	    socket.emit('player2', {opponentName: occupiedRooms[data.room][0], room: data.room })
	  }
	  else {
	    socket.emit('err', {message: 'Sorry, The room is full!'});
	  }
	});

	socket.on('playTurn', function(data){
	  socket.to(data.room).emit('turnPlayed', {
	    tile: data.tile,
	    room: data.room
	  });
	});

	socket.on('gameEnded', function(data){
	  socket.broadcast.to(data.room).emit('gameEnd', data);
	});

	socket.on('exitGame', function(data) {
	  socket.to(data.room).emit('opponentExited', data)
	});

});

