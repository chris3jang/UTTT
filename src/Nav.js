import React, { Component } from 'react';
import './Nav.css';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');

//import { createGameOnline }

const Nav = ({startNewGame, newGameHasStarted, rules, gameSettings, setToOne, setToThree, setToMagic, setToSelected, openOnlineForm}) => {

	const newGame = (action) => {
		console.log("play clicked");
		console.log("nav newGameHasStarted: " + newGameHasStarted)

		if(!newGameHasStarted) {

			if(action == 'local') {
				startNewGame();
			}
			if(action == 'online') {
				console.log("online")
				openOnlineForm()
			}

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

	const local = () => {
		newGame('local')
	}

	const online = () => {
		newGame('online')
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
				<li className="dropdown">
					<a href="javascript:void(0)" className="dropbtn">Play</a>
					<div className="dropdown-content">
					      <a href="#" className={local} onClick={local}>Local</a>
					      <a href="#" className={online} onClick={online}>Online</a>
					</div>
				</li>
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
