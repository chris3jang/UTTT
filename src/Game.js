import React, { Component } from 'react';
import TTT from './TTT';
import TurnCounter from './TurnCounter.js';
import './css/Game.css';

import openSocket from 'socket.io-client';
const socket = openSocket('https://ulttitato.herokuapp.com/');

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
        [ [], [], [], [], [], [], [], [], [], [] ],
        [ null, null, null, null, null, null, null, null, null ] //check if [9] is the same thing
      ],
      availableBoard: 9,
      waitingForTurn: null,
      tileHovered: [null, null],
      gameWon: false,
      message: null
    });
  };

  componentWillReceiveProps(nextProps) {
    if(this.props.isGameActive != nextProps.isGameActive) {
      if(nextProps.isGameActive) {
        this.setState({turn: '✕', availableBoard: 9});
      }
      else {
        this.setState(this.getInitialState());
      }
    }
    if(this.props.player != nextProps.player && nextProps.player !== null) {
      if(nextProps.player[0] == 1) {
        this.setState({waitingForTurn: false, room: this.props.roomID});
      }
      if(nextProps.player[0] == 2) {
        this.setState({waitingForTurn: true, room: this.props.roomID});
      }
    }
    if(this.props.playerNum !== nextProps.playerNum) {
      if(nextProps.playerNum === 1) {
        this.setState({waitingForTurn: false, room: this.props.roomID});
      }
      if(nextProps.playerNum === 2) {
        this.setState({waitingForTurn: true, room: this.props.roomID});
      }
    }
    if(this.props.turnPlayedData !== nextProps.turnPlayedData && nextProps.turnPlayedData !== null) {
      const move = nextProps.turnPlayedData;
      const lastMoveSpace = this.state.boardData[move[0]][move[1]];
      if(lastMoveSpace != this.state.turn && lastMoveSpace === ' ') {
        this.handleOnlineMove(nextProps.turnPlayedData);
      }
    }
  };

  checkForMagicBox(board) {
    for(let i=0; i<9; i++) {
      if(this.state.boardData[board][i] === " ") {
        return false;
      }
    }
    return true;
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
      let temp = this.state.tileHovered
      temp[1] = 9
      this.setState({waitingForTurn: false, tileHovered: temp})
    }
  };

  markMove(squareClicked) {
    let won;
    const {turn, boardData, availableBoard} = this.state;
    const outerboard = squareClicked[0], innerboard = squareClicked[1], currentBoard = boardData[outerboard];
    const currentTurn = turn

    boardData[outerboard][innerboard] = turn;
    this.setState({turn: (turn === '✕' ? '◯' : '✕'), boardData});
    
    if(boardData[9][outerboard] === ' ') {
      this.didWin(currentBoard, squareClicked, currentTurn);
      won = this.didWinGame(squareClicked, currentTurn);
    }

    let next;
    if(this.checkForMagicBox(innerboard)) next = 9;
    else next = innerboard;

    if(won) next = 9
    this.setState({availableBoard: next});
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

  didWin(board, squareClicked, currentTurn) {
    const {turn, boardData} = this.state;
    const mark = this.didWinBoard(board), outerboard = squareClicked[0];
    if(mark) {
      let updatedBoard = this.state.boardData;
      updatedBoard[10][outerboard] = mark
      this.setState({boardData: updatedBoard})
      //
      if(boardData[9][outerboard]) {
        console.log(currentTurn)
        updatedBoard[9][outerboard] = currentTurn;

        updatedBoard[11][outerboard] = false;
        this.setState({boardData: updatedBoard})

      }
      if(this.props.gameSettings === "one") {
        //this.wonGame();
      }
    }
  }

  didWinGame(squareClicked, currentTurn) {
    const mark = this.didWinBoard(this.state.boardData[9])
    if(mark){
      let updatedWins = this.state.boardData;
      updatedWins[10][9] = mark
      this.setState({boardData: updatedWins})

      let finalTransition = this.state.boardData
      finalTransition[11][squareClicked[0]] = true
      this.setState({gameWon: true, message: currentTurn + " WINS", boardData: finalTransition});
      return true;
    }
    else return false;
  };

  handleHover(squareHovered, action) {
    let temp = this.state.tileHovered
    if(action === "outer") {
      temp[0] = squareHovered
    }
    if(action === "inner") {
      if(this.props.roomID !== null && this.state.waitingForTurn){
        temp[1] = 9
      }
      else temp[1] = squareHovered
    }
    this.setState({tileHovered: temp})
  }

  completeTransition(pos) {
    if(this.props.isGameActive) {
      let editedBoardData = this.state.boardData;
      editedBoardData[11][pos] = true;
      this.setState({boardData: editedBoardData});
    }
  }

  removeVictoryMessage() {
    this.setState({message: null})
  }

  render() {
    const {turn, boardData, availableBoard, winIDs, tileHovered, gameWon} = this.state;
    const {player, isGameActive} = this.props;

    const getTurnClassName = (side) => {
      let className = "turn" + side;
      if((turn === '✕' && side === 'Left') || (turn === '◯' && side === 'Right')) {
        className += "Current";
      }
      else className += "Next"
      if(player !== null) {
        if((player[0] === 1 && side === 'Right') || (player[0] === 2 && side === 'Left')) {
          className += " onlineOpponent";
        }
      }
      return className;
    }

    return (
      <div className="game">
        <TurnCounter
          isGameActive={isGameActive}
          gameWon={gameWon}
          roomID={this.props.roomID}
          player={this.props.player}
          left={getTurnClassName('Left')}
          right={getTurnClassName('Right')}>
        </TurnCounter>
        <div className={"messageContainer"}>
          <div className={this.state.message ? "messageVisible": "messageHidden"} onClick={this.removeVictoryMessage.bind(this)}>{this.state.message}</div>
        </div>
        <TTT 
          isGameActive={isGameActive}
          isBoardSet={false}
          boardData={this.state.boardData}
          completeTransition={this.completeTransition.bind(this)}
          listenForMove={this.handleMove.bind(this)}
          listenForHover={this.handleHover.bind(this)}
          availableBoard={availableBoard}
          tileHovered={tileHovered}
          gameWon={this.state.gameWon}>
        </TTT>
      </div>
    );
  }
}

export default Game;
