import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ isLoggedIn, allowedRoles = [], roles, ...otherProps }) => {
    const roleIsAllowed = (!allowedRoles.length) || (typeof (roles) !== 'string' ? (
        roles
            .split(',')
            .map(role => role.toLowerCase())
            .some(role => allowedRoles.includes(role)))
        : allowedRoles.includes(roles)
    )

    if (!isLoggedIn || !roleIsAllowed) {
        return <Redirect to="/login" />
    }

    return <Route {...otherProps} />
}

export default AuthRoute;