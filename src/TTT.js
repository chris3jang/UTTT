import React, { Component } from 'react';
import './TTT.css';
import Square from './Square.js';

class TTT extends Component {

  state = {
    turn: true, 
    boardpositions: [ " ", " ", " ", " ", " ", " ", " ", " ", " " ]
  };

  handleMove(indexclicked) { //indexclicked is whatever is fed to position attribute in <Square/>
    const {turn, boardpositions} = this.state //these variables are undefined until this line, figure out why i put this line in this method and never in the constructor
    boardpositions[indexclicked] = turn ? 'X' : 'O'; //this line causes <Square/>'s content attribute to change immediately
    this.setState({turn: !turn, boardpositions}, this.didWin()); //these variables don't get updated until after this function is complete(they will be changed once this.state at the beginning of this function is called again), boardpositions same as "boardpostions: boardposition"
  };

  didWin() {
    const {turn, boardpositions} = this.state;
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    var winner = ""
    if(turn) winner = "X"
    else winner = "O"
    for(const i=0; i<winConditions.length; i++) {
      if(boardpositions[winConditions[i][0]] === boardpositions[winConditions[i][1]] &&
        boardpositions[winConditions[i][1]] === boardpositions[winConditions[i][2]] &&
        boardpositions[winConditions[i][0]] != " ") {
        console.log(winner + " player won")
      }
    }
  }

  handleMove = this.handleMove.bind(this);
  didWin = this.didWin.bind(this);

  render() {
    const {boardpositions} = this.state
    const dimension = [0, 1, 2]
    const {boardset} = this.props
    var boardcontent;
    if (boardset) {
      boardcontent = dimension.map((item, i) => 
                      <tr>{dimension.map((item, j) => 
                        <td id="innerboard">
                          <Square 
                            position={3*i+j} 
                            myFunc={this.handleMove} 
                            content={boardpositions[3*i+j]}>
                          </Square>
                        </td>)}
                      </tr>)
    }
    else {
      boardcontent = dimension.map((item, i) => 
                      <tr>{dimension.map((item, j) => 
                        <td id="outerboard">
                          <TTT boardset={true} ></TTT>
                        </td>)}
                      </tr>)
    }
    //figure out how to defin keys, key={(3*i+j).objectID}

    return (
      <div>
        <table>
          <tbody>
            {boardcontent}
            {/*<tr>
              <td><Square 
                position={0} 
                myFunc={this.handleMove}
                //key={0}
                content={boardpositions[0]}>
              </Square></td>
              <td><Square 
                position={1} 
                myFunc={this.handleMove}
                //key={1}
                content={boardpositions[1]}>
              </Square></td>
              <td><Square 
                position={2} 
                myFunc={this.handleMove}
                //key={2}
                content={boardpositions[2]}>
              </Square></td>
            </tr>
            <tr>
              <td><Square 
                position={3} 
                myFunc={this.handleMove}
                key={3}
                content={boardpositions[3]}>
              </Square></td>
              <td><Square 
                position={4} 
                myFunc={this.handleMove}
                //key={4}
                content={boardpositions[4]}>
              </Square></td>
              <td><Square 
                position={5} 
                myFunc={this.handleMove}
                //key={5}
                content={boardpositions[5]}>
              </Square></td>
            </tr>
            <tr>
              <td><Square 
                position={6} 
                myFunc={this.handleMove}
                //key={6}
                content={boardpositions[6]}>
              </Square></td>
              <td><Square 
                position={7} 
                myFunc={this.handleMove}
                //key={7}
                content={boardpositions[7]}>
              </Square></td>
              <td><Square 
                position={8} 
                myFunc={this.handleMove}
                //key={8}
                content={boardpositions[8]}>
              </Square></td>
            </tr>
            */}
          </tbody>
        </table>
      </div>
    );
  };
    
}

export default TTT;