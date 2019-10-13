import React, { Component } from 'react';
import { Card, Table, Header, Icon, Button } from 'semantic-ui-react';
import '../styles/Game.css';

class Lobby extends Component {
  render() {
    const lobby = this.props.lobby;
    return (
      <Table.Row>
        <Table.Cell>
          <Header as='h2' textAlign='center'>
            <Icon name={this.props.locked} />
          </Header>
        </Table.Cell>
        <Table.Cell>{lobby.name}</Table.Cell>
        <Table.Cell>
          {lobby.type}
        </Table.Cell>
        <Table.Cell textAlign='right'>
          {lobby.playerCount}/{lobby.lobbySize}
        </Table.Cell>
        <Table.Cell>
          <Button onClick={() => this.props.joinLobby(lobby.id)}>
            Join
          </Button>
        </Table.Cell>
      </Table.Row>
    )
  }
}

export default Lobby;
