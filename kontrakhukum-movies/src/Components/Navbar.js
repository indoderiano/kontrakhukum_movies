import React, { Component } from 'react'
import {
  Segment,
  Menu,
  Container
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class Navbar extends Component {
  render() {
    return (
      <Segment
        inverted
        textAlign='center'
        style={{ minHeight: 0, padding: '1em 0em', marginBottom: '2em' }}
        vertical
      >
        <Menu
          fixed={false ? 'top' : null}
          inverted
          pointing
          secondary
          size='large'
        >
          <Container>
            <Menu.Item as={Link} to='/' >
              Home
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
    )
  }
}

export default Navbar