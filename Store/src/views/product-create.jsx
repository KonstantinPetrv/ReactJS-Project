import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductService from '../services/product-service';

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
                    toast.error(data.message);
                    return;
                }
                toast.success(credentials.title + ' created.')
                this.setState({
                    success: true
                })
            }).catch((err) => console.error(err));
    }

    render() {
        const { title, description, image, price } = this.state;
        return (
            <div className="col-md-6 container">
                {this.state.success
                    ? <Redirect to="/" />
                    : null
                }
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <div>
                        <label className="label label-default" htmlFor="title">Title: </label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            id="title"
                            placeholder="Title"
                            value={title}
                            onChange={this.handleChange} />
                    </div>
                    <div className="top-buffer">
                        <label htmlFor="description">Description: </label>
                        <textarea
                            type="description"
                            className="form-control"
                            rows="7"
                            name="description"
                            id="description"
                            placeholder="Description"
                            value={description}
                            onChange={this.handleChange} />
                    </div>
                    <div>
                        <label className="label label-default" htmlFor="price">Price: </label>
                        <input
                            type="number"
                            min="1"
                            step="any"
                            className="form-control"
                            name="price"
                            id="price"
                            placeholder="Price"
                            value={price}
                            onChange={this.handleChange} />
                    </div>
                    <div>
                        <label className="label label-default" htmlFor="image">Image: </label>
                        <input
                            type="text"
                            className="form-control"
                            name="image"
                            id="title"
                            placeholder="Image Url:"
                            value={image}
                            onChange={this.handleChange} />
                    </div>
                    <div className="float-right">
                        <button type="submit" className="btn btn-primary top-buffer">Create</button>
                    </div>
                </form>
            </div >
        )
    }
}

export default ProductCreate;