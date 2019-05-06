import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateUserId, updateUsername } from '../../redux/auth_reducer'
import axios from 'axios'

class CreateRecipe extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            instructions: '',
            
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
                        name='title'
                        placeholder='title'
                        value={this.state.username}
                        onChange={this.handleFormInputUpdate}
                    />
                    <input
                        type='text'
                        name='instructions'
                        placeholder='instructions'
                        value={this.state.password}
                        onChange={this.handleFormInputUpdate}
                    />
                    <button>Done</button>
                </form>
        {this.state.loginError && <h3>{this.state.loginErrorMessage}</h3>}
            </>
        )
    }
}

const mapDispatchToProps = {
  updateUserId,
  updateUsername
}

export default connect(null, mapDispatchToProps)(withRouter(CreateRecipe))