import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthenticationService from '../services/authentication-service';
import UserForm from "../components/user-form";

class Register extends Component {
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

        Register.service.register(credentials)
            .then((user, err) => {
                if (err) {
                    return console.error(err);
                }
                if (!user.success) {
                    if (user.errors) {
                        toast.error(user.errors[0])
                    } else {
                        toast.error(user.message);
                    }
                }
                return Register.service.login(credentials)
            })
            .then(({ token, user, success, message }) => {
                if (!success) {
                    return;
                }
                window.localStorage.setItem('auth_token', token);
                window.localStorage.setItem('username', user.username);
                window.localStorage.setItem('roles', user.roles);

                toast.success(message);

                this.setState({
                    isLogged: true
                });
            }).catch((err) => console.error(err));
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
                    actionName='Register'
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                />
            </div>
        )
    }
}

export default Register;