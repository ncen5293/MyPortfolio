import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import axios from 'axios';
import MenuButtons from './MenuButtons';
import Statement from './Statement';
import CommentForm from './CommentForm';
import Comments from './Comments';
import '../styles/Home.css';

class CommentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      name: '',
      comment: '',
      commentSubmitted: false,
      unableToComment: false
    }
  }

  componentDidMount = async () => {
    await this.getComments();
  }

  changePage = (type) => {
    if (type === 'My Projects') {
      localStorage.setItem('redirect', 'projects');
      window.location.replace('/');
    } else if (type === 'My Hobbies') {
      localStorage.setItem('redirect', 'hobbies');
      window.location.replace('/');
    } else if (type === 'My Abilities') {
      localStorage.setItem('redirect', 'abilities');
      window.location.replace('/');
    } else if (type === 'Comments Page') {
      window.location.replace('/comments');
    } else if (type === 'Portfolio Page') {
      window.location.replace('/');
    } else if (type === 'Coming Soon') {
      window.location.replace('/soon');
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
    await axios.get('/portfolio/comments')
      .then(res => {
        console.log(res.data);
        this.setState({ comments: res.data.comments });
      })
      .catch(error => {
        console.error(error)
      })
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value});
  }

  onCommentChange = (event) => {
    this.setState({comment: event.target.value});
  }

  submitComment = (event) => {
    const name = this.state.name;
    const comment = this.state.comment;
    if (name.length === 0 || comment.length === 0) {
      this.setState({ unableToComment: true, commentSubmitted: false });
    } else {
      axios.post('/portfolio/comments',
        {
          name: this.state.name,
          comment: this.state.comment
        })
        .then(res => {
          this.setState({ comment: '', name: '', unableToComment: false, commentSubmitted: true });
          console.log(this.state.commentSubmitted);
          this.getComments();
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  render() {
    const visibleProjectModalButton = this.state.visibleProjectModalButton;
    const visibleAbilitiesModalButton = this.state.visibleAbilitiesModalButton;
    const visibleHobbiesModalButton = this.state.visibleHobbiesModalButton;
    const visibleMenu = this.state.visibleMenu;
    const comments = this.state.comments;
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
            <span>Comments Page</span>
          </Menu.Item>
        </Menu>
        <Statement
          visible={true}
        />
        <CommentForm
          onSubmit={this.submitComment}
          onNameChange={this.onNameChange}
          onCommentChange={this.onCommentChange}
          name={this.state.name}
          comment={this.state.comment}
          commentSubmitted={this.state.commentSubmitted}
          unableToComment={this.state.unableToComment}
        />
        <Comments comments={comments} />
      </div>
    )
  }
}

export default CommentsPage;
