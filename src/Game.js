import React, { Component } from 'react';
import TTT from './TTT';

class Game extends Component {

	state = {
		turn: true,
		boardpositions: [
      [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
      [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
      [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
      [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
      [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
      [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
      [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
      [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
      [ " ", " ", " ", " ", " ", " ", " ", " ", " " ]
    ]
    
	};

	handleMove(indexclicked) { //indexclicked is whatever is fed to position attribute in <Square/>
		const {turn, boardpositions} = this.state //these variables are undefined until this line, figure out why i put this line in this method and never in the constructor
		boardpositions[indexclicked[0]][indexclicked[1]] = turn ? 'X' : 'O'; //this line causes <Square/>'s content attribute to change immediately
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
    return (
      <div>
      	<TTT 
      		boardset={false}
      		boardpositions={boardpositions}
      		myFunc={this.handleMove}>
      	</TTT>
      </div>
    );
  }
}

export default Game;
