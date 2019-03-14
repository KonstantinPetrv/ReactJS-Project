import React from 'react';
import { NavLink } from 'react-router-dom';

const ProductDisplay = (props) => {
    const { _id, title, image, price } = props.product;
    return (
        <div className="col-xs-6 home-case div-container">
            <NavLink to={`product/details/${_id}`}>
                <div className="col-xs-12 image-container">
                    <img className="img-pos" src={image} alt="missing" />
                </div>
            </NavLink>
            <div className="col-xs-12">
                <h3 className="text-center">{title}</h3>
            </div>
            <h4 className="text-md-left home-case price">
                {price.toFixed(2)}$
            </h4>
        </div>
    );
};

export default ProductDisplay;