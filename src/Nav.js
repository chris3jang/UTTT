import React, { Component } from 'react';
import './Nav.css';

const Nav = ({selectMenuOption, gameSettings}) => {



	const clickMenuOption = (action) => {
		selectMenuOption(action);
	}

    return (
      	<div>
  			<ul>
				<li className="dropdown">
					<a href="javascript:void(0)" className="dropbtn">Play</a>
					<div className="dropdown-content">
					      <a href="#" onClick={() => clickMenuOption('local')}>Local</a>
					      <a href="#" onClick={() => clickMenuOption('online')}>Online</a>
					      <a href="#" onClick={() => clickMenuOption('exit')}>Exit</a>
					</div>
				</li>
				<li><a href="#javascript:void(0)" onClick={() => clickMenuOption('rules')}>Rules</a></li>
				<li className="dropdown">
					<a href="javascript:void(0)" className="dropbtn">Settings</a>
					<div className="dropdown-content">
					      <a href="#" className={gameSettings === 'one' ? "selected" : ""} onClick={() => clickMenuOption("one")}>Win 1 Box</a>
					      <a href="#" className={gameSettings === 'three' ? "selected" : ""} onClick={() => clickMenuOption("three")}>Win 3 In A Row</a>
					      <a href="#" className={gameSettings === 'magic' ? "selected" : ""} onClick={() => clickMenuOption("magic")}>Magic Spaces</a>
					</div>
				</li>
			</ul>
      	</div>
	      
    );
}

export default Nav;
