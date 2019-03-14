import React from 'react';
// import { NavLink } from 'react-router-dom';

const Orders = (props) => {
    const { _id, creator, status } = props.orders;
    const { products, price } = props;
    return (
        <tr>
            <td className="text-center">{status}</td>
            <td className="text-center">{creator.username}</td>
            <td className="">{products}</td>
            <td className="price text-center">{price}</td>
            <td className="text-center">
                <button className="btn btn-primary" onClick={() => props.approve(_id)}>Approve</button>
            </td>
        </tr>
    );
};

export default Orders;