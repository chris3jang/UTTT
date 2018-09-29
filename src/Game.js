import React, { Component } from 'react';
import TTT from './TTT';
import './Game.css';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');

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
      [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
      [ " ", " ", " ", " ", " ", " ", " ", " ", " " ]
    ],
    markedWins: [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
    availableBoard: 9,
    waitingForTurn: null,
    nextBoardOnHover: null
	};

  componentWillReceiveProps(nextProps) {
    const {newGameHasStarted} = nextProps
    if(newGameHasStarted && newGameHasStarted != this.props.newGameHasStarted && this.props.newGameHasStarted != nextProps.newGameHasStarted) {
      this.setState({turn: '✕', availableBoard: 9})
    }
    if(nextProps.player == 1 || nextProps.player == 2) {
      console.log("PLAYER NUMBER SELECTED") 
      if(nextProps.player == 1 && nextProps.player != this.props.player) {
        this.setState({waitingForTurn: false, room: this.props.roomID})
      }
      if(nextProps.player == 2 && nextProps.player != this.props.player) {
        this.setState({waitingForTurn: true, room: this.props.roomID}) 
      }
    }
    if(this.props.turnPlayedData != nextProps.turnPlayedData) {

      const move = nextProps.turnPlayedData.tile
      if(this.state.boardpositions[move[0]][move[1]] != ((this.state.turn === '✕' && this.state.turn !== null) ? '✕' : '◯')) {
        this.handleOnlineOpponentsMove(nextProps.turnPlayedData.tile)
      }
      //this.setState({waitingForTurn: false})
    }
    if(!newGameHasStarted) {
      this.setState({boardpositions: [
        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
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
      markedWins: [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
      availableBoard: 9,
      nextBoardOnHover: null,
      turn: null
      })
    }
  }


	handleMove(squareClicked) { //squareClicked is whatever is fed to position attribute in <Square/>
    console.log("squareClicked")
    if(this.props.roomID == null) this.handleLocalMove(squareClicked)
    if(this.props.roomID && !this.state.waitingForTurn) this.handleOnlineMove(squareClicked)
  };






  //******************************************************************************************************

  handleLocalMove(squareClicked) { //squareClicked is whatever is fed to position attribute in <Square/>
    const {turn, boardpositions, availableBoard} = this.state //these variables are undefined until this line, figure out why i put this line in this method and never in the constructor
    boardpositions[squareClicked[0]][squareClicked[1]] = ((turn === '✕' && turn !== null) ? '✕' : '◯'); //this line causes <Square/>'s content attribute to change immediately
    const currentBoard = boardpositions[squareClicked[0]]
    this.setState({turn: ((turn === '✕' && turn !== null) ? '◯' : '✕'), boardpositions}); //these variables don't get updated until after this function is complete(they will be changed once this.state at the beginning of this function is called again), boardpositions same as "boardpostions: boardposition"
    if(this.state.boardpositions[9][squareClicked[0]] === ' ') this.didWin(currentBoard, squareClicked)

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

    let next
    if(aB) next = 9
    else next = squareClicked[1]

    this.setState({availableBoard: next})

  };

  handleOnlineMove(squareClicked) {
    console.log("CURRENT PLAYERS MOVE")
    const {turn, boardpositions, availableBoard} = this.state //these variables are undefined until this line, figure out why i put this line in this method and never in the constructor
    boardpositions[squareClicked[0]][squareClicked[1]] = ((turn === '✕' && turn !== null) ? '✕' : '◯'); //this line causes <Square/>'s content attribute to change immediately
    const currentBoard = boardpositions[squareClicked[0]]
    this.setState({boardpositions}); //these variables don't get updated until after this function is complete(they will be changed once this.state at the beginning of this function is called again), boardpositions same as "boardpostions: boardposition"
    if(this.state.boardpositions[9][squareClicked[0]] === ' ') this.didWin(currentBoard, squareClicked)


    //magic box check
    let aB = false
    for(var i=0; i<9; i++) {
      if(boardpositions[squareClicked[1]][i] === " ") {
        break;
      }
      else if(i === 8) {
        aB = true
      }
    }

    let next
    if(aB) next = 9
    else next = squareClicked[1]

    this.setState({availableBoard: next})
    this.setState({turn: ((turn === '✕' && turn !== null) ? '✕' : '◯')})
    this.setState({waitingForTurn: true})
    socket.emit('playTurn', { tile: squareClicked, room: this.props.roomID })

  }


  handleOnlineOpponentsMove(squareClicked) {
    console.log("OPPO MOVE")
    const {turn, boardpositions, availableBoard, allBoards} = this.state //these variables are undefined until this line, figure out why i put this line in this method and never in the constructor
    boardpositions[squareClicked[0]][squareClicked[1]] = ((turn === '✕' && turn !== null) ? '◯' : '✕'); //this line causes <Square/>'s content attribute to change immediately
    const currentBoard = boardpositions[squareClicked[0]]
    this.setState({boardpositions}); //these variables don't get updated until after this function is complete(they will be changed once this.state at the beginning of this function is called again), boardpositions same as "boardpostions: boardposition"
    if(this.state.boardpositions[9][squareClicked[0]] === ' ') this.didWin(currentBoard, squareClicked)

    //magic box check
    let aB = false
    for(var i=0; i<9; i++) {
      if(boardpositions[squareClicked[1]][i] === " ") {
        break;
      }
      else if(i === 8) {
        aB = true
      }
    }

    let next
    if(aB) next = 9
    else next = squareClicked[1]

    this.setState({availableBoard: next, waitingForTurn: false})
  }


  //***********************************************************************************************************************








  //***********************************************************************************************************************


  didWinBoard(board) {
    const winConditions = [ 
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
    ];
    for(let i=0; i<8; i++) {
      if(board[winConditions[i][0]] === board[winConditions[i][1]] && 
        board[winConditions[i][1]] === board[winConditions[i][2]] && 
        board[winConditions[i][1]] !== " ") {
        return winConditions[i]
      }
    }
    return false
  }

  markWin(boardNum, winCondition) {
    let updatedWins = this.state.markedWins
    let id = ""
    for(let i = 0; i < 3; i++) {
      id += winCondition[i]
    }
    updatedWins[boardNum] = id
    this.setState({markedWins: updatedWins})
  }

  didWin(board, squareClicked) {
    const {turn, boardpositions} = this.state;
    const {gameSettings} = this.props
    const mark = this.didWinBoard(board)
    if(mark) {
      this.markWin(squareClicked[0], mark)
      console.log("won an inner box");

      //online logic involved
      if(boardpositions[9][squareClicked[0]]) {
        //click square
        
        boardpositions[9][squareClicked[0]] = !this.props.roomID ? ((turn === '✕' && turn !== null) ? '✕' : '◯') : (!this.state.waitingForTurn ? ((turn === '✕' && turn !== null) ? '✕' : '◯') : ((turn === '✕' && turn !== null) ? '◯' : '✕'));
      }

      if(gameSettings === "one") {
        this.wonGame();
      }
      else this.didWinGame();

    }

  }

  //check for win on outer board only when an inner box is won
  didWinGame() {
    console.log("didWinGame()")
    if( this.didWinBoard(this.state.boardpositions[9]) ) {
        this.wonGame();
      }
  }
  

  wonGame() {
    const {availableBoard} = this.state
    console.log("WON")
    this.setState({availableBoard: 9})
  }

  

  handleHover(squareHovered) {
    console.log("hovered")
    console.log(squareHovered)
    this.setState({nextBoardOnHover: squareHovered})
  }

  //***********************************************************************************************************************





  handleMove = this.handleMove.bind(this);
  didWin = this.didWin.bind(this);
  wonGame = this.wonGame.bind(this);

  handleOnlineOpponentsMove = this.handleOnlineOpponentsMove.bind(this)

  render() {
  	const {boardpositions, availableBoard, turn} = this.state
    return (
      <div className="game">
        <div className={this.props.newGameHasStarted ? "counterContainer" : "gameNotInPlay"}>
          <div id={"xturnbox"} className={(this.state.turn === '✕' ? "currentTurnLeft" : "turnCounterLeft") + ((this.props.roomID && this.state.turn) === '✕' ? " onlineOpponent" : "")}>✕</div>
          <div id={"oturnbox"} className={(this.state.turn === '◯' ? "currentTurnRight" : "turnCounterRight") + ((this.props.roomID && this.state.turn) === '◯' ? " onlineOpponent" : "")}>◯</div>
        </div>
      	<TTT 
      		boardset={false}
      		boardpositions={boardpositions}
      		myFunc={this.handleMove}
          myFuncTwo={this.handleHover.bind(this)}
          availableBoard={availableBoard}
          winIDs={this.state.markedWins}
          nextBoard={this.state.nextBoardOnHover}
          newGameHasStarted={this.props.newGameHasStarted}>
      	</TTT>
      </div>
    );
  }
}

export default Game;
