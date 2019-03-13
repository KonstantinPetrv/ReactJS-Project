import React from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        
        window.localStorage.removeItem('auth_token');
        window.localStorage.removeItem('roles');
        window.localStorage.removeItem('username');

    }

    render() {
        return <Redirect to="/" />
    }
}

export default Logout;