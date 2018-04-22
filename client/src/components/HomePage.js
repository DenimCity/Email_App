import React, {Component} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
export default class HomePage extends Component {

  state = {}

  render() {

    return (
      <Container>

        <div>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div>
          <Link to="/register">
            <button>Sign Up</button>
          </Link>
        </div>

      </Container>
    )
  }
}

const Container = styled.div `
display:flex;
justify-content: space-evenly;
align-content: center;
padding:2vw;
margin:2vw;
`