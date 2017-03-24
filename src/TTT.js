import React, { Component } from 'react';
import './TTT.css';
import Square from './Square.js';

/* see you if you can figure out how to nest the <tr></tr>s below ahahah
const rows = [][];
for(var i = 0; i < 3; i++) {
  for(var j = 0; j < 3; j++) {
    rows[i][j].push(boardpositions[i*3+j]);
  }
  rows[i].map((item, key) => <td><Square position={item} key={key}></Square></td>)
}
*/

class TTT extends Component {

  state = {
    turn: true, 
    boardpositions: [
      " ", 
      " ", 
      " ", 
      " ", 
      " ", 
      " ", 
      " ", 
      " ", 
      " "
    ]
  };

  handleMove(indexclicked) { //indexclicked is whatever is fed to position attribute in <Square/>
    const {turn, boardpositions} = this.state //these variables are undefined until this line, figure out why i put this line in this method and never in the constructor
    boardpositions[indexclicked] = turn ? 'X' : 'O'; //this line causes <Square/>'s content attribute to change immediately
    this.setState({turn: !turn, boardpositions}); //these variables don't get updated until after this function is complete(they will be changed once this.state at the beginning of this function is called again), boardpositions same as "boardpostions: boardposition"
  };

  handleMove = this.handleMove.bind(this);

  render() {
    const {boardpositions} = this.state
    return (
      <div>
        <Square 
          position={0} 
          myFunc={this.handleMove}
          key={0}
          content={boardpositions[0]}>
        </Square>
        {/*
        <table>
          <tbody>
            <tr>{boardpositions.slice(0, 3).map((item, index) => <td><Square position={index} key={index} content={item}></Square></td>)}</tr>
            <tr>{boardpositions.slice(3, 6).map(item => <td><Square position={item} key={item.objectID}></Square></td>)}</tr>
            <tr>{boardpositions.slice(6, 9).map(item => <td><Square position={item} key={item.objectID}></Square></td>)}</tr>
          </tbody>
        </table>
        */}
      </div>
    );
  };
    
}

export default TTT;