import React, { Component } from 'react';
import './TTT.css';
import Square from './Square.js';

class TTT extends Component {

  render() {
    const { isBoardSet, newGameHasStarted, nextPotentialBoard, availableBoard, 
      boardPositions, boardNumber, listenForMove, listenForHover, winIDs 
    } = this.props;

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
        if(nextPotentialBoard === 3*r+s && boardPositions[9][3*r+s] === ' ' || 3*r+s===availableBoard) classnames += " nextBoard";
        else if(availableBoard === 9 && newGameHasStarted) classnames += " bold";
      }
      return classnames;
    }



    const showWonBoard = (number) => {
      if(isBoardSet && newGameHasStarted) {
        if(boardPositions[9][number] !== ' ') {
          document.getElementById(("outerboard"+number)).style.boxShadow = ""; 
          document.getElementById(("smallTable"+number)).style.opacity = 1
          document.getElementById(("outerboardWon"+number)).style.opacity = 0
          document.getElementById(("winMark" + number)).style.opacity = 1
          //document.getElementById(("smallTable"+number)).style.transition = "none"
        }
      }

      if(!isBoardSet && newGameHasStarted) {
        if(boardPositions[9][number] !== '✕' && boardPositions[9][number] !== '◯') document.getElementById(("outerboard"+number)).style.boxShadow = "inset 0 0 50px 10px grey";
        else document.getElementById(("outerboardWon"+number)).style.opacity = 0
        if(boardPositions[9][number] !== ' ') {
          document.getElementById(("outerboard"+number)).style.boxShadow = ""; 
          document.getElementById(("smallTable"+number)).style.opacity = 1
          document.getElementById(("outerboardWon"+number)).style.opacity = 0
          document.getElementById(("winMark" + number)).style.opacity = 1
          //document.getElementById(("smallTable"+number)).style.transition = "none"
        }
      }
    }

    const hideWonBoard = (number) => {
      if(isBoardSet && newGameHasStarted) {
        if(boardPositions[9][number] !== ' ') {
          document.getElementById(("outerboard"+number)).style.boxShadow = ""; 
          document.getElementById(("smallTable"+number)).style.opacity = 0
          document.getElementById(("outerboardWon"+number)).style.opacity = 1
          document.getElementById(("winMark" + number)).style.opacity = 0
          //document.getElementById(("smallTable"+number)).style.transition = "none"
        }
      }

      if(!isBoardSet && newGameHasStarted) {
        if(boardPositions[9][number] !== '✕' && boardPositions[9][number] !== '◯') document.getElementById(("outerboard"+number)).style.boxShadow = "";
        else document.getElementById(("outerboardWon"+number)).style.opacity = 1

        if(boardPositions[9][number] !== ' ') {
          document.getElementById(("outerboard"+number)).style.boxShadow = "";
          document.getElementById(("smallTable"+number)).style.opacity = 0
          document.getElementById(("outerboardWon"+number)).style.opacity = 1
          document.getElementById(("winMark" + number)).style.opacity = 0
          //document.getElementById(("smallTable"+number)).style.transition = "none"
        }

      }
    }

    const renderBoard = (content) => {
      return (
        <div className={!isBoardSet ? "fullBoard" : ""}>
          <table id={isBoardSet && largeTileWon ? ("smallTable" + boardNumber) : ""} className={!isBoardSet ? "bigTable" : 'smallTable'/*(!largeTileWon ? "smallTable" : "smallTableWon")     for transitions*/}>
            <tbody id={!isBoardSet ? "" : "center"}>
              {[0, 1, 2].map((row) => 
                <tr>
                  {[0, 1, 2].map((space) =>
                    <td id={isBoardSet ? "" : ("outerboard" + (3*row+space))} className={getTdClassNames(row, space)} onMouseOver={()=>showWonBoard(3*row+space)} onMouseOut={()=>hideWonBoard(3*row+space)}>
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
            newGameHasStarted={this.props.newGameHasStarted}>
          </Square>
        );
      }
      else {
        return (
          <div>
            <TTT
              isBoardSet={true}
              boardPositions={boardPositions}
              listenForMove={listenForMove}
              listenForHover={listenForHover}
              boardNumber={3*r+s}
              availableBoard={availableBoard}
              newGameHasStarted={this.props.newGameHasStarted}>
            </TTT>
            <div id={('winMark' + (3*r+s))} className={'winMark'/*boardPositions[9][3*r+s] == ' ' ? "winMark" : "winMarkFadeOut"        for transitions*/}> 
              <svg className={"svgclass"}>
                {wins[winIDs[3*r+s]]}
              </svg>
            </div>
            {boardPositions[9][3*r+s] !== ' ' && 
             <div id={"outerboardWon"+(3*r+s)} className={"outerboardWon"}>
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

  };
} 

export default TTT;