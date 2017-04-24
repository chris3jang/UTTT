import React, { Component } from 'react';
import './Nav.css';

const Nav = ({startNewGame, newGameHasStarted, rules, gameSettings, setToOne, setToThree, setToMagic, setToSelected}) => {

	const newGame = () => {
		console.log("play clicked");
		console.log("nav newGameHasStarted: " + newGameHasStarted)
		if(!newGameHasStarted) {
			startNewGame();
		}
	}

	const openRules = () => {
		rules();
	}

	const winOneBox = () => {
		if(gameSettings !== "one") {
			setToOne();
		}
	}

	const winThreeInARow = () => {
		if(gameSettings !== "three") {
			setToThree();
		}
	}

	const magicSpaces = () => {
		if(gameSettings !== "magic") {
			setToMagic();
		}
	}

	const setSelected = (clicked) => {
		if(gameSettings !== clicked) {
			setToSelected(clicked);
		}
	}


	var one = "";
	var three = "";
	var magic = "";

	if(gameSettings === "one") {
		one = "selected";
	}
	else {
		one = "";
	}
	if(gameSettings === "three") {
		three = "selected";
	}
	else {
		three = "";
	}
	if(gameSettings === "magic") {
		magic = "selected";
	}
	else {
		magic = "";
	}


    return (
      	<div>
  			<ul>
				<li><a href="#javascript:void(0)" onClick={newGame}>Play</a></li>
				<li><a href="#javascript:void(0)" onClick={openRules}>Rules</a></li>
				<li className="dropdown">
					<a href="javascript:void(0)" className="dropbtn">Settings</a>
					<div className="dropdown-content">
					      <a href="#" className={one} onClick={winOneBox}>Win 1 Box</a>
					      <a href="#" className={three} onClick={winThreeInARow}>Win 3 In A Row</a>
					      <a href="#" className={magic} onClick={magicSpaces}>Magic Spaces</a>
					</div>
				</li>
			</ul>
      	</div>
	      
    );
}

export default Nav;
