import React, { Component } from 'react';
import './css/Square.css';

const Square = ({isActive, listenForMove, position, content}) => {
  
  const handleClick = () => {
    if(isActive) {
      listenForMove(position);
    }
  };

  return (
    <button className="button" onClick={handleClick}>
      {content}
    </button>
  );

}

export default Square;