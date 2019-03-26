import React from 'react';
import ReactDOM from 'react-dom';
import WinMark from '../WinMark';

import renderer from 'react-test-renderer';

import { mount, shallow } from 'enzyme';

const defProps = {
	isBoardSet: true,
	boardWinner: ' ',
	finalBoardWinPositions: [],
	winID: "",
	tileHovered: [0,0],
	changedClassName: "winMark"
};

describe('default <WinMark /> content accurately represents mark', () => {
	it('renders a snapshot', () => {
  		const tree = renderer.create(
  			<WinMark
  				{...defProps}>
  			</WinMark>).toJSON();
  		expect(tree).toMatchSnapshot();
	});

	it('renders default props', () => {
		const wrapper = shallow(<WinMark {...defProps} />);
	})
});

it('inner board <WinMark /> <path /> is present and absent when board is and isnt won', () => {
  const wrapper = shallow(<WinMark {...defProps} />);
  expect(wrapper.find('path').exists()).toBe(false);
  wrapper.setProps({ boardWinner: '✕'});
  expect(wrapper.find('path').exists()).toBe(true);
});

it('final board <WinMark /> <path /> is present and absent when board is and isnt won', () => {
  const wrapper = shallow(<WinMark {...defProps} />);
  wrapper.setProps({isBoardSet: false})
  expect(wrapper.find('path').exists()).toBe(false);
  wrapper.setProps({ finalBoardWinPositions: [0, 1, 2]});
  expect(wrapper.find('path').exists()).toBe(true);
});

it('<WinMark /> <path /> has proper attributes for position', () => {
  const wrapper = shallow(<WinMark {...defProps} />);
  wrapper.setProps({ boardWinner: '✕', winID: "012"})
  expect(wrapper.find('path').props()).toHaveProperty('d', "M10 29 L152 29");
  //delete these, if one works they will all work
  wrapper.setProps({ boardWinner: '✕', winID: "345"})
  expect(wrapper.find('path').props()).toHaveProperty('d', "M10 81 L152 81");
  wrapper.setProps({ boardWinner: '✕', winID: "678"})
  expect(wrapper.find('path').props()).toHaveProperty('d', "M10 133 L152 133");
  wrapper.setProps({ boardWinner: '✕', winID: "036"})
  expect(wrapper.find('path').props()).toHaveProperty('d', "M29 10 L29 152");
  wrapper.setProps({ boardWinner: '✕', winID: "147"})
  expect(wrapper.find('path').props()).toHaveProperty('d', "M81 10 L81 152");
  wrapper.setProps({ boardWinner: '✕', winID: "258"})
  expect(wrapper.find('path').props()).toHaveProperty('d', "M132 10 L132 152");
  wrapper.setProps({ boardWinner: '✕', winID: "048"})
  expect(wrapper.find('path').props()).toHaveProperty('d', "M10 10 L152 152");
  wrapper.setProps({ boardWinner: '✕', winID: "246"})
  expect(wrapper.find('path').props()).toHaveProperty('d', "M10 152 L152 10");
});

it('<WinMark /> <path /> has proper attributes for position', () => {
  const wrapper = shallow(<WinMark {...defProps} />);
  wrapper.setProps({ isBoardSet: false, winID: "012", finalBoardWinPositions: [0, 1, 2]})
  expect(wrapper.find('path').props()).toHaveProperty('d', "M10 29 L152 29");
});

//test that when boardWinner becomes either x or o instead of ' ', that 1) winID isn't "", 2) changedClassName has hidden and instant (after transition)







