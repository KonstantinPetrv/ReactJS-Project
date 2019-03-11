import React, { Component } from "react";
import ProductDisplay from "../components/product-display";
import ProductService from '../services/product-service';

class Home extends Component {
    static service = new ProductService();

    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }



    componentWillMount() {
        Home.service.all()
            .then(body => {
                this.setState({
                    products: body
                })
            })
    }

    render() {
        return (
            <div>
                <h2>Home Page</h2>
                {this.state.products.map((product) => {
                    return <ProductDisplay product={product} />
                })}
            </div>
        )
    }
}

export default Home;