import React from 'react';
import { NavLink } from "react-router-dom";

const AdminNav = (props) => {
    return (
        <li className="nav-item active" >
            <div className="dropdown">
                <button className="dropbtn"><span>Admin Controls</span></button>
                <div className="dropdown-content">
                    <NavLink to="/product/create" className="text-center">Add Product</NavLink>
                    <NavLink to="/orders/pending" className="text-center">Pending Orders</NavLink>
                </div>
            </div>
        </li>
    )
}

export default AdminNav;