import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../redux/auth_reducer'
import axios from 'axios'
import HamburgerMenu from './HambugerMenu'

class Navbar extends Component {
    constructor() {
        super()
        this.state = {

            open: [false, true, false, true]

        }
    }

    handleClick(id) {
        let { open } = this.state;
        this.setState({
            open: [...open.slice(0, id), !open[id], ...open.slice(id + 1)]
        });
    }

    render() {
        const { username } = this.props
        return (

            <nav>
                <span className="app_name_container">PANTRIFY</span>


                {!this.props.username ? (
                    <ul className="login_register_container">
                        <li className="login_container">
                            <Link to='/login' className="login_text">Login</Link>
                        </li>
                        <li className="register_container">
                            <Link to='/register' className="register_text">Get Started</Link>
                        </li>
                    </ul>
                ) : (
                        <>
                            <HamburgerMenu />
                            {/* <Link to='/home'>my recipes</Link>
                            <Link to='/shoppinglist'>shopping list</Link>
                            <Link to='/pantry'>Pantry</Link>
                            <Link to='/calendar'>Calendar</Link> */}
                        </>
                    )}

                {username && <div>Welcome, {username}  <button onClick={() => {
                    this.props.logout()
                    axios.get('/auth/logout').then(() => { this.props.history.push('/home') })


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