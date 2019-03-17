import React, { Component } from "react";
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import ProductService from '../services/product-service';
import ProductForm from "../components/product-form";

class ProductEdit extends Component {
    static service = new ProductService();

    state = {
        title: '',
        description: '',
        price: '',
        image: '',
        success: false
    }


    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const credentials = {
            title: this.state.title,
            description: this.state.description,
            price: +this.state.price,
            image: this.state.image,
            roles: window.localStorage.getItem('roles')
        }

        ProductEdit.service.edit(this.props.match.params.id, credentials)
            .then((data) => {
                toast.success('Product updated.');
                this.setState({
                    success: true
                });
            }).catch((err) => console.error(err));
    }

    componentWillMount() {
        ProductEdit.service.details(this.props.match.params.id)
            .then(body => {
                this.setState({
                    title: body.product.title,
                    description: body.product.description,
                    price: body.product.price,
                    image: body.product.image,
                })
            })
    }

    render() {
        return (
            <div className="col-md-6 container">
                {this.state.success
                    ? <Redirect to={`/product/details/${this.props.match.params.id}`} />
                    : null
                }
                <ProductForm
                    state={this.state}
                    actionName='Edit'
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
            </div >
        )
    }
}

export default ProductEdit;