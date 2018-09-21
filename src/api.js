import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');

module.exports = {
	listenForSocketsFromClient = (cb) => {
		socket.on('newGameCreated', data => {
			cb(null, data)
		}
	}
}





export { listenForSocketsFromClient };