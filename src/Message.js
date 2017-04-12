import React, { Component } from 'react';
import './Message.css';

class Message extends Component {


  render() {
    return (
      <div id="Message">
        <ul>
        	<li>
        		<p>Play</p>
        	</li>
        	<li>
        		<p>Settings</p>
        	</li>
        	<li>
        		<p>Rules</p>
        	</li>
        </ul>
      </div>
    );
  }
}

export default Message;
