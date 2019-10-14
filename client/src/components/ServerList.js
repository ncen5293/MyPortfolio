import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import Lobby from './Lobby';
import '../styles/Game.css';

class ServerList extends Component {
  render() {
    const rowTest = this.props.rowTest;
    const lobbies = this.props.lobbyList.map((lobby, i) => {
      let locked = 'lock open';
      if (lobby.password.length > 0) {
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
        <Table celled padded size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1}></Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Name</Table.HeaderCell>
              <Table.HeaderCell width={2} textAlign='center'>Host</Table.HeaderCell>
              <Table.HeaderCell width={2} textAlign='center'>Users</Table.HeaderCell>
              <Table.HeaderCell width={2}></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {lobbies}
          {rowTest}
          {rowTest}
          {rowTest}
          {rowTest}
          {rowTest}
          {rowTest}
          {rowTest}
          {rowTest}
          {rowTest}
          {rowTest}
          {rowTest}
          {rowTest}
        </Table>
      </div>
    )
  }
}

export default ServerList;
