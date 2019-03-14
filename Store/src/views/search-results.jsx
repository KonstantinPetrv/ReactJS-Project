import React, { Component } from "react";
import ProductDisplay from "../components/product-display";
import ProductService from '../services/product-service';
import Search from "../components/search";

class Home extends Component {
    static service = new ProductService();

    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    componentWillMount() {
        Home.service.getSearch(this.props.location.search)
            .then(body => {
                console.log(body);
                this.setState({
                    products: body
                })
            })
    }

    render() {
        return (
            <div>
                <h2>Home Page</h2>
                <Search />
                <ul className="list-inline">
                    {this.state.products.map((product) => {
                        return (<li key={product._id} className="list-inline-item top-buffer left-buffer">
                            <ProductDisplay product={product} />
                        </li>)
                    })}
                </ul>
            </div>
        )
    }
}

export default Home;