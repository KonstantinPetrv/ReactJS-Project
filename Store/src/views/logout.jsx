import React from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

class Logout extends React.Component {
    constructor(props) {
        super(props);

        window.localStorage.removeItem('auth_token');
        window.localStorage.removeItem('roles');
        window.localStorage.removeItem('username');

    }

    render() {
        return (
            <div>
                {toast.info('Logged out.')}
                <Redirect to="/" />
            </div>
        )
    }
}

export default Logout;