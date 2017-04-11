import React, { Component } from 'react';
import './Nav.css';

const Nav = ({startNewGame}) => {

	const newGame = () => {
		console.log("play clicked");
		startNewGame();
	}

    return (
      	<div>
  			<ul>
				<li><button onClick={newGame}>Play</button></li>
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
