import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Game from './Game';

import { mount, shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders without crashing smoketest', () => {
  shallow(<App />);
});

it('can render <h1> in App component', () => {
	const wrapper = shallow(<App />)
	expect(wrapper.childAt(1).type()).toBe('div')
})

it('can set todos state in App component and count state number', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.state('hasGameStarted')).toBe(false)
  })

it('can render <Todos> in App component', () => {
    const wrapper = mount(<App />)
    expect(wrapper.find(Game).type()).toBe(Game)
  })

/*
it('can render <Todos> in App component and set custom state in it and count number', () => {
    const wrapper = mount(<App />)
    //wrapper.setState({ todos: custom_todos })
    expect(wrapper.find(Todos).prop('todos').length).toBe(2)
  })
*/
