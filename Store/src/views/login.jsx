import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import AuthenticationService from '../services/authentication-service';

class Login extends Component {
    static service = new AuthenticationService();

    state = {
        username: '',
        password: '',
        isLogged: false
    }


    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const credentials = {
            username: this.state.username,
            password: this.state.password
        }

        Login.service.login(credentials)
            .then(({ token, user }) => {
                window.localStorage.setItem('auth_token', token);
                window.localStorage.setItem('username', user.username);
                window.localStorage.setItem('roles', user.roles);
                this.setState({
                    isLogged: true
                });
            }).catch((err) => console.error(err));
    }

    render() {
        const { username, password } = this.state;
        return (
            <div className="col-md-6 container">
                {this.state.isLogged
                    ? <Redirect to="/" />
                    : null
                }
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <div>
                        <label className="label label-default" htmlFor="username">Username: </label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={this.handleChange} />
                    </div>
                    <div className="top-buffer">
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={this.handleChange} />
                    </div>
                    <div className="float-right">
                    <button type="submit" className="btn btn-primary top-buffer">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;