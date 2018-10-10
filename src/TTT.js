import React, { Component } from 'react';
import './TTT.css';
import Square from './Square.js';

//class TTT extends Component {

const TTT = ({ boardData, isBoardSet, newGameHasStarted, nextPotentialBoard, availableBoard, 
      boardPositions, boardNumber, listenForMove, listenForHover, winIDs, completeTransition }) => {

  //render() {
    /*
    const { boardData, isBoardSet, newGameHasStarted, nextPotentialBoard, availableBoard, 
      boardPositions, boardNumber, listenForMove, listenForHover, winIDs, completeTransition 
    } = this.props; */

    const largeTileWon = (isBoardSet ? (boardPositions[9][boardNumber] !== ' ') : null)

    const wins = {
      "012": <path d="M10 31 L152 31" stroke="#000000" stroke-width="5" className={isBoardSet ? "smallPath" : "bigPath"} id={"012"}></path>,
      "345": <path d="M10 81 L152 81" stroke="#000000" stroke-width="5" className={isBoardSet ? "smallPath" : "bigPath"} id={"345"}></path>,
      "678": <path d="M10 131 L152 131" stroke="#000000" stroke-width="5" className={isBoardSet ? "smallPath" : "bigPath"} id={"678"}></path>,
      "036": <path d="M31 10 L31 152" stroke="#000000" stroke-width="5" className={isBoardSet ? "smallPath" : "bigPath"} id={"036"}></path>,
      "147": <path d="M81 10 L81 152" stroke="#000000" stroke-width="5" className={isBoardSet ? "smallPath" : "bigPath"} id={"147"}></path>,
      "258": <path d="M131 10 L131 152" stroke="#000000" stroke-width="5" className={isBoardSet ? "smallPath" : "bigPath"} id={"258"}></path>,
      "048": <path d="M10 10 L152 152"  stroke="#000000" stroke-width="5" className={isBoardSet ? "smallPath" : "bigPath"} id={"048"}></path>,
      "246": <path d="M152 10 L10 152" stroke="#000000" stroke-width="5" className={isBoardSet ? "smallPath" : "bigPath"} id={"246"}></path>
    };

    const getTdClassNames = (r, s) => {
      let classnames = "";
      if(isBoardSet) classnames = "innerboard";
      else {
        classnames += "outerboard";
        //if(newGameHasStarted) classnames += " outerboardHover";
        if(nextPotentialBoard[0] === 3*r+s) classnames += " outerboardShadow"
        if(3*r+s===availableBoard) classnames += " bold";
        else if(nextPotentialBoard[1] === 3*r+s) classnames += " nextBoard";
        else if(availableBoard === 9 && newGameHasStarted) classnames += " bold";
      }
      return classnames;
    }

    const getSmallTableClass = () => {
      if(boardData[11][boardNumber] === true) {
        if(boardNumber === availableBoard) return "smallTableWonNoTransHover";
        if(nextPotentialBoard[1] === boardNumber) return "smallTableWonNoTransHover";
        if(nextPotentialBoard[0] === boardNumber) return "smallTableWonNoTransHover";
        if(nextPotentialBoard[0] !== boardNumber) return "smallTableWonNoTransOff"
      }
      else if(boardData[11][boardNumber] === false) {
        if(nextPotentialBoard[1] === boardNumber) return "smallTableWonNoTransHover"
        else return "smallTableWon"
      }
      else {
        if(boardNumber === nextPotentialBoard[0]) return "smallTableNext"
        if(!largeTileWon) return "smallTable"
      }
    };

    const getWinMarkClass = (num) => {
      if(boardData[11][num] === true) {
        if(num === availableBoard) return "winMarkNoTransHover";
        if(nextPotentialBoard[1] === num) return "winMarkNoTransHover"
        if(nextPotentialBoard[0] === num) return "winMarkNoTransHover";
        if(nextPotentialBoard[0] !== num) return "winMarkNoTransOff"
      }
      else if(boardData[11][num] === false) {
        if(nextPotentialBoard[1] === num) return "winMarkNoTransHover"
        else return "winMarkFadeOut"
      }
      else {
        if(num === nextPotentialBoard[0]) return "winMarkNoTransHover"
        if(boardPositions[9][num] == ' ') return "winMark"
      }
    };


    //(nextPotentialBoard[0] !== 3*r*s || boardData[11][3*r+s] === false) ? "outerboardWon" : "outerboardWonAvailable"
    const getOuterboardWonClass = (num) => {
      if(boardData[11][num] === true) {
        if(num === availableBoard) return "outerboardWonAvailable";
        if(nextPotentialBoard[1] === num) return "outerboardWonAvailable"
        if(nextPotentialBoard[0] === num) return "outerboardWonAvailable";
        if(nextPotentialBoard[0] !== num) return "outerboardWon"
      }
      else if(boardData[11][num] === false) {
        if(nextPotentialBoard[1] === num) return "outerboardWonAvailable"
        else return "outerboardWon"
      }
      else {
        if(num === nextPotentialBoard[0]) return "outerboardWonAvailable"
        if(boardPositions[9][num] == ' ') return "outerboardWonAvailable"
      }
    };

    


    const completeTransitionHere = (pos) => {
      if(completeTransition) completeTransition(pos)
    }

    const getElStyle = (id, num) => {
      return document.getElementById(id + num).style
    }

    const hoverOn = (number) => {
      if(newGameHasStarted) {
        if(isBoardSet) {
          if([boardNumber, 9].includes(availableBoard) && boardPositions[boardNumber][number] === ' ') {
            //listenForHover(number)
            //getElStyle("outerboard", number).background = "#e6e6e6"
          }
        }
        else {
          //getElStyle("outerboard", number).boxShadow = "inset 0 0 50px 10px grey";
          listenForHover(number, "outer")
          /*
          if(boardData[11][number] !== false && boardPositions[9][number] !== ' ') {
            getElStyle("smallTable", number).transition = "none"
            getElStyle("smallTable", number).opacity = 1
            getElStyle("winMark", number).transition = "none"
            getElStyle("winMark", number).opacity = 1
            getElStyle("outerboardWon", number).opacity = 0
          }
          */
        }
      }
    }

    const hoverOff = (number) => {
      if(newGameHasStarted) {
        if(isBoardSet) {
          if([boardNumber, 9].includes(availableBoard) && boardPositions[boardNumber][number] === ' ') {
            //listenForHover(availableBoard)
            //getElStyle("outerboard", number).background = "transparent"
            //getElStyle("outerboard", availableBoard).background = "#e6e6e6"
          }
        }
        else {
          //getElStyle("outerboard", number).boxShadow = "";
          listenForHover(null, "outer")
          /*
          if(boardData[11][number] !== false && boardPositions[9][number] !== ' ') {
            getElStyle("smallTable", number).transition = "none"
            getElStyle("smallTable", number).opacity = 0
            getElStyle("winMark", number).transition = "none"
            getElStyle("winMark", number).opacity = 0
            getElStyle("outerboardWon", number).opacity = 1
          }
          */
        }
      }
    }




    const renderBoard = (content) => {
      return (
        <div className={!isBoardSet ? "fullBoard" : ""}>
          <table id={isBoardSet && largeTileWon ? ("smallTable" + boardNumber) : ""} className={!isBoardSet ? "bigTable" : getSmallTableClass()} onTransitionEnd={()=>completeTransitionHere(boardNumber)}>
            <tbody id={!isBoardSet ? "" : "center"}>
              {[0, 1, 2].map((row) => 
                <tr>
                  {[0, 1, 2].map((space) =>
                    <td id={isBoardSet ? "" : ("outerboard" + (3*row+space))} className={getTdClassNames(row, space)} onMouseOver={()=>hoverOn(3*row+space)} onMouseOut={()=>hoverOff(3*row+space)}>
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
            content={boardPositions[boardNumber][3*r+s]}
            availableBoard={availableBoard}
            newGameHasStarted={newGameHasStarted}>
          </Square>
        );
      }
      else {
        return (
          <div>
            <TTT
              boardData={boardData}
              isBoardSet={true}
              boardPositions={boardPositions}
              listenForMove={listenForMove}
              listenForHover={listenForHover}
              boardNumber={3*r+s}
              availableBoard={availableBoard}
              newGameHasStarted={newGameHasStarted}
              nextPotentialBoard={nextPotentialBoard}>
            </TTT>
            <div id={('winMark' + (3*r+s))} className={getWinMarkClass(3*r+s)} onTransitionEnd={()=>completeTransitionHere(3*r+s)}>
              <svg className={"svgclass"}>
                {wins[winIDs[3*r+s]]}
              </svg>
            </div>
            {boardPositions[9][3*r+s] !== ' ' && 
             <div id={"outerboardWon"+(3*r+s)} className={getOuterboardWonClass(3*r+s)}>
               {(boardPositions[9][3*r+s])}
             </div>
            } 
          </div>
        );
      }
    }

    return (
      <div className="board">{
        renderBoard((row, space) => 
          createBoard(row, space, isBoardSet)
        )}
        {(!isBoardSet ? winIDs[9] : null) &&
          <div className={"bigWinMark"}>
            <svg className={"bigSvgClass"}>
               <g transform={"scale(3)"}>
                 {wins[winIDs[9]]}
               </g>
             </svg>
          </div>
        }
      </div>
    );

  //};
} 

export default TTT;