import React, { Component } from 'react';
import { Card, Table, Header, Icon, Button } from 'semantic-ui-react';
import '../styles/Game.css';

class Lobby extends Component {
  render() {
    const lobby = this.props.lobby;
    return (
      <Table.Row>
        <Table.Cell>
          <Header textAlign='center'>
            <Icon name={this.props.locked} />
          </Header>
        </Table.Cell>
        <Table.Cell textAlign='center'>{lobby.name}</Table.Cell>
        <Table.Cell textAlign='center'>
          {lobby.type}
        </Table.Cell>
        <Table.Cell textAlign='center'>
          {lobby.playerCount}/{lobby.lobbySize}
        </Table.Cell>
        <Table.Cell textAlign='center'>
          <Button onClick={() => this.props.joinLobby(lobby.id)}>
            Join
          </Button>
        </Table.Cell>
      </Table.Row>
    )
  }
}

export default Lobby;
