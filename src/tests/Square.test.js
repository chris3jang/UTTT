import React from 'react';
import ReactDOM from 'react-dom';
import Square from '../Square';

import { mount, shallow } from 'enzyme';

describe('<Square /> content accurately represents mark', () => {
	const wrapper = shallow(<Square position={[0, 0]} content={' '} />);
	it('square content shows blank', () => {

		expect(wrapper.text()).toBe(' ');
	});
	it('square content shows ✕', () => {
		wrapper.setProps({content: '✕'});
		expect(wrapper.text()).toBe('✕');
	});
	
	it('square content shows ◯', () => {
		wrapper.setProps({content: '◯'});
		expect(wrapper.text()).toBe('◯');
	});
});

describe('<Square /> clicking', () => {
	const testClick = jest.fn(), testNotClicked = jest.fn();
	const wrapper = shallow(<Square 
		position={[0, 0]} 
	/>);
	it('clicking on active square calls function passed as prop', () => {
		wrapper.setProps({isActive: true, listenForMove: testClick})
		wrapper.simulate('click');
		expect(testClick).toHaveBeenCalled();
	});

	it('clicking on inactive square does not call function passed as prop', () => {
		wrapper.setProps({isActive: false, listenForMove: testNotClicked});
		wrapper.simulate('click');
		expect(testNotClicked).toHaveBeenCalledTimes(0);
	})
});