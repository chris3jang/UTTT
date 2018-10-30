import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Modal from './Modal';
import Game from './Game';
import Nav from './Nav';
import './App.css';
import './TTT.css';


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
		playerNum: null,
		turnPlayedData: null,

		exitGame: null
	}

	componentDidMount() {
		const self = this
		socket.on('newGameCreated', data => {
			let temp = this.state.player
			temp[0] = 1
	  		self.setState({ modal: 'onlineWait', player: temp, playerNum: 1, roomID: data.room })

		});

		socket.on('player1', data => {
			let temp = this.state.player
			temp[2] = data.opponentName
			self.setState({ player: temp, hasGameStarted: true, modal: null})
		})

		socket.on('player2', data => {
			let temp = this.state.player
			temp[0] = 2
			temp[2] = data.opponentName
			self.setState({hasGameStarted: true, player: temp, playerNum: 2, modal: null})
		})

		//figure out how to make this work inside child component
		socket.on('turnPlayed', data => {
			self.setState({turnPlayedData: data.tile})
		})
		
		socket.on('opponentExited', data => {
			console.log("step 3")
			self.setState({hasGameStarted: false, exitGame: true, roomID: null, player: null, turnPlayedData: null, modal: "resignation"});
		})
	}



	selectMenuOption(action) {
		console.log("selected")
		const {gameSettings, hasGameStarted} = this.state
		//if(action === 'one' || action === 'three' || action === 'magic') this.setState({gameSettings: action})
		if(action === 'local') this.setState({hasGameStarted: true});
		if(action === 'online') this.setState({modal: "onlineForm", roomID: true});
		if(action === 'exit') {
			if(this.state.roomID !== null) {
				console.log("step 1")
				socket.emit('exitGame', {room: this.state.roomID})
			}
			this.setState({hasGameStarted: false, exitGame: true, roomID: null, player: null, turnPlayedData: null});
		}
		if(action === 'rules') this.setState({modal: "rules"});
	}


	closeModal() {
		const {modal} = this.state

		this.setState({modal: null, roomID: null, player: null, turnPlayedData: null});
	}



	submitOnlineGameForm(e) {
		// const name = 'enter name from client'
		e.preventDefault()
		if(e.target[0].value && !e.target[1].value) {
			let temp
			if(this.state.player === null) temp = []
			else temp = this.state.player
			temp[1] = e.target[0].value
			this.setState({player: temp})
			socket.emit('createGameOnline', {name: e.target[0].value})
		}
		if(e.target[1].value && e.target[0].value) {
			let temp
			if(this.state.player === null) temp = []
			else temp = this.state.player
			temp[1] = e.target[0].value
			this.setState({player: temp, roomID: e.target[1].value})
			socket.emit('joinExistingGame', {name: e.target[0].value, room: e.target[1].value})
		}
	}


  render() {

  	const {hasGameStarted, modal, gameSettings, onlineRoomCreateDirections} = this.state

  	const getModalContent = (keyword) => {
  		if(keyword === "rules") {
  			return <p>Ultimate Tic Tac Toe is a game that places a 9 total local tic tac toe boards inside each space of a grand tic tac toe board.  As you can probably guess, you claim a large space by winning a local board.  However, whenever you make a move on a local board's position, that will be the position of the grand board your opponent gets to make next.  Think twice about choosing the strong middle space, it will only assist your opponent in claiming that same space of the larger board that really matters.  Beware that once per game, there will be a space that sends your opponent to a local board that's completely full, (s)he will get to make the next move wherever (s)he'd like.  Good luck!</p>
  		}
  		if(keyword === "onlineForm") {
  			 return <form method="post" onSubmit={this.submitOnlineGameForm.bind(this)}>
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
  		if(keyword === "onlineWait") {
  			 return <p>Please ask your friend to enter Game ID: 
		    		{this.state.roomID}. Waiting for player 2...'</p>
  		}
  		if(keyword === "resignation") {
  			return <p>Your opponent resigned.</p>
  		}
  	}

  	const getModalHeader = () => {
  		
  	}

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
      			{modal !== null ? getModalContent(this.state.modal) : null}
      		</Modal>
        	<Game 
        		newGameHasStarted={hasGameStarted}
        		gameSettings={gameSettings}
        		online={this.state.online}
        		player={this.state.player}
        		playerNum={this.state.playerNum}
        		roomID={this.state.roomID}
        		turnPlayedData={this.state.turnPlayedData}
        		exitGame = {this.state.exitGame}>
        	</Game>
      	</div>
    );
  }
}


export default App;
