import React, { Component } from 'react';
import { Header, Table, Icon, Button } from 'semantic-ui-react';
import '../styles/Game.css';

class ServerBrowser extends Component {
  render() {
    const lobbies = this.props.lobbyList.map((lobby, i) => {
      let locked = 'lock open';
      if (lobby.isLocked) {
        locked = 'lock';
      }
      return (
        <Table.Row>
          <Table.Cell>
            <Header as='h2' textAlign='center'>
              <Icon name={locked} />
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
    });
    const rowTest = <Table.Row>
      <Table.Cell>
        <Header as='h2' textAlign='center'>
          A
        </Header>
      </Table.Cell>
      <Table.Cell singleLine>Lobby 1</Table.Cell>
      <Table.Cell>
        Something
      </Table.Cell>
      <Table.Cell textAlign='right'>
        1/4
      </Table.Cell>
      <Table.Cell>
        Join
      </Table.Cell>
    </Table.Row>;

    return (
      <div className='server-list'>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine></Table.HeaderCell>
              <Table.HeaderCell>Lobby Name</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Players</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header as='h2' textAlign='center'>
                  A
                </Header>
              </Table.Cell>
              <Table.Cell singleLine>Lobby 1</Table.Cell>
              <Table.Cell>
                Something
              </Table.Cell>
              <Table.Cell>
                1/4
              </Table.Cell>
              <Table.Cell>
                <Button>
                  Join
                </Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h2' textAlign='center'>
                  A
                </Header>
              </Table.Cell>
              <Table.Cell singleLine>Lobby 2</Table.Cell>
              <Table.Cell>
                Tabletop
              </Table.Cell>
              <Table.Cell>
                4/10
              </Table.Cell>
              <Table.Cell>
                <Button>
                  Join
                </Button>
              </Table.Cell>
            </Table.Row>
            {lobbies}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default ServerBrowser;
