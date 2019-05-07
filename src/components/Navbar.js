import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Search from './Search'
import { logout } from '../redux/auth_reducer'
import axios from 'axios'

class Navbar extends Component { 
    
    render() {
        const { username } = this.props
        return (

            <nav>
                <span>PANTRIFY</span>


                {!this.props.username ? (
                    <ul>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/register'>Register</Link>
                        </li>
                    </ul>
                ) : (
                        <li style={{listStyle:'none'}}>
                            <Search />
                        </li>)}

                {username && <div>Welcome, {username}  <button onClick={() => {
                    this.props.logout()
                    axios.get('/auth/logout').then(()=>{this.props.history.push('/')})
                    

                }}>logout</button></div>}

            </nav>
        )
    }
}
const mapDispatchToProps = {
    logout
}
const mapStateToProps = (reduxState) => {
    const { username } = reduxState
    return { username }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))