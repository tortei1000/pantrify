import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Search from './Search'
import { logout } from '../redux/auth_reducer'

const Navbar = (props) => { //how can I condiatially render login ?
    const { username } = props
    return (

        <nav>
            <span>PANTRIFY</span>
            <ul>
                {/* <li>
                    <Link to='/'>Home</Link>
                </li> */}
                
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <Search />
                </li>
            </ul>
            {username && <div>Welcome, {username}  <button onClick={() => {
                props.logout()
                props.history.push('/')
            }}>logout</button></div>}

        </nav>
    )
} 
const mapDispatchToProps = {
    logout
}
const mapStateToProps = (reduxState) => {
    const { username } = reduxState
    return { username }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))