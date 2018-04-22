import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

export default class Login extends Component {

  state = {

    logIn: {
      email: '',
      password: '',
      userLoggedIn:false
    },
  }

  login = async (e) => {
    e.preventDefault()
    const {logIn} = this.state
    try {
        await axios
          .post('/api/user/login', logIn)
          .then(response => {
            console.log('response',response)
            if (response.data.emailError) {
              swal('Records of email not found')
            }
            if(response.data.passwordError){
              swal('Wrong Password')
            }
            if(response.data.passwordFound === true && response.data.email === true) {
              swal('Logging In')
              this.setState({userLoggedIn: true})
            }
            localStorage.setItem('email', response.data.email)  
          })
      
    } catch (error) {
      console.log(error);
    }
  }



  
  handleChange = (e) => {
    const attribute = e.target.name
    const value = e.target.value
    const logIn = {...this.state.logIn}
    logIn[attribute] = value
    this.setState({logIn})
  }

  render() {

    const {userLoggedIn, logIn} = this.state
    const {login, handleChange } = this
    console.log('state',this.state)
    if (userLoggedIn) {
      return <Redirect to={`/login/${this.state.email}`} />
    }
    return (
      <div>
        
        <form onSubmit={login}>
          <input
            type="text"
            onChange={handleChange}
            name="email"
            value={logIn.email}
            placeholder="Email"/>
          <input
            type="text"
            onChange={handleChange}
            name="password"
            value={logIn.password}
            placeholder="Password"/>
            <button> Login In</button>
        </form>
        <a href="/">  
        <button>Cancel</button>
        </a>
      </div>
    )
  }
}
