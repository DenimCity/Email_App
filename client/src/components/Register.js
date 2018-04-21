import React, {Component} from 'react'
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'
import swal from 'sweetalert'
import validator from 'validator'

export default class Register extends Component {

  state = {
    newUser: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    redirect: false
  }

 

  signUpUser = async (e) => {
    const {newUser} = this.state
    e.preventDefault()
    try {
        await axios
          .post('/api/user/register', newUser)
          .then(response => {
            if (response.data.error) {
              swal('this email has already been used')
            }
            localStorage.setItem('email', response.data.newUser.email)
            console.log('local storage data', localStorage);
            this.setState({redirect: true})
          })
      
    } catch (error) {
      console.log(error);
    }

  }

  handleChange = (e) => {
    const attribute = e.target.name
    const value = e.target.value
    const newUser = {...this.state.newUser}
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
            regex="[!@#\$%&\*]?"
            value={this.state.firstName}
            placeholder="First Name"/>
          <input
            type="text"
            onChange={this.handleChange}
            name="lastName"
            value={this.state.lastName}
            placeholder="Last Name"/>
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
            minLength="5"
            maxLength='20'
            value={this.state.password}
            placeholder="Password"/> {/* <input type="text" onChange={this.handleChange} name="password"  placeholder=" Confirm Password"/> */}
          <input
            type="text"
            onChange={this.handleChange}
            name="password"
            minLength="5"
            maxLength='20'
            value={this.state.passwordConfirmation}
            placeholder="Password"/>
          <button>Sign Up</button>
        </form>
        <Link  to="/">
          <button>Cancel</button>
        </Link>
      </div>
    )
  }
}
