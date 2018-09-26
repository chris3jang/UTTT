import React, { Component } from 'react';
import './Square.css';

const Square = ({position, myFunc, content, availableBoard, allBoards}) => {

  const handleClick = () => {
    if(content === " " && (position[0] === availableBoard || allBoards)) {
      console.log(position);
      myFunc(position);
    }
  };

  /*
  let color;
  if(content === "✕") color = "xcolor"
  if(content === "◯") color = "ocolor"

  return <button className="button" id={color} onClick={handleClick}>{content}</button>;
  */

  return <button className="button" onClick={handleClick}>{content}</button>;

}

//Square.propTypes = {
//  myFunc: React.PropTypes.func
//}

export default Square;