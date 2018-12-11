import React, { Component } from 'react';
import './WinMark.css';

const WinMark = ({isBoardSet, boardWinner, finalBoardWinPositions, winID, tileHovered, changedClassName}) => {

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
    const cN = (isBoardSet ? "small" : "big") + "Path" + (finalBoardWinPositions.includes(tileHovered[0]) && finalBoardWinPositions.length !== 0 ? " hidden" : "")
    if((boardWinner !== ' ' && isBoardSet) || (!isBoardSet && finalBoardWinPositions.length !== 0)) {
      return <path d={winDim[id]} stroke="#000000" stroke-width="5" className={cN}></path>
    }
    else return
  }
  

  return (
    <div className={isBoardSet ? changedClassName : "bigWinMark"}>
	    <svg className={isBoardSet ? "svgclass" : "bigSvgClass"}>
	    	<g transform={"scale(" + (isBoardSet ? 1 : 3.1) + ")"}>
	    		{getWinEl(winID)}
	    	</g>
	    </svg>
	</div>
  );

}

export default WinMark;