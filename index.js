const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const path = require('path')

let rooms = 0

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
	  console.log('data', data)
	  socket.join('room-' + ++rooms);
	  socket.emit('newGameCreated', {name: data.name, room: 'room-'+rooms});
	});

	/**
	 * Connect the Player 2 to the room he requested. Show error if room full.
	 */
	socket.on('joinExistingGame', function(data){
	  var room = io.nsps['/'].adapter.rooms[data.room];
	  if( room && room.length == 1){
	  	console.log("here")
	  	console.log('data.room', data.room)
	  	console.log('data.name', data.name)
	    socket.join(data.room);
	    socket.broadcast.to(data.room).emit('player1', {});
	    socket.emit('player2', {name: data.name, room: data.room })
	  }
	  else {
	    socket.emit('err', {message: 'Sorry, The room is full!'});
	  }
	});

	/**
	 * Handle the turn played by either player and notify the other. 
	 */
	socket.on('playTurn', function(data){
	  socket.broadcast.to(data.room).emit('turnPlayed', {
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
});

server.listen(process.env.PORT || 8080, () => {console.log("index.js is running")});

