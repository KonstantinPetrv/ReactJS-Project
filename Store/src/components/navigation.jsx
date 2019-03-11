import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = (props) => {
    return (
        <header>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink to="/" className="navbar-brand">Home</NavLink>
                            <NavLink to="/product/create" className="navbar-brand">Add Product</NavLink>
                        </li>
                    </ul>
                </div>
                {
                    window.localStorage.getItem('username')
                        ? (
                            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <NavLink to="/" className="navbar-brand">
                                            {window.localStorage.getItem('username')}
                                        </NavLink>
                                        <NavLink to="/logout" className="navbar-brand">
                                            Logout
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        )
                        : (
                            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                                <ul className="navbar-nav ml-auto">

                                    <li className="nav-item active">
                                        <NavLink to="/login" className="navbar-brand">Login</NavLink>
                                    </li>
                                    <li className="nav-item active">
                                        <NavLink to="/register" className="navbar-brand">Register</NavLink>
                                    </li>
                                </ul>
                            </div>
                        )
                }
            </nav>
        </header>
    );
};

export default Navigation;