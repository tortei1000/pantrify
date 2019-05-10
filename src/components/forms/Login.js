import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import SimpleSlider from '../SimpleSlider'

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
            <SimpleSlider/>
        </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { username } = reduxState
    return { username }
}

export default connect(mapStateToProps)(withRouter(Login))