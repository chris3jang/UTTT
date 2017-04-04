import React, { Component } from 'react';
import Game from './Game';
import Nav from './Nav';
import Message from './Message';
import './App.css';
import './TTT.css';

class App extends Component {

  render() {
    return (
      	<div>
      		<Nav></Nav>
      		<h1>Ultimate Tic Tac Toe</h1>
        	<Game></Game>
      	</div>
    );
  }
}

export default App;
