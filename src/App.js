import React, { Component } from 'react';
import Modal from './Modal';
import Game from './Game';
import Nav from './Nav';
import './App.css';
import './TTT.css';

class App extends Component {

	state = {
		hasGameStarted: false,
		isModalOpen: false
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




	newGame = this.newGame.bind(this);
	openModal = this.openModal.bind(this);
	closeModal = this.closeModal.bind(this);

  render() {
  	const {hasGameStarted, isModalOpen} = this.state
  	console.log("hasGameStarted: " + hasGameStarted)
    return (
      	<div>
      		<Nav startNewGame={this.newGame} 
      			newGameHasStarted={hasGameStarted} 
      			rules={this.openModal}>
      		</Nav>
      		<Modal isOpen={isModalOpen}>
      			<h1>Rules</h1>
      			<p>here are the rules</p>
      			<button onClick={this.closeModal}>x</button>
      		</Modal>
      		<h1>Ultimate Tic Tac Toe</h1>
        	<Game newGameHasStarted={hasGameStarted}></Game>
      	</div>
    );
  }
}

export default App;
