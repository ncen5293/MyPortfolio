import React, { Component } from 'react';
import { Table, Header, Icon, Button } from 'semantic-ui-react';
import '../styles/Game.css';

class LobbyColumn extends Component {
  render() {
    const lobby = this.props.lobby;
    console.log(lobby);
    return (
      <Table.Row>
        <Table.Cell>
          <Header textAlign='center'>
            <Icon name={this.props.locked} />
          </Header>
        </Table.Cell>
        <Table.Cell textAlign='center'>{lobby.Name}</Table.Cell>
        <Table.Cell textAlign='center'>
          {lobby.Host}
        </Table.Cell>
        <Table.Cell textAlign='center'>
          {lobby.Users.length}
        </Table.Cell>
        <Table.Cell textAlign='center'>
          <Button onClick={() => this.props.joinLobby(lobby)}>
            Join
          </Button>
        </Table.Cell>
      </Table.Row>
    )
  }
}

export default LobbyColumn;
