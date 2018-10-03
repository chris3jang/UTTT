import React, { Component } from 'react';
import './TTT.css';
import Square from './Square.js';

class TTT extends Component {

  render() {
    const { isBoardSet, newGameHasStarted, nextPotentialBoard, availableBoard, 
      boardPositions, boardNumber, listenForMove, listenForHover, winIDs 
    } = this.props;

    const wins = {
      "012": <line x1="10" y1="31" x2="152" y2="31" className={"linecross"} id={"012"}></line>,
      "345": <line x1="10" y1="81" x2="152" y2="81" className={"linecross"} id={"345"}></line>,
      "678": <line x1="10" y1="131" x2="152" y2="131" className={"linecross"} id={"678"}></line>,
      "036": <line x1="31" y1="10" x2="31" y2="152" className={"linecross"} id={"036"}></line>,
      "147": <line x1="81" y1="10" x2="81" y2="152" className={"linecross"} id={"147"}></line>,
      "258": <line x1="131" y1="10" x2="131" y2="152" className={"linecross"} id={"258"}></line>,
      "048": <line x1="10" y1="10" x2="152" y2="152" className={"linecross"} id={"048"}></line>,
      "246": <line x1="152" y1="10" x2="10" y2="152" className={"linecross"} id={"246"}></line>
    };

    const winsAnimated = {
      "012": <path d="M10 31 L152 31" stroke="#000000" stroke-width="3" className={"path"} id={"012"}></path>,
      "345": <path d="M10 81 L152 81" stroke="#000000" stroke-width="3" className={"path"} id={"345"}></path>,
      "678": <path d="M10 131 L152 131" stroke="#000000" stroke-width="3" className={"path"} id={"678"}></path>,
      "036": <path d="M31 10 L31 152" stroke="#000000" stroke-width="3" className={"path"} id={"036"}></path>,
      "147": <path d="M81 10 L81 152" stroke="#000000" stroke-width="3" className={"path"} id={"147"}></path>,
      "258": <path d="M131 10 L131 152" stroke="#000000" stroke-width="3" className={"path"} id={"258"}></path>,
      "048": <path d="M10 10 L152 152"  stroke="#000000" stroke-width="3" className={"path"} id={"048"}></path>,
      "246": <path d="M152 10 L10 152" stroke="#000000" stroke-width="3" className={"path"} id={"246"}></path>
    };


    const getTdClassNames = (r, s) => {
      let classnames = "";
      if(isBoardSet) classnames = "innerboard";
      else {
        classnames += "outerboard";
        if(newGameHasStarted) classnames += " outerboardHover";
        if(nextPotentialBoard === 3*r+s) classnames += " nextBoard";
        else if(availableBoard === 9 && newGameHasStarted) classnames += " bold";
      }
      return classnames;
    }

    const renderBoard = (content) => {
      console.log("RENDERBOARD")
      return (
        <div className={!isBoardSet ? "fullBoard" : ""}>
          <table className={!isBoardSet ? "bigTable" : "smallTable"}>
            <tbody id={!isBoardSet ? "" : "center"}>
              {[0, 1, 2].map((row) => 
                <tr>
                  {[0, 1, 2].map((space) => 
                    <td className={getTdClassNames(row, space)}>
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
            {boardPositions[9][3*r+s] !== ' ' && 
             <div className={"outerboardWon"}>
               {(boardPositions[9][3*r+s])}
             </div>
            } 
            {winIDs[3*r+s] && 
             <div className={"winMark"}>
               <svg className={"svgclass"}>
                 {winsAnimated[winIDs[3*r+s]]}
               </svg>
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
        )
      }
      </div>
    );

  };
} 

export default TTT;