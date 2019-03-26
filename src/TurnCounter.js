import React, { Component } from 'react';
import './css/TurnCounter.css';

const TurnCounter = ({isGameActive, gameWon, roomID, player, left, right}) => {
  
  return (
    <div className={isGameActive && !gameWon ? "counterContainer" : "gameNotInPlay"}>
      <div className={"nameContainer" + (roomID === null ? " roomIDRemoved" : "")}>
        <div className={"left"}>{player ? (player[0] === 1 ? player[1] : (player[0] === 2 ? player[2] : null)) : null}</div>
        <div className={"right"}>{player ? (player[0] === 1 ? player[2] : (player[0] === 2 ? player[1] : null)) : null}</div>
      </div>
      <div className={left}>✕</div>
      <div className={right}>◯</div>
    </div>
  );

}

export default TurnCounter;