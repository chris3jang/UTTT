import React from 'react';
import ReactDOM from 'react-dom';
import TTT from '../TTT.js';
import WinMark from '../WinMark.js';
import Square from '../Square.js';
import TurnCounter from '../TurnCounter.js';
import Game from '../Game.js';

import { mount, shallow } from 'enzyme';

//offline
const defGameProps = {
	newGameHasStarted: false,
	gameSettings: "three",
	player: null,
	playerNum: null,
	roomID: null,
	turnPlayedData: null,
	exitGame: null
}

const defTTTProps = {
	newGameHasStarted: false, 
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
	availableBoard: 9, 
	tileHovered: [null, null], 
	gameWon: false
}



const shal = shallow(<Game {...defGameProps} />);

const deep = mount(<Game {...defGameProps} />)

const defState = {
      turn: null,
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
      availableBoard: 9,
      waitingForTurn: null,
      tileHovered: [null, null],
      gameWon: false,
      message: null
    }

describe('', () => { 
	it('make sure intial state is set', () => {
		expect(shal.state()).toMatchObject(defState);
		expect(deep.find(TTT).first().props().newGameHasStarted).toBe(false);
		expect(deep.find(TTT).first().props().isBoardSet).toBe(false);
		//expect(deep.find(TTT).first().props().boardData)
		expect(deep.find(TTT).first().props().availableBoard).toBe(9);
		//expect(deep.find(TTT).first().props().tileHovered)
		expect(deep.find(TTT).first().props().gameWon).toBe(false);
	});

	it('test cWRP newGameHasStarted on start', () => {
		deep.setProps({newGameHasStarted: true});
		expect(deep.find(TTT).first().props().availableBoard).toBe(9);
		expect(deep.state().turn).toBe('✕');
	});

	//prob unecessary
	//it('test cWRP newGameHasStarted on exit', () => {
	//});

	//test CWRP online functions

	//test handleMove ONLINE

	describe('didWin, didWinBoard, didWinGame', () => {

		it('markMove', () => {
			deep.setProps({newGameHasStarted: true});
			deep.instance().handleMove([0, 6]);

			expect(deep.state().turn).toBe('◯');
			expect(deep.find(TTT).first().props().boardData[0][6]).toBe('✕');

		})

		it('didWin/didWinBoard', () => {
			deep.instance().handleMove([6, 0]);
			deep.instance().handleMove([0, 7]);
			deep.instance().handleMove([7, 0]);

			expect(deep.find(TTT).first().props().boardData[9][0]).toBe(' ');
			expect(deep.find(TTT).first().props().boardData[10][0].length).toBe(0);

			deep.instance().handleMove([0, 8]);

			expect(deep.find(TTT).first().props().boardData[10][0].length).toBe(3);
			expect(deep.find(TTT).first().props().boardData[9][0]).toBe('✕');
			expect(deep.find(TTT).first().props().boardData[11][0]).toBe(false);
		})

		it('didWinGame', () => {
			deep.instance().handleMove([8, 1]);
			deep.instance().handleMove([1, 3]);
			deep.instance().handleMove([3, 1]);
			deep.instance().handleMove([1, 4]);
			deep.instance().handleMove([4, 1]);
			deep.instance().handleMove([1, 5]);
			deep.instance().handleMove([5, 2]);
			deep.instance().handleMove([2, 0]);
			deep.instance().handleMove([0, 2]);
			deep.instance().handleMove([2, 1]);
			deep.instance().handleMove([1, 2]);

			deep.instance().handleMove([2, 2]);

			//expect(deep.find(TTT).first().props().boardData[9][0]).toBe('✕');
			expect(deep.find(TTT).first().props().boardData[10][9].length).toBe(3);
		})
		
		
		deep.setProps(defGameProps);

		it('test checkForMagicBox', () => {
			let temp = deep.state().boardData;
			temp[4] = ['✕', '✕', '✕', '✕', '✕', '✕', '✕', '✕', '✕'];
			deep.setProps({newGameHasStarted: true});
			deep.setState({boardData: temp});
			deep.instance().handleMove([0, 4]);
			expect(deep.find(TTT).first().props().availableBoard).toBe(9);
			deep.setProps(defGameProps);
		});
	})

	it('handleHover', () => { 
		deep.setProps({newGameHasStarted: true});
		deep.instance().handleMove([0, 2]);
		deep.instance().handleHover(3, "inner");
		deep.instance().handleHover(2, "outer");
		expect(deep.find(TTT).first().props().tileHovered[0]).toBe(2);
		expect(deep.find(TTT).first().props().tileHovered[1]).toBe(3);
		deep.setProps(defGameProps);
	})

	it('completeTransition', () => {
		deep.setProps({newGameHasStarted: true});
		deep.instance().completeTransition(0);
		expect(deep.find(TTT).first().props().boardData[11][0]).toBe(true);
	})

	it('getTurnClassName', () => {
		deep.setProps({newGameHasStarted: true});

		expect(deep.find(TurnCounter).props().left).toBe("turnLeftCurrent");
		expect(deep.find(TurnCounter).props().right).toBe("turnRightNext");

		let temp = deep.state().boardData;
		temp[0][6] = '✕';
		deep.setState({boardData: temp, availableBoard: 6, turn: '◯'});

		expect(deep.find(TurnCounter).props().left).toBe("turnLeftNext");
		expect(deep.find(TurnCounter).props().right).toBe("turnRightCurrent");

		temp[6][0] = '◯';
		deep.setState({boardData: temp, availableBoard: 0, turn: '✕'});

		expect(deep.find(TurnCounter).props().left).toBe("turnLeftCurrent");
		expect(deep.find(TurnCounter).props().right).toBe("turnRightNext");
	})



});