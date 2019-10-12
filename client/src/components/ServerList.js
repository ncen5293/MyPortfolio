import React, { Component } from 'react';
import { Card, Table, Header, Icon, Button } from 'semantic-ui-react';
import Lobby from './Lobby';
import '../styles/Game.css';

class ServerList extends Component {
  render() {
    const rowTest = this.props.rowTest;
    const lobbies = this.props.lobbyList.map((lobby, i) => {
      let locked = 'lock open';
      if (lobby.isLocked) {
        locked = 'lock';
      }
      return (
        <Lobby
          locked={locked}
          lobby={lobby}
        />
      )
    });
    return (
      <div className='server-list'>
        <Card.Group itemsPerRow={3}>

        </Card.Group>
      </div>
    )
  }
}

export default ServerList;
