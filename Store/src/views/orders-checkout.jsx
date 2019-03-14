import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

import ProductService from "../services/product-service";
import OrderService from "../services/order-service";
import ProductCartDisplay from "../components/prouct-order-display";


class Checkout extends Component {
    static orderService = new OrderService();
    static productService = new ProductService();

    constructor(props) {
        super(props);

        this.state = {
            ids: [...window.localStorage.getItem('cart').trim().split(',')],
            products: [],
            isOrdered: false
        }
    }

    removeProduct = (product) => {
        if (product === 'all') {
            window.localStorage.setItem('cart', []);
            this.setState({
                products: []
            })
        } else {

        }
    }

    postOrder = () => {
        const data = {
            products: this.state.ids
        }

        Checkout.orderService.post(data)
            .then(() => {
                this.removeProduct('all');
                this.setState({
                    isOrdered: true
                });
            }).catch(err => console.error(err))
    }

    componentWillMount() {
        if (window.localStorage.getItem('cart')) {
            Checkout.productService.cart(this.state.ids)
                .then(body => {
                    this.setState({
                        products: body
                    })
                })
                .catch(err => console.log(err));
        }
    }

    render() {
        return (
            <div>
                {this.state.isOrdered
                    ? < Redirect to="/" />
                    : null
                }
                <h2>Cart</h2>
                <ul className="list-group">
                    {this.state.products.map((product) => {
                        return (<li key={product._id} className="list-group-item top-buffer left-buffer li-container">
                            <ProductCartDisplay product={product} />
                        </li>)
                    })}
                </ul>
                <div className="btn-toolbar float-right top-buffer">
                    <div className="btn-toolbar mr-2">
                        <button className="btn btn-primary" onClick={() => this.removeProduct('all')}>Empty Cart</button>
                    </div>
                    {window.localStorage.getItem('auth_token')
                        ? <div className="btn-toolbar mr-2">
                            <button className="btn btn-primary" onClick={() => this.postOrder()} >Order</button>
                        </div>
                        : <div className="btn-toolbar mr-2">
                            <button className="btn btn-primary" disabled >Order</button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Checkout;