import React from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductService from '../../services/product-service';

class ProductDelete extends React.Component {
    static service = new ProductService();
    state = {
        success: false
    }

    removeProduct = () => {
        const id = this.props.match.params.id;
        const credentials = {
            roles: window.localStorage.getItem('roles')
        };

        ProductDelete.service.remove(id, credentials)
            .then((data) => {
                toast.success('Product deleted.');
                this.setState({
                    success: true
                })
            }).catch((err) => (
                < Redirect to={`/product/details/${id}`} />
            ))
    }

    render() {
        return (
            <div>
                {this.state.success ? <Redirect to="/" /> : this.removeProduct()}
            </div>
        )
    }
}

export default ProductDelete;