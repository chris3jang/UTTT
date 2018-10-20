const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const path = require('path')

let rooms = 0, player1Name, player2Name;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

io.on('connection', function(socket){
	/**
	 * Create a new game room and notify the creator of game. 
	 */
	socket.on('createGameOnline', function(data){
	  //do something with data
	  console.log('CREATEGAMEONLINE data', data)
	  player1Name = data.name;
	  socket.join('room-' + ++rooms);
	  socket.emit('newGameCreated', {name: data.name, room: 'room-'+rooms});
	});

	/**
	 * Connect the Player 2 to the room he requested. Show error if room full.
	 */
	socket.on('joinExistingGame', function(data){
		socket.emit('newGameCreated', {name: data.name, room: 'room-'+rooms});
	  var room = io.nsps['/'].adapter.rooms[data.room];
	  if( room && room.length == 1){
	    socket.join(data.room);
	    console.log("PLAYER1", data)
	    socket.broadcast.to(data.room).emit('player1', {player2Name: data.name});
	    console.log("PLAYER2", data.name)
	    socket.emit('player2', {player2Name: player1Name, room: data.room })
	  }
	  else {
	    socket.emit('err', {message: 'Sorry, The room is full!'});
	  }
	});

	/**
	 * Handle the turn played by either player and notify the other. 
	 */
	socket.on('playTurn', function(data){
	  socket.to(data.room).emit('turnPlayed', {
	    tile: data.tile,
	    room: data.room
	  });
	});

	/**
	 * Notify the players about the victor.
	 */
	socket.on('gameEnded', function(data){
	  socket.broadcast.to(data.room).emit('gameEnd', data);
	}); // We'll replace this with our own events

	socket.on('exitGame', function(data) {
	  console.log("step 2", data.room)
	  socket.to(data.room).emit('opponentExited', data)
	  socket.broadcast.to(data.room).emit('opponentExited', data)
	  socket.emit('opponentExited', data)
	});

});

server.listen(process.env.PORT || 8080, () => {console.log("index.js is running")});

