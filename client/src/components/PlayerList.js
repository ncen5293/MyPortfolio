import React, { Component } from 'react';
import { List, Button, Input } from 'semantic-ui-react';
import '../styles/Game.css';

class PlayerList extends Component {
  render() {
    if (this.props.chatType === 'players') {
      const playerList = this.props.players.map((player, i) => {
        return (<List.Item key={i}>
                  <List.Content>{player}</List.Content>
                </List.Item>)
      });

      return (
        <div className='group-box' >
          <List divided>
            <List.Item>
            <Button.Group basic size='mini'>
              <Button onClick={() => this.props.toggleChat('global')}>Global</Button>
              <Button onClick={() => this.props.toggleChat('players')}>Players</Button>
            </Button.Group>
            </List.Item>
            <List.Item>
              <List.Icon name='users' />
            </List.Item>
            {playerList}
          </List>
        </div>
      );
    } else if (this.props.chatType === 'global') {
      return (
        <div className='group-box'>
          <div className='player-list' >
            <List divided>
              <List.Item>
              <Button.Group basic size='mini'>
                <Button onClick={() => this.props.toggleChat('global')}>Global</Button>
                <Button onClick={() => this.props.toggleChat('players')}>Players</Button>
              </Button.Group>
              </List.Item>
              <List.Item>
                <List.Icon name='discussions' />
              </List.Item>

            </List>
          </div>
          <div className='chat-input'>
            <Input
              size='mini'
              icon='chat'
              placeholder='Chat'
              style={{'width': '95%'}}
              onChange={this.props.chatChange}
              onKeyPress={this.props.chatMessage}
            />
          </div>
        </div>
      );
    }

  }
}

export default PlayerList;
