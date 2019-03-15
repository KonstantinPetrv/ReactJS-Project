import React from 'react';
import { NavLink } from "react-router-dom";

const UserNav = (props) => {
    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <NavLink to="/orders/checkout" className="navbar-brand">
                    Cart
                </NavLink>
            </li>
            {
                !!window.localStorage.getItem('auth_token')
                    ? <li className="nav-item">
                        <NavLink to="/user/info" className="navbar-brand">
                            {window.localStorage.getItem('username')}
                        </NavLink>
                    </li>
                    : <li className="nav-item active">
                        <NavLink to="/login" className="navbar-brand">Login</NavLink>
                    </li>
            }
            {
                !!window.localStorage.getItem('auth_token')
                    ? <li>
                        <NavLink to="/logout" className="navbar-brand">
                            Logout
                        </NavLink>
                    </li>
                    : <li className="nav-item active">
                        <NavLink to="/register" className="navbar-brand">Register</NavLink>
                    </li>
            }
        </ul>
    )
}

export default UserNav;