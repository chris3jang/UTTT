import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Game from '../Game';

import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';

const props = {
  isGameActive: false,
  gameSettings: "three",
  modal: null,
  onlineRoomCreateDirections: 'createGame',
  roomID: null,
  player: null,
  playerNum: null,
  turnPlayedData: null,
  exitGame: null
}

const wrapper = mount(<App {...props} />);
it('default', () => {
  expect(wrapper.find(Game).props().newGameHasStarted).toBe(false);
});

it('snapshot', () => {
  const tree = renderer.create(
        <App
          {...props}>
        </App>).toJSON();
      expect(tree).toMatchSnapshot();
})

it('snapshot after game in play', () => {
  wrapper.setProps({isGameActive: true})
  const tree = renderer.create(
        <App
          {...props}>
        </App>).toJSON();
      expect(tree).toMatchSnapshot();
})

describe('nav to game', () => {

  it('local', () => {
    wrapper.instance().selectMenuOption("local");
    wrapper.update();
    expect(wrapper.find(Game).props().newGameHasStarted).toBe(true);
    wrapper.setProps({props});
  });

  it('exit', () => {
    wrapper.setProps({isGameActive: true});
    expect(wrapper.find(Game).props().newGameHasStarted).toBe(true);
    wrapper.instance().selectMenuOption("exit");
    wrapper.update();
    expect(wrapper.find(Game).props().newGameHasStarted).toBe(false);
  });

  it('rules', () => {
    wrapper.instance().selectMenuOption("rules");
    wrapper.update();
  })
  


});