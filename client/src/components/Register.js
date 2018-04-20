import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import swal from 'sweetalert'
export default class Register extends Component {

  state = {
    newUser: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    redirect: false
  }

  signUpUser = (e) => {
    e.preventDefault()
    axios
      .post('/api/user/register', this.state.newUser)
      .then(response => {
        // if(response.data.newUser.email){
        //   prompt('this email has already been used')
        // }
        // console.log('response.data.newUser.email', response.data.newUser.email);
        localStorage.setItem('email', response.data.newUser.email)
        // console.log('local storage data', localStorage);
        this.setState({redirect: true})
      })
      .catch((err) => {
        console.log('Error: with submission ', err);

      })
  }

  handleChange = (e) => {
    const attribute = e.target.name
    const value = e.target.value
    const newUser = {
      ...this.state.newUser
    }
    newUser[attribute] = value
    this.setState({newUser})
  }

 

  render() {

    if (this.state.redirect) {
      return <Redirect to="/"/>
    }

    return (
      <div>
        <form onSubmit={this.signUpUser}>
          <input
            type="text"
            onChange={this.handleChange}
            name="firstName"
            value={this.state.firstName}
            placeholder="First Name"/>
          <input
            type="text"
            onChange={this.handleChange}
            name="lastName"
            value={this.state.lastName}
            placeholder="Last Lame"/>
          <input
            type="text"
            onChange={this.handleChange}
            name="email"
            value={this.state.email}
            placeholder="Email"/> {/* <label>* 6-20 characters, have at least one uppercase letter, one lowercase letter, one digit, no spaces</label> */}
          <input
            type="text"
            onChange={this.handleChange}
            name="password"
            value={this.state.password}
            placeholder="Password"/> {/* <input type="text" onChange={this.handleChange} name="password"  placeholder=" Confirm Password"/> */}
          <button>Sign Up</button>
        </form>
        <a href="/">
          <button>Cancel</button>
          </a>
      </div>
    )
  }
}
