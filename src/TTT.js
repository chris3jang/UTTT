import React, { Component } from 'react';
import './css/TTT.css';
import Square from './Square.js';
import WinMark from './WinMark.js'

//class TTT extends Component {

const TTT = ({ isBoardSet, isGameActive, tileHovered, availableBoard, 
      boardData, boardNumber, listenForMove, listenForHover, completeTransition, gameWon }) => {

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
      return (!gameWon && isGameActive && ([num, 9].includes(availableBoard) || tileHovered[1] === num));
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
      if(isGameActive) {
        if(isBoardSet) {
          if([boardNumber, 9].includes(availableBoard) && boardData[boardNumber][number] === ' ') {
            listenForHover(number, "inner")
          }
        }
        else {
          listenForHover(number, "outer")
        }
      }
    }

    const hoverOff = (number) => {
      if(isGameActive) {
        if(isBoardSet) {
          if([boardNumber, 9].includes(availableBoard) && boardData[boardNumber][number] === ' ') {
            listenForHover(availableBoard, "inner")
          }
        }
        else {
          listenForHover(9, "outer")
        }
      }
    }

    const isBoardActive = (num) => {
      return ((availableBoard === boardNumber || availableBoard === 9 ) && boardData[boardNumber][num] === ' ' && isGameActive && !gameWon);
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
            content={boardData[boardNumber][3*r+s]}
            isActive={isBoardActive(3*r+s)}>
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
              isGameActive={isGameActive}
              tileHovered={tileHovered}
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
        <WinMark
          isBoardSet={isBoardSet}
          boardWinner={boardData[9][boardNumber]} 
          finalBoardWinPositions={boardData[10][9]}
          winID={boardData[10][(isBoardSet ? boardNumber : 9)].join('').toString()}
          tileHovered={tileHovered}  
          changedClassName={getChangingClassName(boardNumber, "wm")}>
        </WinMark>
      </div>
      
    );
} 



export default TTT;