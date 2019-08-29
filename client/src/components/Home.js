import React, { Component } from 'react';
import { Menu, Transition, Checkbox, Icon } from 'semantic-ui-react';
import HomeButtons from './HomeButtons';
import AbilitiesPage from './AbilitiesPage';
import ProjectsPage from './ProjectsPage';
import HobbiesPage from './HobbiesPage';
import MenuButtons from './MenuButtons';
import Statement from './Statement';
import '../styles/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleProjectButton: false,
      visibleAbilitiesButton: false,
      visibleHobbiesButton: false,
      buttonClicked: false,
      visibleProjectsPage: false,
      visibleAbilitiesPage: false,
      visibleHobbiesPage: false,
      isMenuOpen: false,
      menuChanging: false,
      visibleProjectModalButton: false,
      visibleAbilitiesModalButton: false,
      visibleHobbiesModalButton: false,
      visibleMenu: false,
      onePagePortfolio: false
    }
    this.onButtonClick = this.onButtonClick.bind(this);
    this.toggleButtonVisibility = this.toggleButtonVisibility.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount = () => {
    this.toggleButtonVisibility();
  }

  allPagesClosed = () => {
    const visibleProjectsPage = this.state.visibleProjectsPage;
    const visibleAbilitiesPage = this.state.visibleAbilitiesPage;
    const visibleHobbiesPage = this.state.visibleHobbiesPage;
    console.log(visibleProjectsPage, visibleAbilitiesPage, visibleHobbiesPage);
    if (!visibleProjectsPage && !visibleAbilitiesPage && !visibleHobbiesPage) {
      console.log('true')
      return true;
    } else {
      return false;
    }
  }

  onButtonClick = (type) => {
    this.toggleButtonVisibility();
    if (!this.changePage(type)) {
      this.toggleButtonVisibility();
    }
  }

  toggleButtonVisibility = () => {
    if (!this.state.buttonClicked) {
      this.setState(prevState => ({ visibleProjectButton: !prevState.visibleProjectButton, buttonClicked: !prevState.buttonClicked }));
      window.setTimeout(() => {this.setState(prevState => ({ visibleHobbiesButton: !prevState.visibleHobbiesButton }));}, 100);
      window.setTimeout(() => {this.setState(prevState => ({ visibleAbilitiesButton: !prevState.visibleAbilitiesButton }));}, 200);
      window.setTimeout(() => {this.setState(prevState => ({ buttonClicked: !prevState.buttonClicked }));}, 700);
    }
  }

  changePage = (type) => {
    if (type === 'My Projects') {
      window.setTimeout(() => {this.setState(prevState => ({
          visibleProjectsPage: !prevState.visibleProjectsPage,
          visibleHobbiesPage: false,
          visibleAbilitiesPage: false,
          visibleMenu: true
        }));
        if (this.allPagesClosed()) {
          this.setState({visibleMenu: false});
          this.toggleButtonVisibility();
        }
      }, 700);
      return true;
    } else if (type === 'My Hobbies') {
      window.setTimeout(() => {this.setState(prevState => ({
          visibleHobbiesPage: !prevState.visibleHobbiesPage,
          visibleProjectsPage: false,
          visibleAbilitiesPage: false,
          visibleMenu: true
        }));
        if (this.allPagesClosed()) {
          this.setState({visibleMenu: false});
          this.toggleButtonVisibility();
        }
      }, 700);
      return true;
    } else if (type === 'My Abilities') {
      window.setTimeout(() => {this.setState(prevState => ({
          visibleAbilitiesPage: !prevState.visibleAbilitiesPage,
          visibleHobbiesPage: false,
          visibleProjectsPage: false,
          visibleMenu: true
        }));
        if (this.allPagesClosed()) {
          this.setState({visibleMenu: false});
          this.toggleButtonVisibility();
        }
      }, 700);
      return true;
    } else if (type === 'Comments Page') {
      window.location.replace('/comments');
    } else {
      return false;
    }
  }

  onMenuToggle = (type) => {
    if (this.state.isMenuOpen && !this.state.menuChanging) {
      this.setState({ menuChanging: true });
      this.changePage(type);
      window.setTimeout(() => {this.setState(prevState => ({ visibleProjectModalButton: !prevState.visibleProjectModalButton }));}, 50);
      window.setTimeout(() => {this.setState(prevState => ({ visibleAbilitiesModalButton: !prevState.visibleAbilitiesModalButton }));}, 125);
      window.setTimeout(() => {this.setState(prevState => ({ visibleHobbiesModalButton: !prevState.visibleHobbiesModalButton }));}, 200);
      window.setTimeout(() => {this.setState({ isMenuOpen: false, menuChanging: false });}, 700);
    } else if (!this.state.isMenuOpen && !this.state.menuChanging) {
      this.setState({ isMenuOpen: true, menuChanging: true });
      window.setTimeout(() => {this.setState(prevState => ({ visibleProjectModalButton: !prevState.visibleProjectModalButton }));}, 50);
      window.setTimeout(() => {this.setState(prevState => ({ visibleAbilitiesModalButton: !prevState.visibleAbilitiesModalButton }));}, 125);
      window.setTimeout(() => {this.setState(prevState => ({ visibleHobbiesModalButton: !prevState.visibleHobbiesModalButton }));}, 200);
      window.setTimeout(() => {this.setState({ menuChanging: false });}, 700);
    }
  }

  onMenuButtonClick = (type) => {
    this.onMenuToggle(type);
  }

  handlePageChange = () => {
    this.setState(prevState => ({ onePagePortfolio: !prevState.onePagePortfolio }));
  }

  render() {
    const onePagePortfolio = this.state.onePagePortfolio;
    const visibleProjectButton = onePagePortfolio ? !onePagePortfolio : this.state.visibleProjectButton;
    const visibleAbilitiesButton = onePagePortfolio ? !onePagePortfolio : this.state.visibleAbilitiesButton;
    const visibleHobbiesButton = onePagePortfolio ? !onePagePortfolio : this.state.visibleHobbiesButton;
    const visibleProjectsPage = onePagePortfolio ? onePagePortfolio : this.state.visibleProjectsPage;
    const visibleAbilitiesPage = onePagePortfolio ? onePagePortfolio : this.state.visibleAbilitiesPage;
    const visibleHobbiesPage = onePagePortfolio ? onePagePortfolio : this.state.visibleHobbiesPage;
    const visibleProjectModalButton = this.state.visibleProjectModalButton;
    const visibleAbilitiesModalButton = this.state.visibleAbilitiesModalButton;
    const visibleHobbiesModalButton = this.state.visibleHobbiesModalButton;
    const visibleMenu = onePagePortfolio ? onePagePortfolio : this.state.visibleMenu;
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
            <Checkbox
              checked={onePagePortfolio}
              label='On One Page'
              onChange={this.handlePageChange}
            />
          </Menu.Item>
        </Menu>
        <Statement
          visible={onePagePortfolio ? onePagePortfolio : visibleProjectButton}
        />
        <HomeButtons
          visibleButton={visibleProjectButton}
          onButtonClick={this.onButtonClick}
          leftButton='My Projects'
          rightButton='Coming Soon'
          position='top'
        />
        <HomeButtons
          visibleButton={visibleAbilitiesButton}
          onButtonClick={this.onButtonClick}
          leftButton='My Hobbies'
          rightButton='Coming Soon'
          position='middle'
        />
        <HomeButtons
          visibleButton={visibleHobbiesButton}
          onButtonClick={this.onButtonClick}
          leftButton='My Abilities'
          rightButton='Comments Page'
          position='bottom'
        />
        <ProjectsPage
          visible={visibleProjectsPage}
        />
        <AbilitiesPage
          visible={visibleAbilitiesPage}
        />
        <HobbiesPage
          visible={visibleHobbiesPage}
        />
      </div>
    )
  }
}

export default Home;
