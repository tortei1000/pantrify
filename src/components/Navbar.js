import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';

const Navbar = ({username}) => (
    <nav>
        <span>PANTRIFY</span>
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
        </ul>
    {username && <div>Welcome, {username}  <button onClick={()=>{
        axios.get('/auth/logout')}}>logout</button></div>}  
    
    </nav>
) //logout button doesnt works and doesnt redirect to '/' I tried using this.props.history.push but I dont think props is being passed down correctly

const mapStateToProps = (reduxState) => {
    const { username } = reduxState
    return { username }
}

export default connect(mapStateToProps)(withRouter(Navbar))