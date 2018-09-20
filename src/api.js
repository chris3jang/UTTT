import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:5000');

function createOnlineGame(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
}

export { createOnlineGame };