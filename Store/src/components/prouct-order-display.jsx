import React from 'react';
import { NavLink } from 'react-router-dom';

const ProductCartDisplay = (props) => {
    const { _id, title, image, price } = props.product;
    const remove = props.remove;
    return (
        <tr>
            <td>
                <div className="col-xs-12 image-container float-left">
                    <NavLink to={`/product/details/${_id}`}>
                        <img className="cart-thumbnails" src={image} alt="missing" />
                    </NavLink>
                </div>
                <div className="col-xs-12">
                    <h3 className="text-left left-buffer">{title}</h3>
                </div>
            </td>
            <td className="text-right">
                <div className="col-xs-6">
                    <h4 className="price">
                        {price.toFixed(2)}$
                    </h4>
                </div>
            </td>
            <td>
                <div className="float-right ml-3">
                    <button type="button" className="btn btn-danger close" onClick={() => remove(_id)}>&times;</button>
                </div>
            </td>
        </tr>
    );
};

export default ProductCartDisplay;