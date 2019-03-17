import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductService from '../../services/product-service';
import ProductForm from "../../components/forms/product-form";

class ProductCreate extends Component {
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

        ProductCreate.service.create(credentials)
            .then((data, err) => {
                if (!data.success) {
                    console.log(data)
                    toast.error(data.errors[0]);
                    return;
                }
                toast.success(credentials.title + ' created.')
                this.setState({
                    success: true
                })
            }).catch((err) => console.error(err));
    }

    render() {
        return (
            <div className="col-md-6 container">
                {this.state.success
                    ? <Redirect to="/" />
                    : null
                }
                <ProductForm
                    state={this.state}
                    actionName='Create'
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
            </div >
        )
    }
}

export default ProductCreate;