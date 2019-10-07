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
        <div className='group-box'>
          <div className='list-buttons'>
            <Button.Group basic size='mini'>
              <Button onClick={() => this.props.toggleChat('global')}>Global</Button>
              <Button active onClick={() => this.props.toggleChat('players')}>Players</Button>
            </Button.Group>
          </div>
          <div className='player-list' >
            <List divided>
              <List.Item>
                <List.Icon name='users' />
              </List.Item>
              {playerList}
            </List>
          </div>
          <div className='chat-input'>
            Users Online: {this.props.players.length}
          </div>
        </div>
      );
    } else if (this.props.chatType === 'global') {
      const messageList = this.props.messages.map((message, i) => {
        return (<List.Item key={i}>
                  <List.Content>
                    <List.Header>{message.name} ({message.time}) :</List.Header>
                    {message.mess}
                  </List.Content>
                </List.Item>)
      });

      return (
        <div className='group-box'>
          <div className='list-buttons'>
            <Button.Group basic size='mini'>
              <Button active onClick={() => this.props.toggleChat('global')}>Global</Button>
              <Button onClick={() => this.props.toggleChat('players')}>Players</Button>
            </Button.Group>
          </div>
          <div className='player-list chat-list' >
            <List divided>
              <List.Item>
                <List.Icon name='discussions' />
              </List.Item>
              {messageList}
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
              value={this.props.chatInput}
            />
          </div>
        </div>
      );
    }

  }
}

export default PlayerList;
