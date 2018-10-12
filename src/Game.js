import React, { Component } from 'react';
import TTT from './TTT';
import './Game.css';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');

class Game extends Component {

  state = this.getInitialState();

  getInitialState() {
    return ({
      turn: null,

      /*
        boardData[0-8]: inner board positions
        boardData[9]: outer board positions
        boardData[10]: victory mark IDs
        boardData[11]: is victory mark transition complete
      */
      boardData: [
        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
        [ null, null, null, null, null, null, null, null, null ] //check if [9] is the same thing
      ],
      boardPositions: [
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
      winIDs: [ " ", " ", " ", " ", " ", " ", " ", " ", " ", " " ],
      availableBoard: 9,
      waitingForTurn: null,
      nextPotentialBoard: [null, null],
      gameWon: false,
      victoryMessage: false
    });
  };

  componentWillReceiveProps(nextProps) {
    if(this.props.newGameHasStarted != nextProps.newGameHasStarted) {
      if(nextProps.newGameHasStarted) {
        this.setState({turn: '✕', availableBoard: 9});
      }
      else {
        this.setState(this.getInitialState());
      }
    }
    if(this.props.player != nextProps.player) {
      if(nextProps.player == 1) {
        this.setState({waitingForTurn: false, room: this.props.roomID});
      }
      if(nextProps.player == 2) {
        this.setState({waitingForTurn: true, room: this.props.roomID});
      }
    }
    if(this.props.turnPlayedData != nextProps.turnPlayedData) {
      const move = nextProps.turnPlayedData.tile;
      const lastMoveSpace = this.state.boardPositions[move[0]][move[1]];
      if(lastMoveSpace != this.state.turn && lastMoveSpace === ' ') {
        this.handleOnlineMove(nextProps.turnPlayedData.tile);
      }
    }
  };

  checkForMagicBox(board) {
    for(var i=0; i<9; i++) {
      if(this.state.boardPositions[board][i] === " ") {
        return false;
      }
      else if(i === 8) {
        return true;
      }
    }
  };

  handleMove(squareClicked) {
    if(!this.state.waitingForTurn) {
      this.markMove(squareClicked);
      if(this.props.roomID) {
        this.setState({waitingForTurn: true});
        socket.emit('playTurn', { tile: squareClicked, room: this.props.roomID });
      }
    } 
  };

  handleOnlineMove(squareClicked) {
    this.markMove(squareClicked)
    if(this.state.waitingForTurn) {
      this.setState({waitingForTurn: false})
    }
  };

  markMove(squareClicked) {
    let won;
    const {turn, boardPositions, availableBoard} = this.state;
    const outerboard = squareClicked[0], innerboard = squareClicked[1], currentBoard = boardPositions[outerboard];
    boardPositions[outerboard][innerboard] = turn;
    this.setState({turn: (turn === '✕' ? '◯' : '✕'), boardPositions});
    if(boardPositions[9][outerboard] === ' ') {
      this.didWin(currentBoard, squareClicked);
      won = this.didWinGame(squareClicked);
    }

    let next;
    if(this.checkForMagicBox(innerboard)) next = 9;
    else next = innerboard;

    console.log("eyoooo", this.state.gameWon)
    if(won) next = 9
    this.setState({availableBoard: next}, console.log("EOIHS", this.state.availableBoard));
  }

  didWinBoard(board) {
    const winConditions = [ 
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
    ];
    for(let i=0; i<8; i++) {
      if(board[winConditions[i][1]] !== " " &&
        board[winConditions[i][0]] === board[winConditions[i][1]] && 
        board[winConditions[i][1]] === board[winConditions[i][2]]) {
        return winConditions[i];
      }
    }
    return false;
  };

  markWin(boardNum, winCondition) {
    let updatedWins = this.state.winIDs;
    let id = "";
    for(let i = 0; i < 3; i++) {
      id += winCondition[i];
    }
    updatedWins[boardNum] = id;
    this.setState({winIDs: updatedWins});
  }

  didWin(board, squareClicked) {
    const {turn, boardPositions} = this.state;
    const mark = this.didWinBoard(board), outerboard = squareClicked[0];
    if(mark) {
      //this.markWin(outerboard, mark);
      //
      let updatedWins = this.state.winIDs;
      updatedWins[outerboard] = mark
      this.setState({winIDs: updatedWins})
      //
      console.log("won an inner box");
      if(boardPositions[9][outerboard]) {
        boardPositions[9][outerboard] = turn;

        this.state.boardData[11][outerboard] = false;
        console.log("transition state set in Game, transition begins")
      }
      if(this.props.gameSettings === "one") {
        //this.wonGame();
      }
    }
  }

  didWinGame(squareClicked) {
    const mark = this.didWinBoard(this.state.boardPositions[9])
    if(mark){
      //this.markWin(9, mark)
      //
      let updatedWins = this.state.winIDs;
      updatedWins[9] = mark
      this.setState({winIDs: updatedWins})

      let finalTransition = this.state.boardData
      finalTransition[11][squareClicked[0]] = true
      //
      console.log("WON", this.state.turn)
      this.setState({gameWon: true, victoryMessage: true, boardData: finalTransition}, ()=>console.log(this.state.availableBoard));
      return true;
    }
    else return false;
  };

  handleHover(squareHovered, action) {
    console.log("handleHover", squareHovered, action)
    let temp = this.state.nextPotentialBoard
    if(action === "outer") {
      temp[0] = squareHovered
    }
    if(action === "innerhover" || action === "innerout") {
      temp[1] = squareHovered
    }
    
    this.setState({nextPotentialBoard: temp})
    /*
    if(action === "innerout") this.completeTransition(squareHovered)
      */
  }

  completeTransition(pos) {
    if(this.props.newGameHasStarted) {
      let editedBoardData = this.state.boardData;
      editedBoardData[11][pos] = true;
      this.setState({boardData: editedBoardData});
    }
  }

  removeVictoryMessage() {
    this.setState({victoryMessage: false})
  }

  render() {
    const {turn, boardPositions, availableBoard, winIDs, nextPotentialBoard, gameWon} = this.state;
    const {player, newGameHasStarted} = this.props;

    const getTurnClassName = (side) => {
      let className = "turn" + side;
      if((turn === '✕' && side === 'Left') || (turn === '◯' && side === 'Right')) {
        className += "Current";
      }
      else className += "Next"
      if((player === 1 && side === 'Right') || (player === 2 && side === 'Left')) {
        className += " onlineOpponent";
      }
      return className;
    }

    return (
      <div className="game">
        <div className={newGameHasStarted && !gameWon ? "counterContainer" : "gameNotInPlay"}>
          <div className={getTurnClassName('Left')}>✕</div>
          <div className={getTurnClassName('Right')}>◯</div>
        </div>
        <div className={"victoryContainer"}>
          <div className={this.state.victoryMessage ? "victoryMessage": "victoryEmpty"} onClick={this.removeVictoryMessage.bind(this)}>YOU WON</div>
        </div>
        <TTT 
          newGameHasStarted={newGameHasStarted}
          isBoardSet={false}
          boardPositions={boardPositions}
          boardData={this.state.boardData}
          completeTransition={this.completeTransition.bind(this)}
          listenForMove={this.handleMove.bind(this)}
          listenForHover={this.handleHover.bind(this)}
          availableBoard={availableBoard}
          winIDs={winIDs}
          nextPotentialBoard={nextPotentialBoard}
          gameWon={gameWon}>
        </TTT>
      </div>
    );
  }
}

export default Game;
