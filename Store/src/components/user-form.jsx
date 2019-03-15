import React from 'react';

const UserForm = (props) => {
    const { username, password } = props.state;
    const { handleChange, handleSubmit, actionName } = props;
    return (
        <form className="form-group" onSubmit={handleSubmit}>
            <div>
                <label className="label label-default" htmlFor="username">Username: </label>
                <input
                    type="text"
                    className="form-control"
                    name="username"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={handleChange} />
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
                    onChange={handleChange} />
            </div>
            <div className="float-right">
                <button type="submit" className="btn btn-primary top-buffer">{actionName}</button>
            </div>
        </form>
    )
}

export default UserForm;