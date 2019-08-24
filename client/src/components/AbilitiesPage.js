import React, { Component } from 'react';
import { Header, Icon, Transition, Segment, Statistic, Divider } from 'semantic-ui-react';
import '../styles/Home.css';

class AbilitiesPage extends Component {
  render() {
    const visible = this.props.visible;
    return (
      <Transition visible={visible} animation='browse' duration={500}>
        <Segment raised>
          <Header as='h2' icon textAlign='center' dividing>
            <Icon name='id card outline' circular />
            <Header.Content>Skills</Header.Content>
          </Header>
          <Statistic>
            <Statistic.Value>
              C++
            </Statistic.Value>
            <Statistic.Label>4+ Years</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>
              Javascript
            </Statistic.Value>
            <Statistic.Label>2+ Years</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>
              React.JS
            </Statistic.Value>
            <Statistic.Label>2+ Years</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>
              Node.JS
            </Statistic.Value>
            <Statistic.Label>2+ Years</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>
              Python
            </Statistic.Value>
            <Statistic.Label>2+ Years</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>
              HTML/CSS
            </Statistic.Value>
            <Statistic.Label>2+ Years</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>
              Git
            </Statistic.Value>
            <Statistic.Label>3+ Years</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>
              MongoDB
            </Statistic.Value>
            <Statistic.Label>1+ Years</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>
              SQL
            </Statistic.Value>
            <Statistic.Label>{'<'}1 Year</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>
              C#
            </Statistic.Value>
            <Statistic.Label>{'<'}1 Year</Statistic.Label>
          </Statistic>
          <Divider />
        </Segment>
      </Transition>
    )

  }
}

export default AbilitiesPage;
