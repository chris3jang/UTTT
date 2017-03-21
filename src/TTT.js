import React, { Component } from 'react';
import './TTT.css';
import Square from './Square.js';

const boardpositions = [
  "topleft", "top", "topright", "left", "center", "right", "bottomleft", "bottom", "bottomright"
]

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

  constructor() {
    super()
    this.determineWhosTurn.bind(this)
  };

  state = {
    xplayersturn: false,
  };

  determineWhosTurn() {
    this.setState({xplayersturn: !this.state.xplayersturn})
    return this.state.xplayersturn;
  }




  render() {
    return (
      <div>
        <Square position={boardpositions[0]} myFunc={this.determineWhosTurn} key={boardpositions[0].objectID}></Square>
        {/*
        <table>
          <tbody>
            <tr>{boardpositions.slice(0, 3).map(item => <td><Square position={item} whosturn={} key={item.objectID}></Square></td>)}</tr>
            <tr>{boardpositions.slice(3, 6).map(item => <td><Square position={item} whosturn={} key={item.objectID}></Square></td>)}</tr>
            <tr>{boardpositions.slice(6, 9).map(item => <td><Square position={item} whosturn={} key={item.objectID}></Square></td>)}</tr>
          </tbody>
        </table>
        */}
      </div>
    );
  };
    
  
}

export default TTT;


