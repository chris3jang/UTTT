import React, { Component } from 'react';
import './TTT.css';
import Square from './Square.js';

class TTT extends Component {

  render() {
    const {myFunc, myFuncTwo, boardpositions, boardset, boardnumber, availableBoard, winIDs} = this.props
    var boardcontent;

    const wins = {
      "012": <line x1="10" y1="31" x2="152" y2="31" className={"linecross"} id={"012"}></line>,
      "345": <line x1="10" y1="81" x2="152" y2="81" className={"linecross"} id={"345"}></line>,
      "678": <line x1="10" y1="131" x2="152" y2="131" className={"linecross"} id={"678"}></line>,
      "036": <line x1="31" y1="10" x2="31" y2="152" className={"linecross"} id={"036"}></line>,
      "147": <line x1="81" y1="10" x2="81" y2="152" className={"linecross"} id={"147"}></line>,
      "258": <line x1="131" y1="10" x2="131" y2="152" className={"linecross"} id={"258"}></line>,
      "048": <line x1="10" y1="10" x2="152" y2="152" className={"linecross"} id={"048"}></line>,
      "246": <line x1="152" y1="10" x2="10" y2="152" className={"linecross"} id={"246"}></line>
    }

    const renderBoard = (content) => {
      console.log("RENDERBOARD")
      return (
        <div className={!boardset ? "fullBoard" : ""}>
          <table className={!boardset ? "bigTable" : "smallTable"}>
            <tbody id={!boardset ? "" : "center"}>
              {[0, 1, 2].map((row, i) => 
                <tr>
                  {[0, 1, 2].map((space, j) => 
                    <td className={!boardset ? ("outerboard" + (this.props.newGameHasStarted ? " outerboardHover" : "") + ((this.props.nextBoard == 3*i+j) ? " nextBoard" : ((availableBoard === 3*i+j || (availableBoard === 9 && this.props.newGameHasStarted)) ? " bold" : ""))) : "innerboard"}>
                      {content(i, j)}
                    </td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )
    }

    const createBoard = (r, s, boardset) => {
      if(boardset) {
        return (
          <Square
            position={[boardnumber, 3*r+s]} 
            myFunc={myFunc} 
            myFuncTwo={myFuncTwo}
            content={boardpositions[boardnumber][3*r+s]}
            availableBoard={availableBoard}
            newGameHasStarted={this.props.newGameHasStarted}>
          </Square>
        )
      }
      else {
        console.log("!notboardset")
        return (
          <div>
            <TTT
              boardset={true}
              boardpositions={boardpositions}
              myFunc={myFunc}
              myFuncTwo={myFuncTwo}
              boardnumber={3*r+s}
              availableBoard={availableBoard}
              newGameHasStarted={this.props.newGameHasStarted}>
            </TTT>
            {boardpositions[9][3*r+s] !== ' ' && 
             <div className={"outerboardWon"}>
               {(boardpositions[9][3*r+s])}
             </div>
            } 
            {winIDs[3*r+s] && 
             <div className={"winMark"}>
               <svg className={"svgclass"}>
                 {wins[winIDs[3*r+s]]}
               </svg>
             </div>
            }
          </div>
        )
      }
    }

    return (
      <div className="game">{
        renderBoard((row, space) => 
          createBoard(row, space, boardset)
        )
      }
      </div>
    );

  };
} 

export default TTT;