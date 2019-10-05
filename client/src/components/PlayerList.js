import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import '../styles/Game.css';

class PlayerList extends Component {
  render() {
    const playerList = this.props.players.map((player, i) => {
      return (<List.Item key={i}>
                <List.Content>{player}</List.Content>
              </List.Item>)
    })
    return (
      <div className='player-list' >
        <List divided>
          <List.Item>
            <List.Icon name='users' />
          </List.Item>
          {playerList}
        </List>
      </div>
    )
  }
}

export default PlayerList;
