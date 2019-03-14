import React, { Component } from "react";
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import ProductService from '../services/product-service';

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
                toast.success('Product edited.');
                this.setState({
                    success: true
                });
            }).catch((err) => console.error(err));
    }

    componentWillMount() {
        ProductEdit.service.details(this.props.match.params.id)
            .then(body => {
                this.setState({
                    title: body.title,
                    description: body.description,
                    price: body.price,
                    image: body.image,
                })
            })
    }

    render() {
        const { title, description, image, price } = this.state;
        return (
            <div className="col-md-6 container">
                {this.state.success
                    ? <Redirect to={`/product/details/${this.props.match.params.id}`} />
                    : null
                }
                <h2>Edit</h2>
                <form className="form-group top-buffer" onSubmit={this.handleSubmit}>
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
                            placeholder="Title"
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
                            placeholder="Title"
                            value={image}
                            onChange={this.handleChange} />
                    </div>
                    <div className="float-right">
                        <button type="submit" className="btn btn-warning top-buffer">Edit</button>
                    </div>
                </form>
            </div >
        )
    }
}

export default ProductEdit;