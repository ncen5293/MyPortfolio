import React, { Component } from 'react';
import '../styles/Home.css';

class GameWindow extends Component {
  render() {
    return (
      <div>
        {this.props.players}
      </div>
    )
  }
}

export default GameWindow;
