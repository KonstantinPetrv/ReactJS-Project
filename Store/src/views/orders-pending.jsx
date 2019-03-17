import React, { Component } from "react";
import { toast } from 'react-toastify';
import OrderService from '../services/order-service';
import Orders from "../components/orders";

class OrdersPending extends Component {
    static service = new OrderService();

    constructor(props) {
        super(props);

        this.state = {
            orders: []
        }
    }

    approveOrder = (id) => {
        OrdersPending.service.postApprove(id)
            .then((data) => {
                toast.success('Order Approved')
                this.getPending()
            })
    }

    getPending = () => {
        OrdersPending.service.getPending()
            .then(body => {
                this.setState({
                    orders: body
                })
            })

    }

    componentWillMount() {
        this.getPending();
    }

    render() {
        return (
            <div>
                <h2>Pending Orders</h2>
                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col" className="text-center">Status</th>
                            <th scope="col" className="text-center">User</th>
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
                                    action={this.approveOrder}
                                    approve={this.approveOrder}
                                    isAdmin={true}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div >
        )
    }
}

export default OrdersPending;