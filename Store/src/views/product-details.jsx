import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductService from '../services/product-service';
import '../css/details.css'

class ProductDetails extends Component {
    static service = new ProductService();

    state = {
        title: '',
        description: '',
        price: '',
        image: '',
        reviews: [],
        inCart: false
    }

    addProduct = () => {
        if (window.localStorage.getItem('cart')) {
            let cart = [window.localStorage.getItem('cart')];
            cart.push(this.props.match.params.id);
            window.localStorage.setItem('cart', cart);
            toast.info(this.state.title + ' added to cart.');
        } else {
            window.localStorage.setItem('cart', [this.props.match.params.id]);
            toast.info(this.state.title + ' added to cart.');
        }

        this.setState({
            inCart: true
        })
    }

    removeProduct = (id = this.props.match.params.id) => {
        let cart = [...window.localStorage.getItem('cart').trim().split(',')]
        cart.splice(cart.indexOf(id), 1);
        window.localStorage.setItem('cart', cart);

        this.setState({
            inCart: false
        })
    }

    componentWillMount() {
        ProductDetails.service.details(this.props.match.params.id)
            .then(body => {
                let isInCart = false;
                [...window.localStorage.getItem('cart').trim().split(',')]
                    .indexOf(body._id) > -1 ? isInCart = true : isInCart = false

                this.setState({
                    title: body.title,
                    description: body.description,
                    price: body.price,
                    image: body.image,
                    reviws: body.reviws,
                    inCart: isInCart
                })
            })
    }

    render() {
        const { title, description, price, image, reviews } = this.state;
        return (
            <div className="container">
                <div className="card">
                    <div className="container-fliud">
                        <div className="wrapper row">
                            <div className="preview col-md-6">

                                <div className="preview-pic tab-content">
                                    <div className="tab-pane active" id="pic-1"><img src={image} alt="missing" /></div>
                                </div>
                            </div>
                            <div className="details col-md-6">
                                <h3 className="product-title">{title}</h3>
                                <div className="rating">
                                    <div className="stars">
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star"></span>
                                        <span className="fa fa-star"></span>
                                    </div>
                                    <span className="review-no">{reviews.length} reviews</span>
                                </div>
                                <p className="product-description">{description}</p>
                                <h4 className="price">current price: <span>{typeof (price) === 'number' ? price.toFixed(2) : null}$</span></h4>
                                <div className="action">
                                    {
                                        this.state.inCart
                                            ? <button className="btn btn-primary" type="button" onClick={() => this.removeProduct()}>Remove from cart</button>
                                            : <button className="btn btn-primary" type="button" onClick={() => this.addProduct()}>Add to cart</button>
                                    }
                                    {
                                        window.localStorage.getItem('roles') ?
                                            window.localStorage.getItem('roles').includes('Admin') ? (
                                                <div className="top-buffer">
                                                    <NavLink to={`/product/edit/${this.props.match.params.id}`}>
                                                        <button className="btn btn-warning" type="button"><span className="fa fa-heart">Edit</span></button>
                                                    </NavLink>
                                                    <NavLink to={`/product/delete/${this.props.match.params.id}`} >
                                                        <button className="btn btn-danger btn-left-spacing" type="button"><span className="fa fa-heart">Delete</span></button>
                                                    </NavLink>
                                                </div>
                                            ) : null
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetails;