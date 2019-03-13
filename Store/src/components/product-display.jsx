import React from 'react';
import { NavLink } from 'react-router-dom';

const ProductDisplay = (props) => {
    const { _id, title, image, price } = props.product;
    return (
        <div className="col-xs-6 home-case">
            <div className="col-xs-12">
                <h3 className="text-center">{title}</h3>
            </div>
            <div className="col-xs-12 image-container">
                <NavLink to={`product/details/${_id}`}>
                    <img className="img-border img-pos" src={image} alt="missing" />
                </NavLink>
            </div>
            <p className="col-xs-6 home-case text-center">
                {price}$
            </p>
        </div>
    );
};

export default ProductDisplay;