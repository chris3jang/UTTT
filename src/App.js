import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Modal from './Modal';
import Game from './Game';
import Nav from './Nav';
import './App.css';
import './TTT.css';

import OnlineGameHandler from './OnlineGameHandler'

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');

class App extends React.Component {

	state = {
		hasGameStarted: false,
		gameSettings: "three",

		modal: null,

		onlineRoomCreateDirections: 'createGame',
		roomID: null,
		player: null,
		turnPlayedData: null,

		exitGame: null
	}

	componentDidMount() {
		const self = this
		socket.on('newGameCreated', data => {
			console.log("IHEARD NEW GAME WAS CREATED")
			console.log(data, "data")
	  		self.setState({ onlineRoomCreateDirections: 'joinGame', roomID: data.room})

		});

		socket.on('player1', data => {
			console.log("client player1 heared")
			self.setState({hasGameStarted: true, player: 1, modal: null})
		})

		socket.on('player2', data => {
			console.log("client player2 heared")
			self.setState({hasGameStarted: true, player: 2, modal: null})
		})

		//figure out how to make this work inside child component
		socket.on('turnPlayed', data => {
			console.log("turnPlayedData": data)
			self.setState({turnPlayedData: data})
		})
		
	}



	selectMenuOption(action) {
		const {gameSettings, hasGameStarted} = this.state
		if(action === 'one' || action === 'three' || action === 'magic') this.setState({gameSettings: action})
		if(action === 'local') this.setState({hasGameStarted: true});
		if(action === 'online') this.setState({modal: "online", roomID: true});
		if(action === 'exit') this.setState({hasGameStarted: false, exitGame: true})
		if(action === 'rules') this.setState({modal: "rules"})
	}


	closeModal() {
		const {modal} = this.state
		this.setState({modal: null});
	}



	submitOnlineGameForm(e) {
		// const name = 'enter name from client'
		e.preventDefault()
		if(e.target[0].value && !e.target[1].value) {
			socket.emit('createGameOnline', {name: e.target[0].value})
		}
		if(e.target[1].value && e.target[0].value) {
			this.setState({roomID: e.target[1].value})
			socket.emit('joinExistingGame', {name: e.target[0].value, room: e.target[1].value})
		}
	}


  render() {

  	const {hasGameStarted, modal, gameSettings, onlineRoomCreateDirections} = this.state



  	let directionsBody
  	if(onlineRoomCreateDirections == 'createGame') {
  		directionsBody = 
	  	<form method="post" onSubmit={this.submitOnlineGameForm.bind(this)}>
			<div className="form-group">
				<p>Start a new game</p>
				<input type="text" name="playername" placeholder="name"></input>
			</div>
			<div className="form-group">
				<p>Join an existing game</p>
				<input type="text" name="gameid" placeholder="gameid"></input>
			</div>
			<div>
				<button type="submit">Submit</button>
			</div>
		</form>
  	}
  	else if(onlineRoomCreateDirections === 'joinGame') {
  		directionsBody = 
  		<p>Please ask your friend to enter Game ID: 
		    {this.state.roomID}. Waiting for player 2...'</p>
  	}
  	

    return (
      	<div>
      		<Nav
      			selectMenuOption={this.selectMenuOption.bind(this)}
      			gameSettings={gameSettings}>
      		</Nav>
      		<div className="separator"></div>
      		<Modal 
      			show={modal} 
      			handleClose={this.closeModal.bind(this)} 
      			headerText={modal === "rules" ? "Rules" : "Online Form"}>
      			{modal === "rules" ? <p>these are the rules</p> : directionsBody }
      		</Modal>
        	<Game 
        		newGameHasStarted={hasGameStarted}
        		gameSettings={gameSettings}
        		online={this.state.online}
        		player={this.state.player}
        		roomID={this.state.roomID}
        		turnPlayedData={this.state.turnPlayedData}
        		exitGame = {this.state.exitGame}>
        	</Game>
      	</div>
    );
  }
}


export default App;
