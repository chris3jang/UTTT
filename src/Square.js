import React, { Component } from 'react';
import './Square.css';

const Square = ({position, myFunc}) => {


  const handleClick = () => {
    console.log(position);

    if(myFunc) {
      console.log("fill X");
    }
    else console.log("fill Y");

    };
  


    return (
      <div>
        <button onClick={handleClick}/>
      </div>
    );

    
}

Square.propTypes = {
  myFunc: React.PropTypes.func
}

export default Square;


