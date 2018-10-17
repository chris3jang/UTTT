import React, { Component } from 'react';
import './TTT.css';
import Square from './Square.js';

//class TTT extends Component {

const TTT = ({ boardData, isBoardSet, newGameHasStarted, nextPotentialBoard, availableBoard, 
      boardPositions, boardNumber, listenForMove, listenForHover, winIDs, completeTransition, gameWon }) => {

  //render() {
    /*
    const { boardData, isBoardSet, newGameHasStarted, nextPotentialBoard, availableBoard, 
      boardPositions, boardNumber, listenForMove, listenForHover, winIDs, completeTransition 
    } = this.props; */

    const largeTileWon = (isBoardSet ? (boardPositions[9][boardNumber] !== ' ') : null)

    let temp, id = ""
    if(isBoardSet) temp = boardNumber
    else temp = 9
    for(let i = 0; i < 3; i++) {
      id += winIDs[temp][i];
    }
    const winID = id

    const wins = {
      "012": <path d="M10 29 L152 29" stroke="#000000" stroke-width="5" className={isBoardSet ? "smallPath" : "bigPath"} id={"012"}></path>,
      "345": <path d="M10 81 L152 81" stroke="#000000" stroke-width="5" className={isBoardSet ? "smallPath" : "bigPath"} id={"345"}></path>,
      "678": <path d="M10 133 L152 133" stroke="#000000" stroke-width="5" className={isBoardSet ? "smallPath" : "bigPath"} id={"678"}></path>,
      "036": <path d="M29 10 L29 152" stroke="#000000" stroke-width="5" className={isBoardSet ? "smallPath" : "bigPath"} id={"036"}></path>,
      "147": <path d="M81 10 L81 152" stroke="#000000" stroke-width="5" className={isBoardSet ? "smallPath" : "bigPath"} id={"147"}></path>,
      "258": <path d="M132 10 L132 152" stroke="#000000" stroke-width="5" className={isBoardSet ? "smallPath" : "bigPath"} id={"258"}></path>,
      "048": <path d="M10 10 L152 152"  stroke="#000000" stroke-width="5" className={isBoardSet ? "smallPath" : "bigPath"} id={"048"}></path>,
      "246": <path d="M152 10 L10 152" stroke="#000000" stroke-width="5" className={isBoardSet ? "smallPath" : "bigPath"} id={"246"}></path>
    };

    const getTdClassNames = (r, s) => {
      let classnames = "";
      if(isBoardSet) classnames = "smallTile";
      else {
        classnames += "largeTile";
        //if(newGameHasStarted) classnames += " outerboardHover";
        if(nextPotentialBoard[0] === 3*r+s) classnames += " outerboardShadow"
        //if(3*r+s===availableBoard) classnames += " bold";
        else if(nextPotentialBoard[1] === 3*r+s && !gameWon) classnames += " nextBoard";
        //else if(availableBoard === 9 && newGameHasStarted) classnames += " bold";
      }
      return classnames;
    }


    const tblOpts = ["innerTable", "innerTable visible instant", "innerTable hidden instant", "innerTable hidden outerTileWinTrans"]
    const wmOpts = ["winMark", "winMark visible instant", "winMark hidden instant", "winMark hidden outerTileWinTrans"]
    const ibwOpts = ["innerBoardWinner hidden", "innerBoardWinner hidden", "innerBoardWinner", "innerBoardWinner"]

    const getElOpts = (el) => {
      if(el === "tbl") return tblOpts
      if(el === "wm") return wmOpts
      if(el === "ibw") return ibwOpts
    }

    const getClassName = (num, el) => {
      if(boardData[11][num] === true) {
      //visible because its one of your current options
      //visible because it shows what will be the next options
      //visible because user hovers over it
        if((num === availableBoard 
          || (nextPotentialBoard[1] === num && !gameWon) 
          || nextPotentialBoard[0] === num)
          && !winIDs[9].includes(availableBoard)) {
          return getElOpts(el)[1]
        }
        else return getElOpts(el)[2]

        }
      else if(boardData[11][num] === false) {//during the transition
        if(winIDs[9].includes(availableBoard) && nextPotentialBoard[1] !== num) return getElOpts(el)[2] //not sure this is relevant
        else return getElOpts(el)[3]
      }
      else {
        if(num === nextPotentialBoard[0]) return getElOpts(el)[1]
        else return getElOpts(el)[0]
      }
    }

    const isActive = (num) => {
      return ((boardNumber === availableBoard || (availableBoard === 9 && newGameHasStarted)) && boardPositions[boardNumber][num] === " ");
    }


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
            console.log(number)
            //listenForHover(number)
            //getElStyle("outerboard", number).background = "#e6e6e6"
            listenForHover(number, "innerhover")
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
            listenForHover(availableBoard, "innerout")
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
          <table id={isBoardSet && largeTileWon ? ("smallTable" + boardNumber) : ""} className={!isBoardSet ? "bigTable" : getClassName(boardNumber, "tbl")} onTransitionEnd={()=>completeTransitionHere(boardNumber)}>
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
              nextPotentialBoard={nextPotentialBoard}
              boardData={boardData}
              winIDs={winIDs}
              completeTransition={completeTransition}>
            </TTT>
            {boardPositions[9][3*r+s] !== ' ' && 
             <div id={"outerboardWon"+(3*r+s)} className={getClassName(3*r+s, "ibw")}>
               {(boardPositions[9][3*r+s])}
             </div>
            } 
            <div className={(((3*r+s===availableBoard || (availableBoard === 9 && newGameHasStarted)) && !gameWon) ? "backgroundColor" : "")}></div>
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
        {(!isBoardSet ? winIDs[9] : true) &&
          <div className={isBoardSet ? getClassName(boardNumber, "wm") : "bigWinMark"}>
            <svg className={isBoardSet ? "svgclass" : "bigSvgClass"}>
              <g transform={"scale(" + (isBoardSet ? 1 : 3.1) + ")"}>
                {wins[winID]}
              </g>
            </svg>
          </div>
        }
      </div>
      
    );
} 

/*
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


<div id={('winMark' + (3*r+s))} className={getWinMarkClass(3*r+s)} onTransitionEnd={()=>completeTransitionHere(3*r+s)}>
              <svg className={"svgclass"}>
                {wins[winIDs[3*r+s]]}
              </svg>
            </div>


{wins[winIDs[(isBoardSet ? boardNumber : 9)]]}


*/



export default TTT;