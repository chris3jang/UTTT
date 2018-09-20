import React, { Component } from 'react';
import Modal from './Modal';
import Game from './Game';
import Nav from './Nav';
import './App.css';
import './TTT.css';

import OnlineGameHandler from './OnlineGameHandler'

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');

class App extends Component {

	state = {
		hasGameStarted: false,
		isModalOpen: false,
		gameSettings: "three",
		onlineHandlerForm: false,
		onlineHandlerMessageObj: {num: 0, arg: null}
	}

	componentDidMount() {
		const self = this
		socket.on('newGameCreated', function(data){
			const num = self.state.onlineHandlerMessageObj.num
	  		self.setState({ onlineHandlerMessageObj: { num: num+1 , arg: data} })
		});
	}

	newGame() {
		const {hasGameStarted} = this.state
		this.setState({hasGameStarted: true});
	}

	newOnlineGame() {
		const {onlineHandlerForm} = this.state
		this.setState({onlineHandlerForm: true})
	}

	closeOnlineForm() {
		const {onlineHandlerForm} = this.state
		this.setState({onlineHandlerForm: false})
	}

	openModal() {
		const {isModalOpen} = this.state
		this.setState({isModalOpen: true});
	}

	closeModal() {
		const {isModalOpen} = this.state
		this.setState({isModalOpen: false});
	}

	one() {
		const {gameSettings} = this.state
		this.setState({gameSettings: "one"})
	}

	three() {
		const {gameSettings} = this.state
		this.setState({gameSettings: "three"})
	}

	magic() {
		const {gameSettings} = this.state
		this.setState({gameSettings: "magic"})
	}

	select(clicked) {
		const {gameSettings} = this.state
		this.setState({gameSettings: clicked})
	}

	submitOnlineGameForm(e) {
		// const name = 'enter name from client'
		e.preventDefault()
		console.log(e.target[0].value, 'e.target[0]')
		console.log(e.target[1].value, 'e.target[1]')
		if(e.target[0].value && !e.target[1].value) {
			console.log("name only")
			socket.emit('createGameOnline', {name: e.target[0].value})
		}
		if(e.target[1].value && e.target[0].value) {
			console.log("gameid only")
			socket.emit('joinExistingGame', {name: e.target[0].value, room: e.target[1].value})
		}
	}




	newGame = this.newGame.bind(this);
	openModal = this.openModal.bind(this);
	closeModal = this.closeModal.bind(this);
	one = this.one.bind(this);
	three = this.three.bind(this);
	magic = this.magic.bind(this);
	select = this.select.bind(this);
	newOnlineGame = this.newOnlineGame.bind(this);
	closeOnlineForm = this.closeOnlineForm.bind(this);
	submitOnlineGameForm = this.submitOnlineGameForm.bind(this);

  render() {
  	const {hasGameStarted, isModalOpen, gameSettings, onlineHandlerForm, onlineHandlerMessageObj} = this.state
  	console.log("hasGameStarted: " + hasGameStarted)

  	let onlineHandlerMessage

  	if(onlineHandlerMessageObj.num == 0) {
  		onlineHandlerMessage = 
	  	<form method="post" onSubmit={this.submitOnlineGameForm}>
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
		console.log(onlineHandlerMessage)
  	}

  	if(onlineHandlerMessageObj.num == 1) {
  		onlineHandlerMessage = 
  		<p>Please ask your friend to enter Game ID: 
		    {this.state.onlineHandlerMessageObj.arg.room}. Waiting for player 2...'</p>
		  console.log(onlineHandlerMessage)
  	}
  	

    return (
      	<div>
      		<Nav startNewGame={this.newGame} 
      			newGameHasStarted={hasGameStarted}
      			newOnlineGame = {this.newOnlineGame} 
      			rules={this.openModal}
      			online={this.openOnlineHandler}
      			gameSettings={gameSettings}
      			setToOne={this.one}
      			setToThree={this.three}
      			setToMagic={this.magic}
      			setToSelected={this.select}
      			openOnlineForm={this.newOnlineGame}>
      		</Nav>
      		<Modal isOpen={isModalOpen}>
      			<h1>Rules</h1>
      			<p>here are the rules</p>
      			<button onClick={this.closeModal}>x</button>
      		</Modal>
      		<OnlineGameHandler isOpen={onlineHandlerForm}>
      			<button onClick={this.closeOnlineForm}>x</button>
      			{onlineHandlerMessage}
      		</OnlineGameHandler>
      		<h1>Ultimate Tic Tac Toe</h1>
        	<Game 
        		newGameHasStarted={hasGameStarted}
        		gameSettings={gameSettings}>
        	</Game>
      	</div>
    );
  }
}

export default App;
