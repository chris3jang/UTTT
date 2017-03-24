import React, { Component } from 'react';
import './Square.css';

const Square = ({position, myFunc, content}) => {

  const handleClick = () => {
    if(content === " ") {
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