import React, { Component } from 'react';
import { Input, Checkbox, Menu } from 'semantic-ui-react';
import '../styles/Game.css';

class ServerListFilter extends Component {
  render() {
    return (
      <div className='server-filter'>
        <Menu widths={2}>
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
              label="Don't show full lobbies"
              checked={this.props.checked}
              onChange={this.props.onLobbiesCheckChange}
            />
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default ServerListFilter;
