import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateUserId, updateUsername } from '../../redux/auth_reducer'
import axios from 'axios'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            loginUsername: '',
            loginPassword: '',
            loginError: false,
            loginErrorMessage: 'Username or password is incorrect. Please try again'
        }
    }

    handleFormInputUpdate = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            loginError: false
        })
    }

    handleLoginFormSubmit = async (e) => {
        e.preventDefault()
        const { loginUsername, loginPassword } = this.state

        try {

            const res = await axios.post('/auth/login', { loginUsername, loginPassword })

            this.props.updateUsername(loginUsername)
            this.props.updateUserId(res.data.id)

            this.props.history.push('/home')
        } catch (err) {
            this.setState({ loginUsername: '', loginPassword: '', loginError: true })
        }
    }

    render() {
        return (
            <>
                
                <form className="form_container" onSubmit={this.handleLoginFormSubmit}>
                    <div className="login_subheader">Username</div>
                    <input className="input_container"
                        type='text'
                        name='loginUsername'
                        value={this.state.loginUsername}
                        onChange={this.handleFormInputUpdate}
                    />
                    <div className="login_subheader">Password</div>
                    <input className="input_container"
                        type='text'
                        name='loginPassword'
                        value={this.state.loginPassword}
                        onChange={this.handleFormInputUpdate}
                    />
                    <button className="login_button">Login</button>
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

export default connect(null, mapDispatchToProps)(withRouter(Register))