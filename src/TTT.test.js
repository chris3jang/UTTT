import React from 'react';
import ReactDOM from 'react-dom';
import TTT from './TTT.js';
import WinMark from './WinMark.js';
import Square from './Square.js';

import { mount, shallow } from 'enzyme';

describe('inner TTT renders children properly', () => { 

	const defProps = {
		isBoardSet: true,
	    boardData: [
	        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
	        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
	        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
	        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
	        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
	        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
	        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
	        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
	        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
	        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
	        [ [], [], [], [], [], [], [], [], [], [] ],
	        [ null, null, null, null, null, null, null, null, null ] //check if [9] is the same thing
	    ],
	    boardNumber: 0,
	    availableBoard: 0,
	    newGameHasStarted: true,
	    gameWon: false,
	    tileHovered: [null, null],
	  	changedClassName: "winmark"
	}
	const wrapper = mount(<TTT 
		{...defProps}
	/>);
	it('inner TTT renders 1 WinMark', () => {
		expect(wrapper.find(WinMark).length).toBe(1);
	});
	it('default inner TTT generates default WinMark with correct props', () => {
		expect(wrapper.find(WinMark).props()).toHaveProperty("isBoardSet", true);
		expect(wrapper.find(WinMark).props()).toHaveProperty("boardWinner", ' ');
		expect(wrapper.find(WinMark).props()).toHaveProperty("finalBoardWinPositions", []);
		expect(wrapper.find(WinMark).props()).toHaveProperty("winID", "");
		expect(wrapper.find(WinMark).props()).toHaveProperty("tileHovered", [null, null]);
		expect(wrapper.find(WinMark).props()).toHaveProperty("changedClassName", "winMark");
	});
	it('inner TTT correctly calculates WinMark props via getChangingClassName() const', () => {
		//expect(wrapper.find(WinMark).props().changedClassName).toBe("winMark");
		wrapper.setProps({tileHovered: [0, 0]})
		expect(wrapper.find(WinMark).props().changedClassName).toBe("winMark visible instant");
		let temp = wrapper.props().boardData;
		temp[11][0] = false;
		temp[10][9] = [0, 1, 2];
		wrapper.setProps({boardData: temp, tileHovered: [0, 1]});
		expect(wrapper.find(WinMark).props().changedClassName).toBe("winMark hidden instant");
		temp[10][9] = [3, 4, 5];
		wrapper.setProps({boardData: temp});
		expect(wrapper.find(WinMark).props().changedClassName).toBe("winMark hidden outerTileWinTrans");
		temp[10][9] = [0, 1, 2];
		wrapper.setProps({boardData: temp, tileHovered: [0, 0]});
		expect(wrapper.find(WinMark).props().changedClassName).toBe("winMark hidden outerTileWinTrans");
		temp[11][0] = true;
		temp[10][9] = [];
		wrapper.setProps({boardData: temp})
		expect(wrapper.find(WinMark).props().changedClassName).toBe("winMark visible instant");
		temp[10][9] = [0, 1, 2];
		wrapper.setProps({boardData: temp})
		expect(wrapper.find(WinMark).props().changedClassName).toBe("winMark hidden instant");
		temp[10][9] = [];
		wrapper.setProps({boardData: temp, gameWon: true, tileHovered: [1, 0]})
		expect(wrapper.find(WinMark).props().changedClassName).toBe("winMark visible instant");
		wrapper.setProps({availableBoard: 1, gameWon: false})
		expect(wrapper.find(WinMark).props().changedClassName).toBe("winMark visible instant");
		wrapper.setProps({gameWon: true, tileHovered: [0, 0]})
		expect(wrapper.find(WinMark).props().changedClassName).toBe("winMark visible instant");
		wrapper.setProps({tileHovered: [1, 0]})
		expect(wrapper.find(WinMark).props().changedClassName).toBe("winMark hidden instant");

		temp[11][0] = null;
		wrapper.setProps(defProps)
	});
	it('inner TTT renders 9 Squares', () => {
		expect(wrapper.find(Square).length).toBe(9);
	});
	it('default inner TTT generates default Square with correct props', () => {
		wrapper.find(Square).forEach((node, i) => {
			expect(node.props()).toHaveProperty("position", [0, i]);
			expect(node.props()).toHaveProperty("content", ' '); //◯ ✕
		});
	});
	it('inner TTT calculates Square isActive prop correctly', () => {
		wrapper.setProps(defProps)
		expect(wrapper.find(Square).first().props().isActive).toBe(true);
		wrapper.setProps({availableBoard: 1});
		expect(wrapper.find(Square).first().props().isActive).toBe(false);
		wrapper.setProps({availableBoard: 9});
		expect(wrapper.find(Square).first().props().isActive).toBe(true);
		let temp = wrapper.props().boardData;
		temp[0][0] = '✕';
		wrapper.setProps({boardData: temp});
		expect(wrapper.find(Square).first().props().isActive).toBe(false);
		temp[0][0] = ' ';
		wrapper.setProps({boardData: temp, newGameHasStarted: false});
		expect(wrapper.find(Square).first().props().isActive).toBe(false);
		wrapper.setProps({boardData: temp, newGameHasStarted: true, gameWon: true});
		expect(wrapper.find(Square).first().props().isActive).toBe(false);
	});

	it('inner TTT hover', () => {
		const innerHover = jest.fn();
		wrapper.setProps({listenForHover: innerHover});

		wrapper.find('.smallTile').first().simulate('mouseOver');
		expect(innerHover).toHaveBeenCalledWith(0, "inner");

		innerHover.mockClear()
		wrapper.setProps({availableBoard: 9});
		wrapper.find('.smallTile').first().simulate('mouseOver');
		expect(innerHover).toHaveBeenCalledWith(0, "inner");

		innerHover.mockClear()
		wrapper.setProps({availableBoard: 2});
		wrapper.find('.smallTile').first().simulate('mouseOver');
		expect(innerHover).toHaveBeenCalledTimes(0);

		innerHover.mockClear()
		let temp = wrapper.props().boardData;
		temp[0][0] = '✕';
		wrapper.setProps({availableBoard: 0, boardData: temp});
		wrapper.find('.smallTile').first().simulate('mouseOver');
		expect(innerHover).toHaveBeenCalledTimes(0);
	});



})


describe('outer TTT renders children properly', () => { 
	const defProps = {
		isBoardSet: false,
	    boardData: [
	        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
	        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
	        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
	        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
	        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
	        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
	        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
	        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
	        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
	        [ " ", " ", " ", " ", " ", " ", " ", " ", " " ],
	        [ [], [], [], [], [], [], [], [], [], [] ],
	        [ null, null, null, null, null, null, null, null, null ] //check if [9] is the same thing
	    ],
	    availableBoard: 0,
	    newGameHasStarted: true,
	    gameWon: false,
	    tileHovered: [null, null],
	}
	const outerWrapper = mount(<TTT 
		{...defProps}
	/>);

	it('outer TTT renders 9 inner TTTs', () => {
		expect(outerWrapper.find(TTT).children().find(TTT).length).toBe(9);
	});


	it('outer TTT renders innerboard winner conditionally', () => {
		expect(outerWrapper.find('.innerBoardWinner').exists()).toBe(false);
		let temp = outerWrapper.props().boardData
		temp[9][0] = '✕';
		temp[11][0] = true;
		outerWrapper.setProps({boardData: temp});
		expect(outerWrapper.find('.innerBoardWinner').exists()).toBe(true);

		temp[9][0] = ' ';
		temp[11][0] = null;
		outerWrapper.setProps({boardData: temp});
	});

	it('outer TTT calls function passed as prop to inner TTT onTransiionEnd', () => {
		const innerCompTrans = jest.fn(), outerCompTrans = jest.fn();
		outerWrapper.setProps({completeTransition: outerCompTrans});
		const innerWrapper = outerWrapper.find('.innerTable').first();
		innerWrapper.simulate('transitionEnd');
		expect(outerCompTrans).toHaveBeenCalledTimes(2);
	})

	it('outer TTT hover', () => {
		const outerHover = jest.fn();
		outerWrapper.setProps({listenForHover: outerHover});
		outerWrapper.find('.smallTile').first().simulate('mouseOver');
		expect(outerHover).toHaveBeenCalledWith(0, "outer");
	});

	it('inner TTT showBackgroundColor', () => {

		expect(outerWrapper.find('.backgroundColor').length).toBe(1);

		outerWrapper.setProps({availableBoard: 9});
		expect(outerWrapper.find('.backgroundColor').length).toBe(9);

		outerWrapper.setProps({availableBoard: 1, tileHovered: [1, 0]});
		expect(outerWrapper.find('.backgroundColor').length).toBe(2);

		outerWrapper.setProps({tileHovered: [null, null]});
		expect(outerWrapper.find('.backgroundColor').length).toBe(1);

		outerWrapper.setProps({availableBoard: 0, newGameHasStarted: false});
		expect(outerWrapper.find('.backgroundColor').length).toBe(0);

		outerWrapper.setProps({gameWon: true, newGameHasStarted: true});
		expect(outerWrapper.find('.backgroundColor').length).toBe(0);

		outerWrapper.setProps({gameWon: false});
		expect(outerWrapper.find('.backgroundColor').length).toBe(1);

	});


});