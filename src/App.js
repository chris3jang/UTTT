import React, { Component } from 'react';
import TTT from './TTT';
import Board from './Board';
import './App.css';
import './TTT.css';

class App extends Component {


  render() {
    return (
      <div className="App">
        <TTT boardset={false} ></TTT>
      </div>
    );
  }
}

export default App;
