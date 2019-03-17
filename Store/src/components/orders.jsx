import React from 'react';

const Orders = (props) => {
    const { _id, creator, status } = props.orders;
    const { products, price, isAdmin } = props;
    let statusClr = 'text-warning';
    if (status === "Approved") {
        statusClr = 'text-primary';
    } else if (status === "Delivered") {
        statusClr = 'text-success'
    }
    return (
        <tr>
            <td className={`text-center ${statusClr}`}>{status}</td>
            {isAdmin
                ? <td className="text-center">{creator.username}</td>
                : null
            }
            <td className="">{products}</td>
            <td className="price text-center">{price.toFixed(2)}&#36;</td>
            <td className="text-center">
                {isAdmin
                    ? <button className="btn btn-primary" onClick={() => props.action(_id)}>Approve</button>
                    : status === 'Pending'
                        ? <button className="btn btn-danger" onClick={() => props.action(_id)}>Cancel</button>
                        : <button className="btn btn-danger" disabled>Cancel</button>
                }
            </td>
        </tr >
    );
};

export default Orders;