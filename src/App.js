import React, { Component } from 'react';
import Modal from './Modal';
import Game from './Game';
import Nav from './Nav';
import './App.css';
import './TTT.css';

class App extends Component {

	state = {
		hasGameStarted: false,
		isModalOpen: false,
		gameSettings: "three"

	}

	newGame() {
		const {hasGameStarted} = this.state
		this.setState({hasGameStarted: true});
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


	newGame = this.newGame.bind(this);
	openModal = this.openModal.bind(this);
	closeModal = this.closeModal.bind(this);
	one = this.one.bind(this);
	three = this.three.bind(this);
	magic = this.magic.bind(this);
	select = this.select.bind(this);

  render() {
  	const {hasGameStarted, isModalOpen, gameSettings} = this.state
  	console.log("hasGameStarted: " + hasGameStarted)
    return (
      	<div>
      		<Nav startNewGame={this.newGame} 
      			newGameHasStarted={hasGameStarted} 
      			rules={this.openModal}
      			gameSettings={gameSettings}
      			setToOne={this.one}
      			setToThree={this.three}
      			setToMagic={this.magic}
      			setToSelected={this.select}>
      		</Nav>
      		<Modal isOpen={isModalOpen}>
      			<h1>Rules</h1>
      			<p>here are the rules</p>
      			<button onClick={this.closeModal}>x</button>
      		</Modal>
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
