import React from 'react';
import { NavLink } from 'react-router-dom';
import AdminNav from './admin-nav';
import UserNav from './user-nav';

const Navigation = (props) => {
    return (
        <header>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink to="/" className="navbar-brand">Home</NavLink>
                        </li>
                        {window.localStorage.getItem('roles')
                            ? window.localStorage.getItem('roles').indexOf('Admin') + 1
                                ? <AdminNav />
                                : null
                            : null
                        }
                    </ul>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <UserNav />
                </div>
            </nav>
        </header>
    );
};

export default Navigation;