import React from 'react';
import { NavLink } from 'react-router-dom';

const ProductCartDisplay = (props) => {
    const { _id, title, image, price } = props.product;
    const remove = props.remove;
    return (
        <div className="col-xs-6 home-case">
            <NavLink to={`product/details/${_id}`}>
                <div className="col-xs-12 image-container float-left">
                    <img className="cart-thumbnails" src={image} alt="missing" />
                </div>
            </NavLink>
            <div className="col-xs-12 float-left">
                <h3 className="text-center">{title}</h3>
            </div>
            <div className="float-right ml-3">
                <button type="button" className="btn btn-danger close" onClick={() => remove(_id)}>&times;</button>
            </div>
            <h4 className="text-md-left home-case price float-right">
                {price.toFixed(2)}$
            </h4>
        </div>
    );
};

export default ProductCartDisplay;