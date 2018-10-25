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
        [ " ", " ", " ", " ", " ", " ", " ", " ", " ", " " ],
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
    if(nextProps.exitGame) {
      this.setState({gameWon: true})
    }
    if(this.props.newGameHasStarted != nextProps.newGameHasStarted) {
      if(nextProps.newGameHasStarted) {
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
      console.log("HERE", this.props.playerNum, nextProps.playerNum)
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
    for(var i=0; i<9; i++) {
      if(this.state.boardData[board][i] === " ") {
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
      let temp = this.state.tileHovered
      temp[1] = 9
      this.setState({waitingForTurn: false, tileHovered: temp})
    }
  };

  markMove(squareClicked) {
    let won;
    const {turn, boardData, availableBoard} = this.state;
    const outerboard = squareClicked[0], innerboard = squareClicked[1], currentBoard = boardData[outerboard];
    boardData[outerboard][innerboard] = turn;
    this.setState({turn: (turn === '✕' ? '◯' : '✕'), boardData});
    if(boardData[9][outerboard] === ' ') {
      this.didWin(currentBoard, squareClicked);
      won = this.didWinGame(squareClicked);
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

  markWin(boardNum, winCondition) {
    let updatedWins = this.state.boardData;
    let id = "";
    for(let i = 0; i < 3; i++) {
      id += winCondition[i];
    }
    updatedWins[10][boardNum] = id;
    this.setState({boardData: updatedWins});
  }

  didWin(board, squareClicked) {
    const {turn, boardData} = this.state;
    const mark = this.didWinBoard(board), outerboard = squareClicked[0];
    if(mark) {
      //this.markWin(outerboard, mark);
      //
      let updatedWins = this.state.boardData;
      updatedWins[10][outerboard] = mark
      this.setState({boardData: updatedWins})
      //
      if(boardData[9][outerboard]) {
        boardData[9][outerboard] = turn;

        this.state.boardData[11][outerboard] = false;
      }
      if(this.props.gameSettings === "one") {
        //this.wonGame();
      }
    }
  }

  didWinGame(squareClicked) {
    const mark = this.didWinBoard(this.state.boardData[9])
    if(mark){
      let updatedWins = this.state.boardData;
      updatedWins[10][9] = mark
      this.setState({boardData: updatedWins})

      let finalTransition = this.state.boardData
      finalTransition[11][squareClicked[0]] = true
      this.setState({gameWon: true, message: "YOU WON", boardData: finalTransition});
      return true;
    }
    else return false;
  };

  handleHover(squareHovered, action) {
    let temp = this.state.tileHovered
    if(action === "outer") {
      temp[0] = squareHovered
    }
    if(action === "innerhover" || action === "innerout") {
      if(this.props.roomID !== null && this.state.waitingForTurn){
        temp[1] = 9
      }
      else temp[1] = squareHovered
    }
    
    this.setState({tileHovered: temp})
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
    this.setState({message: null})
  }

  render() {
    const {turn, boardData, availableBoard, winIDs, tileHovered, gameWon} = this.state;
    const {player, newGameHasStarted} = this.props;

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
        <div className={newGameHasStarted && !gameWon ? "counterContainer" : "gameNotInPlay"}>
          <div className={"nameContainer" + (this.props.roomID === null ? " removed" : "")}>
            <div className={"left"}>{this.props.player ? (this.props.player[0] === 1 ? this.props.player[1] : (this.props.player[0] === 2 ? this.props.player[2] : null)) : null}</div>
            <div className={"right"}>{this.props.player ? (this.props.player[0] === 1 ? this.props.player[2] : (this.props.player[0] === 2 ? this.props.player[1] : null)) : null}</div>
          </div>
          <div className={getTurnClassName('Left')}>✕</div>
          <div className={getTurnClassName('Right')}>◯</div>
        </div>
        <div className={"messageContainer"}>
          <div className={this.state.message ? "messageVisible": "messageHidden"} onClick={this.removeVictoryMessage.bind(this)}>{this.state.message}</div>
        </div>
        <TTT 
          newGameHasStarted={newGameHasStarted}
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
