import React, { Component } from 'react';
import './Square.css';

const Square = ({position, myFunc, myFuncTwo, content, availableBoard, newGameHasStarted}) => {

  const handleClick = () => {
    if(content === " " && (position[0] === availableBoard || (availableBoard === 9 && newGameHasStarted))) {
      console.log(position);
      myFunc(position);
    }
  };

  const handleMouseOver = () => {
    if(content === " " && position[0] === availableBoard || (availableBoard === 9 && newGameHasStarted)) {
      myFuncTwo(position[1]);
    }
  }

  const handleMouseOut = () => {
    if(content === " " && position[0] === availableBoard || (availableBoard === 9 && newGameHasStarted)) {
      myFuncTwo(9)
    }
  }

  /*
  let color;
  if(content === "✕") color = "xcolor"
  if(content === "◯") color = "ocolor"

  return <button className="button" id={color} onClick={handleClick}>{content}</button>;
  */

  return <button className="button" onClick={handleClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{content}</button>;

}

//Square.propTypes = {
//  myFunc: React.PropTypes.func
//}

export default Square;