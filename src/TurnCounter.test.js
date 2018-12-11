import React from 'react';
import ReactDOM from 'react-dom';
import TurnCounter from './TurnCounter';

import renderer from 'react-test-renderer';

import { mount, shallow } from 'enzyme';

const wrapper = shallow(<TurnCounter newGameHasStarted={false} gameWon={false} roomID={null} player={null} left={"turnLeftNext"} right={"turnRightNext"}/>);

describe('properties', () => { 
	it('default', () => {
		expect(wrapper.props().className).toBe("gameNotInPlay");
		expect(wrapper.find('.nameContainer').props().className).toBe("nameContainer roomIDRemoved");
	});

	it('game starts', () => {
		wrapper.setProps({newGameHasStarted: true});
		expect(wrapper.props().className).toBe("counterContainer");
	})

	it('game ends', () => {
		wrapper.setProps({gameWon: true});
		expect(wrapper.props().className).toBe("gameNotInPlay");
	})
})