import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import axios from 'axios';
import MenuButtons from './MenuButtons';
import Statement from './Statement';
import '../styles/Home.css';

class CommentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
  }

  componentDidMount = async () => {
    await this.getComments();
  }

  changePage = (type) => {
    if (type === 'My Projects') {
      window.location.replace('/');
    } else if (type === 'My Hobbies') {
      window.location.replace('/');
    } else if (type === 'My Abilities') {
      window.location.replace('/');
    } else if (type === 'Comments Page') {
      window.location.replace('/comments');
    } else {
      return false;
    }
  }

  onMenuToggle = (type) => {
    this.setState(prevState => ({ isMenuOpen: !prevState.isMenuOpen }));
    this.changePage(type);
  }

  onMenuButtonClick = (type) => {
    this.onMenuToggle(type);
  }

  getComments = async () => {
    await axios.get(`http://localhost:8080/portfolio/comments`)
      .then(res => {
        this.setState({ comments: res.data });
      })
      .catch(error => {
        console.error(error)
      })
  }

  createComment = (name,comment) => {
    axios.post(`http://localhost:8080/portfolio/comments`,
      {
        name: name,
        comment: comment
      })
      .then(res => {
        this.getComments();
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    const visibleProjectModalButton = this.state.visibleProjectModalButton;
    const visibleAbilitiesModalButton = this.state.visibleAbilitiesModalButton;
    const visibleHobbiesModalButton = this.state.visibleHobbiesModalButton;
    const visibleMenu = this.state.visibleMenu;
    return (
      <div className='App-header'>
        <Menu widths={3}>
          <Menu.Item>
            <MenuButtons
              visibleMenu={visibleMenu}
              onMenuToggle={this.onMenuToggle}
              open={this.state.isMenuOpen}
              visibleProjectModalButton={visibleProjectModalButton}
              visibleAbilitiesModalButton={visibleAbilitiesModalButton}
              visibleHobbiesModalButton={visibleHobbiesModalButton}
              onButtonClick={this.onMenuButtonClick}
            />
          </Menu.Item>
          <Menu.Item>
            <h2>
              Nicky Cen
              <a href='https://www.linkedin.com/in/nicky-cen/'>
                <Icon link name='linkedin' />
              </a>
              <a href='https://github.com/ncen5293'>
                <Icon link name='github' />
              </a>
            </h2>
          </Menu.Item>
          <Menu.Item>
            -
          </Menu.Item>
        </Menu>
        <Statement
          visible={true}
        />
      </div>
    )
  }
}

export default CommentsPage;
