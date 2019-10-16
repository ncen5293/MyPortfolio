import React, { Component } from 'react';
import ServerListFilter from './ServerListFilter';
import ServerList from './ServerList';
import '../styles/Game.css';

class ServerBrowser extends Component {
  render() {
    return (
      <div className='server-browser'>
        <ServerListFilter
          hideFullLobbies={this.props.hideFullLobbies}
          onLobbiesCheckChange={this.props.onLobbiesCheckChange}
          filterInput={this.props.filterInput}
          onFilterChange={this.props.onFilterChange}
          onFilterKeyPress={this.props.onFilterKeyPress}
          onLobbyNameChange={this.props.onLobbyNameChange}
          onPasswordChange={this.props.onPasswordChange}
          onLobbyCreateToggle={this.props.onLobbyCreateToggle}
          onSubmitLobby={this.props.onSubmitLobby}
          isCreateLobbyOpen={this.props.isCreateLobbyOpen}
        />
        <ServerList
          lobbyList={this.props.lobbyList}
          hideFullLobbies={this.props.hideFullLobbies}
          filterInput={this.props.filterInput}
          joinLobby={this.props.joinLobby}
        />
      </div>
    )
  }
}

export default ServerBrowser;