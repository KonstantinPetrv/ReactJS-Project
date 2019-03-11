import React from 'react';
import { NavLink } from 'react-router-dom';

const ProductDisplay = (props) => {
    const { _id, title, image, price } = props.product;
    return (
        <div className="col-sm-6 col-md-6 col-xs-6 home-case float-left">
            <div class="col-sm-6 col-md-6 col-xs-12">

                <h3>{title}</h3>
            </div>
            <div className="col-sm-6 col-md-6 col-xs-12 image-container">
                <NavLink to={`product/${_id}`}>
                    <img className="img-pos" src={image} alt="missing" />
                </NavLink>
            </div>
            <div className="col-sm-6 col-md-6 col-xs-6 home-case">
                {price}
            </div>


        </div>
    );
};

export default ProductDisplay;