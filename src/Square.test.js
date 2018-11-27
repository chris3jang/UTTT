import React from 'react';
import ReactDOM from 'react-dom';
import Square from './Square';

import { mount, shallow } from 'enzyme';


const xMark = { content: '✕' };
const oMark = { content: '◯' };


it('square content accurately represents mark', () => {
	const wrapper = shallow(<Square position={[0, 0]} content={' '} />);
	expect(wrapper.text()).toBe(' ');
	wrapper.setProps(xMark);
	expect(wrapper.text()).toBe('✕');
	wrapper.setProps(oMark);
	expect(wrapper.text()).toBe('◯');
});

describe('<Square /> clicking', () => {
	it('clicking on square calls function passed as prop', () => {
		const testFunc = jest.fn();
		const wrapper = shallow(<Square 
			position={[0, 0]} 
			content={' '} 
			availableBoard={0} 
			gameWon={false} 
			listenForMove={testFunc}
		/>);
		wrapper.simulate('click');
		expect(testFunc).toHaveBeenCalled();
	});

	it('clicking on unavailable square does not call function passed as prop', () => {
		const testFunc = jest.fn();
		const wrapper = shallow(<Square 
			position={[0, 0]} 
			content={' '} 
			availableBoard={9} 
			newGameHasStarted={false} 
			gameWon={false} 
			listenForMove={testFunc}
		/>);
		wrapper.simulate('click');
		wrapper.setProps({availableBoard: 1, newGameHasStarted: true});
		wrapper.simulate('click');
		wrapper.setProps({content: '✕'});
		wrapper.simulate('click');
		wrapper.setProps({content: '◯'});
		wrapper.simulate('click');
		wrapper.setProps({content: ' ', gameWon: true});
		wrapper.simulate('click');
		expect(testFunc).toHaveBeenCalledTimes(0);

	})
});