import React, { Component } from 'react';
import './Square.css';

const Square = ({position, myFunc, myFuncTwo, content, availableBoard, newGameHasStarted}) => {

  const isActiveBoard = (content === " " && (position[0] === availableBoard || (availableBoard === 9 && newGameHasStarted)));

  const handleClick = () => {
    console.log("content", content, 'position', position, 'availableBoard', availableBoard, 'newGameHasStarted', newGameHasStarted)
    if(isActiveBoard) {
      myFunc(position);
    }
  };
  const handleMouseOver = () => {
    if(isActiveBoard) {
      myFuncTwo(position[1]);
    }
  };
  const handleMouseOut = () => {
    if(isActiveBoard) {
      myFuncTwo(9)
    }
  };

  return <button className="button" onClick={handleClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{content}</button>;

}

export default Square;