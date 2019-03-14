import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

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

    removeProduct = (product, isMessage = true) => {
        if (product === 'all') {
            window.localStorage.setItem('cart', []);
            this.setState({
                products: [],
                ids: ''
            })
            if (isMessage) toast.info('Emptied cart.')
        } else {
            let cart = window.localStorage.getItem('cart').split(',');

            cart.splice(cart.indexOf(product), 1);
            window.localStorage.setItem('cart', cart);

            this.setState({
                ids: cart,
                products: []
            }, () => {
                toast.info('Item removed.');
                this.getCart();
            })
        }
    }

    getCart = () => {
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
    postOrder = () => {
        const data = {
            products: this.state.ids
        }

        Checkout.orderService.post(data)
            .then(() => {
                toast.success('Ordered.');
                this.removeProduct('all', false);
                this.setState({
                    isOrdered: true
                });
            }).catch(err => console.error(err))
    }

    componentWillMount() {
        this.getCart()
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
                            <ProductCartDisplay product={product} remove={this.removeProduct} />
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