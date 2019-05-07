import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateUserId, updateUsername } from '../../redux/auth_reducer'
import axios from 'axios'

class NewUser extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            loginError: false,
            loginErrorMessage: 'Username taken, please try a different one.'
        }
    }

    handleFormInputUpdate = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            loginError: false
        })
    }

    handleNewUserFormSubmit = async (e) => {
        e.preventDefault()
        const { username, password } = this.state
        try {
            const res = await axios.post('/auth/register', { username, password })
            this.props.updateUsername(username)
            this.props.updateUserId(res.data.user_id)
            this.props.history.push('/home')
        } catch (err) {
            this.setState({ username: '', password: '', loginError: true })
        }
    }

    render() {
        return (
            <>
                <h1>Register</h1>
                <form onSubmit= {this.handleNewUserFormSubmit}>
                    <input
                        type='text'
                        name='username'
                        placeholder='username'
                        value={this.state.username}
                        onChange={this.handleFormInputUpdate}
                    />
                    <input
                        type='text'
                        name='password'
                        placeholder='password'
                        value={this.state.password}
                        onChange={this.handleFormInputUpdate}
                    />
                    <button>Done</button>
                </form>
                <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80" width="1200px"/>
        {this.state.loginError && <h3>{this.state.loginErrorMessage}</h3>}
            </>
        )
    }
}

const mapDispatchToProps = {
  updateUserId,
  updateUsername
}

export default connect(null, mapDispatchToProps)(withRouter(NewUser))