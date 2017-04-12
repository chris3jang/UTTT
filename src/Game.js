import React, { Component } from 'react';
import TTT from './TTT';
import './Game.css';

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
    ],
    outerboard: [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
    availableBoard: 9,
    allBoards: false,
	};

  componentWillReceiveProps() {
    const {newGameHasStarted} = this.props
    console.log("game newGameHasStarted: " + newGameHasStarted)
    if(newGameHasStarted) {
      this.setState({allBoards: true})
    }
  }

	handleMove(indexclicked) { //indexclicked is whatever is fed to position attribute in <Square/>
		const {turn, boardpositions, availableBoard, allBoards} = this.state //these variables are undefined until this line, figure out why i put this line in this method and never in the constructor
		boardpositions[indexclicked[0]][indexclicked[1]] = turn ? 'X' : 'O'; //this line causes <Square/>'s content attribute to change immediately
		this.setState({turn: !turn, boardpositions}, this.didWin(indexclicked)); //these variables don't get updated until after this function is complete(they will be changed once this.state at the beginning of this function is called again), boardpositions same as "boardpostions: boardposition"
    
    //magic box check
    var aB = false
    for(var i=0; i<9; i++) {
      if(boardpositions[indexclicked[1]][i] === " ") {
        break;
      }
      else if(i === 8) {
        aB = true
      }
    }
    this.setState({availableBoard: indexclicked[1], allBoards: aB})

  };



  didWin(indexclicked) {
    const {turn, boardpositions, outerboard} = this.state;
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

    //check for win in current box
    for(var i=0; i<8; i++) {
      if(boardpositions[indexclicked[0]][winConditions[i][0]] 
        === boardpositions[indexclicked[0]][winConditions[i][1]] 
        && boardpositions[indexclicked[0]][winConditions[i][1]] 
        === boardpositions[indexclicked[0]][winConditions[i][2]] 
        && boardpositions[indexclicked[0]][winConditions[i][1]] 
        !== " ") {
          console.log("won an inner box");
          outerboard[indexclicked[0]] = turn ? 'X' : '0';
          this.setState(outerboard, this.didWinOuter(indexclicked[0]))
          break;
        }
    }
  }

  //check for win on outer board only when an inner box is won
  didWinOuter(outerindexclicked) {
    const {outerboard} = this.state
    const winconditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for(var i=0; i<8; i++) {
      if(outerboard[winconditions[i][0]] === outerboard[winconditions[i][1]] &&
        outerboard[winconditions[i][1]] === outerboard[winconditions[i][2]] &&
        outerboard[winconditions[i][0]] !== " ") {
          this.setState({availableBoard: 9, allBoards: false})
          console.log("won an outerbox/the game")
        }
    }
  }

  handleMove = this.handleMove.bind(this);
  didWin = this.didWin.bind(this);
  //didWinInner = this.didWinInner.bind(this);
  didWinOuter = this.didWinOuter.bind(this);

  render() {
  	const {boardpositions, availableBoard, allBoards} = this.state
    console.log("allBoards: " + allBoards)
    return (
      <div id="Game">
      	<TTT 
      		boardset={false}
      		boardpositions={boardpositions}
      		myFunc={this.handleMove}
          availableBoard={availableBoard}
          allBoards={allBoards}>
      	</TTT>
      </div>
    );
  }
}

export default Game;
