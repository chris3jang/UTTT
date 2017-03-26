import React, { Component } from 'react';
import Game from './Game';
import Board from './Board';
import './App.css';
import './TTT.css';

class App extends Component {


  render() {
    return (
      <div className="App">
        <Game></Game>
      </div>
    );
  }
}

export default App;
