import React, { Component } from 'react';
import './Nav.css';

const Nav = ({startNewGame, newGameHasStarted}) => {

	const newGame = () => {
		console.log("play clicked");
		console.log("nav newGameHasStarted: " + newGameHasStarted)
		startNewGame();
	}

    return (
      	<div>
  			<ul>
				<li><a href="#javascript:void(0)" onClick={newGame}>Play</a></li>
				<li><a href="#javascript:void(0)">Rules</a></li>
				<li className="dropdown">
					<a href="javascript:void(0)" className="dropbtn">Settings</a>
					<div className="dropdown-content">
					      <a href="#">Link 1</a>
					      <a href="#">Link 2</a>
					      <a href="#">Link 3</a>
					</div>
				</li>
			</ul>
      	</div>
	      
    );
}

export default Nav;
