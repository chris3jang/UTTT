import React, { Component } from 'react';
import './Square.css';

const Square = ({position, myFunc, content, availableBoard, allBoards}) => {

  const handleClick = () => {
    if(content === " " && (position[0] === availableBoard || allBoards)) {
      console.log(position);
      myFunc(position);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>{content}</button>
    </div>
  );

}

//Square.propTypes = {
//  myFunc: React.PropTypes.func
//}

export default Square;