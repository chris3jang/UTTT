import React, { Component } from 'react';
import TTT from './TTT';
import './TTT.css';

class Board extends Component {


  render() {
    return (
      <div className="Board">
        <TTT></TTT>
      </div>
    );
  }
}

export default Board;
