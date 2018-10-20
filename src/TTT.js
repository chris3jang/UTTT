import React, { Component } from 'react';
import './TTT.css';
import Square from './Square.js';

//class TTT extends Component {

const TTT = ({ isBoardSet, newGameHasStarted, tileHovered, availableBoard, 
      boardData, boardNumber, listenForMove, listenForHover, completeTransition, gameWon }) => {

    const largeTileWon = (isBoardSet ? (boardData[9][boardNumber] !== ' ') : null)


    const getWinID = () => {
      let temp, id = ""
      if(isBoardSet) temp = boardNumber
      else temp = 9
      for(let i = 0; i < 3; i++) {
        id += boardData[10][temp][i];
      }
      return id
    }

    const getWinEl = (id) => {
      const winDim = {
        "012": "M10 29 L152 29",
        "345": "M10 81 L152 81",
        "678": "M10 133 L152 133",
        "036": "M29 10 L29 152",
        "147": "M81 10 L81 152",
        "258": "M132 10 L132 152",
        "048": "M10 10 L152 152" ,
        "246": "M10 152 L152 10"
      };
      const cN = (isBoardSet ? "smallPath" : "bigPath") + (boardData[10][9].includes(tileHovered[0]) && gameWon ? " hidden" : "")
      let temp
      if(isBoardSet) temp = boardNumber
      else temp = 9
      if((boardData[9][temp] !== ' ' && temp !== 9) || (temp === 9 && gameWon)) {
        return <path d={winDim[id]} stroke="#000000" stroke-width="5" className={cN}></path>
      }
      else return
    }

    const getTileClassName = (r, s) => {
      let classnames = "";
      if(isBoardSet) classnames = "smallTile";
      else {
        classnames += "largeTile";
        if(tileHovered[0] === 3*r+s) classnames += " shadow"
      }
      return classnames;
    }

    const showBackgroundColor = (num) => {
      return (!gameWon && newGameHasStarted && ([num, 9].includes(availableBoard) || tileHovered[1] === num));
    }

    const getChangingClassName = (num, el) => {
      const options = {
        "tbl": ["innerTable", "innerTable visible instant", "innerTable hidden instant", "innerTable hidden outerTileWinTrans"],
        "wm": ["winMark", "winMark visible instant", "winMark hidden instant", "winMark hidden outerTileWinTrans"],
        "ibw": ["innerBoardWinner hidden", "innerBoardWinner hidden", "innerBoardWinner", "innerBoardWinner"]
      }
      if(boardData[11][num] === true) {
      //visible because its one of your current options
      //visible because it shows what will be the next options
      //visible because user hovers over it
        if((num === availableBoard 
          || (tileHovered[1] === num && !gameWon) 
          || tileHovered[0] === num)
          && !boardData[10][9].includes(availableBoard)) {
          return options[el][1]//getElOpts(el)[1]
        }
        else return options[el][2]//getElOpts(el)[2]

        }
      else if(boardData[11][num] === false) {//during the transition
        if(boardData[10][9].includes(availableBoard) && tileHovered[1] !== num) return options[el][2]//getElOpts(el)[2] //not sure this is relevant
        else return options[el][3]//getElOpts(el)[3]
      }
      else {
        if(num === tileHovered[0]) return options[el][1]//getElOpts(el)[1]
        else return options[el][0]//getElOpts(el)[0]
      }
    }

    const initTransition = (pos) => {
      if(completeTransition) completeTransition(pos)
    }

    const hoverOn = (number) => {
      if(newGameHasStarted) {
        if(isBoardSet) {
          if([boardNumber, 9].includes(availableBoard) && boardData[boardNumber][number] === ' ') {
            listenForHover(number, "innerhover")
          }
        }
        else {
          listenForHover(number, "outer")
        }
      }
    }

    const hoverOff = (number) => {
      if(newGameHasStarted) {
        if(isBoardSet) {
          if([boardNumber, 9].includes(availableBoard) && boardData[boardNumber][number] === ' ') {
            listenForHover(availableBoard, "innerout")
          }
        }
        else {
          listenForHover(9, "outer")
        }
      }
    }




    const renderBoard = (content) => {
      return (
        <div>
          <table className={!isBoardSet ? "outerTable" : getChangingClassName(boardNumber, "tbl")} 
            onTransitionEnd={()=>initTransition(boardNumber)}>
            <tbody>
              {[0, 1, 2].map((row) => 
                <tr>
                  {[0, 1, 2].map((space) =>
                    <td className={getTileClassName(row, space)} 
                      onMouseOver={()=>hoverOn(3*row+space)} 
                      onMouseOut={()=>hoverOff(3*row+space)}>
                        {content(row, space)}
                    </td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );
    }

    const createBoard = (r, s, isBoardSet) => {
      if(isBoardSet) {
        return (
          <Square
            position={[boardNumber, 3*r+s]} 
            listenForMove={listenForMove} 
            listenForHover={listenForHover}
            content={boardData[boardNumber][3*r+s]}
            availableBoard={availableBoard}
            newGameHasStarted={newGameHasStarted}
            gameWon={gameWon}>
          </Square>
        );
      }
      else {
        return (
          <div>
            <TTT
              isBoardSet={true}
              boardData={boardData}
              listenForMove={listenForMove}
              listenForHover={listenForHover}
              boardNumber={3*r+s}
              availableBoard={availableBoard}
              newGameHasStarted={newGameHasStarted}
              tileHovered={tileHovered}
              boardData={boardData}
              completeTransition={completeTransition}
              gameWon={gameWon}>
            </TTT>
            {boardData[9][3*r+s] !== ' ' && 
             <div className={getChangingClassName(3*r+s, "ibw")}>
               {(boardData[9][3*r+s])}
             </div>
            }
            <div className={(showBackgroundColor(3*r+s) ? "backgroundColor" : "")}></div>
          </div>
        );
      }
    }

    return (
      <div>
        <div className="board">{
          renderBoard((row, space) => 
            createBoard(row, space, isBoardSet)
          )}
        </div>
        {(!isBoardSet ? boardData[10][9] : boardData[10][boardNumber]) &&
          <div className={isBoardSet ? getChangingClassName(boardNumber, "wm") : "bigWinMark"}>
            <svg className={isBoardSet ? "svgclass" : "bigSvgClass"}>
              <g transform={"scale(" + (isBoardSet ? 1 : 3.1) + ")"}>
                {getWinEl(getWinID())}
              </g>
            </svg>
          </div>
        }
      </div>
      
    );
} 



export default TTT;