import React, { Component } from 'react';
import Game from './Game';
import Nav from './Nav';
import './App.css';
import './TTT.css';

class App extends Component {

	state = {
		hasGameStarted: false
	}

	newGame() {
		const {hasGameStarted} = this.state
		this.setState({hasGameStarted: true}, this.render);
	}

	newGame = this.newGame.bind(this);

  render() {
  	const {hasGameStarted} = this.state
  	console.log("hasGameStarted: " + hasGameStarted)
    return (
      	<div>
      		<Nav startNewGame={this.newGame} reRender={this.reRender} newGameHasStarted={hasGameStarted}></Nav>
      		<h1>Ultimate Tic Tac Toe</h1>
        	<Game newGameHasStarted={hasGameStarted}></Game>
      	</div>
    );
  }
}

export default App;
