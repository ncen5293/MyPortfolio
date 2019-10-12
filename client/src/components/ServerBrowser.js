import React, { Component } from 'react';
import { Header, Table, Icon, Button, Card } from 'semantic-ui-react';
import ServerListFilter from './ServerListFilter';
import ServerList from './ServerList';
import '../styles/Game.css';

class ServerBrowser extends Component {
  render() {
    const rowTest = <Card raised>
      <Card.Content>
        <Card.Header>Name</Card.Header>
        <Card.Meta>type</Card.Meta>
        <Card.Description>
          stuff
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button>Join</Button>
      </Card.Content>
    </Card>;

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
