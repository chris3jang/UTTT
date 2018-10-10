import React, { Component } from 'react';
import './Square.css';

const Square = ({content, position, availableBoard, newGameHasStarted, listenForMove, listenForHover}) => {

  const isActiveBoard = ((position[0] === availableBoard || (availableBoard === 9 && newGameHasStarted)) && content === " ");
  
  const handleClick = () => {
    if(isActiveBoard) {
      listenForMove(position);
    }
  };
  
  const handleMouseOver = () => {
    if(isActiveBoard) {
      listenForHover(position[1], "innerhover");
    }
  };

  const handleMouseOut = () => {
    if(isActiveBoard) {
      listenForHover(availableBoard, "innerout")
    }
  };

  return (
    <button className="button" onClick={handleClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {content}
    </button>
  );

}

export default Square;