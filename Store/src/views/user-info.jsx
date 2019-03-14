import React, { Component } from "react";
import { toast } from 'react-toastify';
import OrderService from '../services/order-service';
import Orders from "../components/orders";

class UserInfo extends Component {
    static service = new OrderService();

    constructor(props) {
        super(props);

        this.state = {
            orders: []
        }
    }

    getOrders = () => {
        UserInfo.service.getUserOrders()
            .then((body) => {
                this.setState({
                    orders: body
                })
            })
    }

    cancelOrder = (id) => {
        UserInfo.service.remove(id)
            .then((data) => {
                toast.success(data.message)
                this.getOrders();
            }).catch((err) => console.error(err))
    }

    componentWillMount() {
        this.getOrders();
    }

    render() {
        return (
            <div>
                <h2>{window.localStorage.getItem('username')}</h2>
                <h3 className="top-buffer">Order History:</h3>
                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col" className="text-center">Status</th>
                            <th scope="col" className="text-center">Products</th>
                            <th scope="col" className="text-center">Price</th>
                            <th scope="col" className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orders.map((orders) => {
                            let productNames = [];
                            let price = 0;
                            orders.products.forEach(p => {
                                productNames.push(p.title);
                                price += p.price;
                            });

                            return (
                                <Orders
                                    key={orders._id}
                                    orders={orders}
                                    price={price}
                                    products={productNames.join(', ')}
                                    action={this.cancelOrder}
                                    isAdmin={false}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div >
        )
    }
}

export default UserInfo;