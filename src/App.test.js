import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Game from './Game';

import { mount, shallow } from 'enzyme';

const props = {
  hasGameStarted: false,
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

describe('nav to game', () => {

  it('local', () => {
    wrapper.instance().selectMenuOption("local");
    wrapper.update();
    expect(wrapper.find(Game).props().newGameHasStarted).toBe(true);
    wrapper.setProps({props});
  });

  it('exit', () => {
    wrapper.setProps({newGameHasStarted: true});
    wrapper.instance().selectMenuOption("exit");

  });
});