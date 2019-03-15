import React from 'react';

const UserForm = (props) => {
    const { username, password } = props.state;
    const { handleChange, handleSubmit, actionName } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group form-inline top-buffer">
                <label className="label label-default col-2" htmlFor="username">Username: </label>
                <input
                    type="text"
                    className="form-control col-8"
                    name="username"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={handleChange} />
            </div>
            <div className="form-group form-inline top-buffer">
                <label className="label label-default col-2" htmlFor="password">Password: </label>
                <input
                    type="password"
                    className="form-control col-8"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange} />
            </div>
            <div className="float-right col-3">
                <button type="submit" className="btn btn-primary top-buffer">{actionName}</button>
            </div>
        </form>
    )
}

export default UserForm;