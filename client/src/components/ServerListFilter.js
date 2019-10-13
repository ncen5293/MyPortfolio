import React, { Component } from 'react';
import { Input, Checkbox, Menu } from 'semantic-ui-react';
import CreateLobby from './CreateLobby';
import '../styles/Game.css';

class ServerListFilter extends Component {
  render() {
    return (
      <div className='server-filter'>
        <Menu widths={3}>
          <Menu.Item>
            <Input
              size='mini'
              icon='search'
              placeholder='Filter'
              onKeyPress={this.props.onFilterKeyPress}
              onChange={this.props.onFilterChange}
              value={this.props.filterInput}
              style={{'width': '90%'}}
            />
          </Menu.Item>
          <Menu.Item>
            <Checkbox
              label="Hide Full"
              checked={this.props.hideFullLobbies}
              onChange={this.props.onLobbiesCheckChange}
            />
          </Menu.Item>
          <Menu.Item>
            <CreateLobby
              onLobbyNameChange={this.props.onLobbyNameChange}
              onPasswordChange={this.props.onPasswordChange}
              onLobbyCreateToggle={this.props.onLobbyCreateToggle}
              onSubmitLobby={this.props.onSubmitLobby}
              isOpen={this.props.isCreateLobbyOpen}
            />
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default ServerListFilter;
