import React, { Component } from 'react';
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'

class userControl extends Component{
  constructor(){
    super();
    this.state={
      createnew:false
    }
  }

  createNewUser(){
    this.setState({
      createnew:true
    })
  }


}

const UserPage = () => (
  <div>
    <Menu fixed='top' inverted style={{background:'#f98c1f'}}>
      <Container>
        <Dropdown item simple text='Main User'>
          <Dropdown.Menu>
            <Dropdown.Item>User 2</Dropdown.Item>
            <Dropdown.Item>User 3</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Add new member</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item as='a'>Home</Menu.Item>
        <Menu.Item as='a'>Reminder</Menu.Item>
        <Menu.Item as='a'>Calendar</Menu.Item>

      </Container>
    </Menu>
    <Container text style={{ marginTop: '7em' }}>
      <Header as='h1'>Semantic UI React Fixed Template</Header>
      <p>This is a basic fixed menu template using fixed size containers.</p>
      <p>
        A text container is used for the main container, which is useful for single column layouts.
      </p>
    </Container>

  </div>
)
export default UserPage
