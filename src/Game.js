import React, { Component } from 'react';
import TTT from './TTT';
import './Game.css';

class Game extends Component {

	state = {
		turn: null,
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
    playerJustWonInnerBox: false,
    playerJustWonGame: false,
	};

  isBoardBlank() {
    const {boardpositions} = this.state
    for(var i=0; i < 9; i++) {
      for(var j=0; j < 9; j++) {
        if(boardpositions[i][j] !== " ") {
          return false;
        }
      }
    }
    return true;
  }

  determineHeading() {
    const {turn, playerJustWonInnerBox, playerJustWonGame} = this.state
    var innerboxwinner = ""

    if(playerJustWonInnerBox) {
      innerboxwinner = (!turn ? "X" : "O") + " Player wins a board. "
      console.log(innerboxwinner)
    }

    if(playerJustWonGame) {
      return (!turn ? "X" : "O") + " wins the game!"
    }

    if(turn === null) {
      return "";
    }
    else if(turn) {
      return innerboxwinner + "X Player's turn"
    }
    else return innerboxwinner + "O Player's turn"
  }

  componentWillReceiveProps(nextProps) {
    const {newGameHasStarted} = nextProps
    if(newGameHasStarted && this.isBoardBlank()) {
      this.setState({turn: true, allBoards: true})
    }
  }


	handleMove(squareClicked) { //squareClicked is whatever is fed to position attribute in <Square/>
		const {turn, boardpositions, availableBoard, allBoards} = this.state //these variables are undefined until this line, figure out why i put this line in this method and never in the constructor
		boardpositions[squareClicked[0]][squareClicked[1]] = turn ? 'X' : 'O'; //this line causes <Square/>'s content attribute to change immediately
		this.setState({turn: !turn, boardpositions}, this.didWin(squareClicked)); //these variables don't get updated until after this function is complete(they will be changed once this.state at the beginning of this function is called again), boardpositions same as "boardpostions: boardposition"
    
    //magic box check
    var aB = false
    for(var i=0; i<9; i++) {
      if(boardpositions[squareClicked[1]][i] === " ") {
        break;
      }
      else if(i === 8) {
        aB = true
      }
    }

    this.setState({availableBoard: squareClicked[1], allBoards: aB})

  };



  didWin(squareClicked) {
    const {turn, boardpositions, outerboard, playerJustWonInnerBox} = this.state;
    const {gameSettings} = this.props
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
      if(boardpositions[squareClicked[0]][winConditions[i][0]] 
        === boardpositions[squareClicked[0]][winConditions[i][1]] 
        && boardpositions[squareClicked[0]][winConditions[i][1]] 
        === boardpositions[squareClicked[0]][winConditions[i][2]] 
        && boardpositions[squareClicked[0]][winConditions[i][1]] 
        !== " ") {
          console.log("won an inner box");
          if(outerboard[squareClicked[0]] === ' ') {
            this.setState({playerJustWonInnerBox: true})
          }
          else {
            this.setState({playerJustWonInnerBox: false})
          }
          if(outerboard[squareClicked[0]] === " ") {
            outerboard[squareClicked[0]] = turn ? 'X' : '0';
          }
          this.setState(outerboard)
          if(gameSettings === "three") {
            this.didWinOuter(squareClicked[0])
          }
          if(gameSettings === "one") {
            this.wonGame();
          }
          break;
        }
      this.setState({playerJustWonInnerBox: false})
    }

    //this.setState({playerJustWonInnerBox: false})

  }

  //check for win on outer board only when an inner box is won
  didWinOuter(outersquareClicked) {
    const {outerboard, playerJustWonGame, availableBoard, allBoards} = this.state
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
          this.wonGame();
          console.log("won an outerbox/the game")
          break;
        }
    }
  }

  wonGame() {
    const {availableBoard, allBoards, playerJustWonGame} = this.state
    this.setState({availableBoard: 9, allBoards: false, playerJustWonGame: true})
  }

  isBoardBlank = this.isBoardBlank.bind(this);
te
  handleMove = this.handleMove.bind(this);
  didWin = this.didWin.bind(this);
  //didWinInner = this.didWinInner.bind(this);
  didWinOuter = this.didWinOuter.bind(this);
  wonGame = this.wonGame.bind(this);

  render() {
  	const {boardpositions, availableBoard, allBoards, outerboard, turn} = this.state
    console.log("allBoards: " + allBoards)
    return (
      <div id="Game">
        <h2>{this.determineHeading()}</h2>
      	<TTT 
      		boardset={false}
      		boardpositions={boardpositions}
      		myFunc={this.handleMove}
          availableBoard={availableBoard}
          allBoards={allBoards}
          outerboard={outerboard}>
      	</TTT>
      </div>
    );
  }
}

export default Game;
