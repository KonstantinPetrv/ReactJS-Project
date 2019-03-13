import React from 'react';
import { Redirect } from 'react-router-dom';
import ProductService from '../services/product-service';

class ProductDelete extends React.Component {
    static service = new ProductService();

    removeProduct = () => {
        const id = this.props.match.params.id;
        const credentials = {
            roles: window.localStorage.getItem('roles')
        };

        ProductDelete.service.remove(id, credentials)
            .then((data) => (
                <Redirect to="/" />
            )).catch((err) => (
                < Redirect to={`/product/details/${id}`} />
            ))
    }

    render() {
        return (
            <div>
                {
                    this.removeProduct()
                }
            </div>
        )
    }
}

export default ProductDelete;