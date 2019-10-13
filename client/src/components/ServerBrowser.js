import React, { Component } from 'react';
import { Header, Table, Icon, Button, Card } from 'semantic-ui-react';
import ServerListFilter from './ServerListFilter';
import ServerList from './ServerList';
import '../styles/Game.css';

class ServerBrowser extends Component {
  render() {
    const rowTest = <Table.Row>
      <Table.Cell>
        <Header textAlign='center'>
          <Icon name='lock open' />
        </Header>
      </Table.Cell>
      <Table.Cell textAlign='center'>name</Table.Cell>
      <Table.Cell textAlign='center'>
        type
      </Table.Cell>
      <Table.Cell textAlign='center'>
        1/4
      </Table.Cell>
      <Table.Cell textAlign='center'>
        <Button>
          Join
        </Button>
      </Table.Cell>
    </Table.Row>;

    return (
      <div className='server-browser'>
        <ServerListFilter
          checked={this.props.hideFullLobbies}
          onLobbiesCheckChange={this.props.onLobbiesCheckChange}
          filterInput={this.props.filterInput}
          onFilterChange={this.props.onFilterChange}
          onFilterKeyPress={this.props.onFilterKeyPress}
        />
        <ServerList
          rowTest={rowTest}
          lobbyList={this.props.lobbyList}
        />
      </div>
    )
  }
}

export default ServerBrowser;
