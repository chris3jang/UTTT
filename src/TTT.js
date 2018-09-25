import React, { Component } from 'react';
import './TTT.css';
import Square from './Square.js';

class TTT extends Component {

  render() {
    const {myFunc, boardpositions, boardset, boardnumber, availableBoard, allBoards, outerboard} = this.props
    var boardcontent;
    var color;

    function wrapBoard(renderElement) {
      return <div>
               <table>
                 <tbody id="center">
                 {[0, 1, 2].map((item, i) => 
                   <tr>{[0, 1, 2].map((item, j) => 
                     renderElement(i, j))}
                   </tr>)}
                 </tbody>
               </table>
             </div>
    }
    

    if (boardset) {
      boardcontent = wrapBoard((i, j) => <td className="innerboard">
                               <Square
                                 position={[boardnumber, 3*i+j]} 
                                 myFunc={myFunc} 
                                 content={boardpositions[boardnumber][3*i+j]}
                                 availableBoard={availableBoard}
                                 allBoards={allBoards}>
                               </Square>
                             </td>)
                             
    }

    else {
      boardcontent = <div>
                       <table className="bigTable">
                         <tbody>
                         {[0, 1, 2].map((item, i) =>
                           <tr>{[0, 1, 2].map((item, j) => 
                             <td className={"outerboard"+ ((availableBoard === 3*i+j || allBoards) ? " bold" : "") + ((outerboard[3*i+j] === 'X') ? " xcolor" : "") + ((outerboard[3*i+j] === 'O') ? " ocolor" : "")}>
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

    return (
      <div>
        {boardcontent}
      </div>
    );
  };
} 

export default TTT;