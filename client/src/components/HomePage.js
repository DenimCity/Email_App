import React, {Component} from 'react'
import styled from 'styled-components'
import Login from './Login'
import Register from './Register'
export default class HomePage extends Component {

  state = {}

  render() {

    return (
      <Container>

        <div>
          <a href="/login">
            <button>Login</button>
          </a>
        </div>
        <div>
          <a href="/register">
            <button>Sign Up</button>
          </a>
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