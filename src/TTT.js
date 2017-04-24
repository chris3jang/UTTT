import React, { Component } from 'react';
import './TTT.css';
import Square from './Square.js';

class TTT extends Component {

wrapBoard(element) {
  return <div>
           <table>
             <tbody id="center">
             {[0, 1, 2].map((item, i) => 
               <tr>{[0, 1, 2].map((item, j) => 
                 element(i, j))}
               </tr>)}
             </tbody>
           </table>
         </div>
}

  render() {
    const {myFunc, boardpositions, boardset, boardnumber, availableBoard, allBoards, outerboard} = this.props
    var boardcontent;
    var color;

    if (boardset) {
      //if(boardpositions[boardnumber][3*i+j] === "X") color = "xcolor"
      //if(boardpositions[boardnumber][3*i+j] === "O") color = "ocolor"
      boardcontent = <div>
                       <table>
                         <tbody id="center">
                         {[0, 1, 2].map((item, i) => 
                           <tr>{[0, 1, 2].map((item, j) => 
                             <td className="innerboard">
                               <Square
                                 position={[boardnumber, 3*i+j]} 
                                 myFunc={myFunc} 
                                 content={boardpositions[boardnumber][3*i+j]}
                                 availableBoard={availableBoard}
                                 allBoards={allBoards}>
                               </Square>
                             </td>)}
                           </tr>)}
                         </tbody>
                       </table>
                     </div>
                             
    }

    else {
      boardcontent = <div>
                       <table>
                         <tbody>
                         {[0, 1, 2].map((item, i) =>
                           <tr>{[0, 1, 2].map((item, j) => 
                             <td className={"outerboard"+ ((availableBoard === 3*i+j || allBoards) ? " bold" : "") + ((outerboard[3*i+j] === 'X') ? " xcolor" : "") + ((outerboard[3*i+j] === '0') ? " ocolor" : "")}>
                               {}
                               <TTT 
                                 boardset={true}
                                 boardpositions={boardpositions}
                                 myFunc={myFunc}
                                 boardnumber={3*i+j}
                                 availableBoard={availableBoard}
                                 allBoards={allBoards}>
                               </TTT>
                             </td>)}
                           </tr>)}  
                         </tbody>  
                       </table>
                     </div>
    }
    //figure out how to define keys, key={(3*i+j).objectID}

    return (
      <div>
        {boardcontent}
      </div>
    );
  };
} 

export default TTT;