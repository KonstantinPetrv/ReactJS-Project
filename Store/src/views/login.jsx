import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthenticationService from '../services/authentication-service';
import UserForm from "../components/user-form";

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
            .then(({ token, user, success, message, errors }) => {
                if (!success) {
                    return toast.error(errors[0])
                }

                window.localStorage.setItem('auth_token', token);
                window.localStorage.setItem('username', user.username);
                window.localStorage.setItem('roles', user.roles);
                toast.success(message);
                this.setState({
                    isLogged: true
                });
            }).catch((err) => console.log(err));
    }

    render() {
        return (
            <div className="col-md-6 container">
                {this.state.isLogged
                    ? <Redirect to="/" />
                    : null
                }
                <UserForm
                    state={this.state}
                    actionName='Login'
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                />
            </div>
        )
    }
}

export default Login;