import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Login extends Component {
    componentDidMount() {
        if (this.props.username) {
            this.props.history.push('/home')
        }
    }

    render() {
        return( 
        <div>
            {this.props.children}
            <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80" width="1200px" alt="error"/>
        </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { username } = reduxState
    return { username }
}

export default connect(mapStateToProps)(withRouter(Login))