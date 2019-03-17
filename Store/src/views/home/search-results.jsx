import React, { Component } from "react";
import ProductDisplay from "../../components/displays/product-display";
import ProductService from '../../services/product-service';
import Search from "../../components/forms/search";

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
                this.setState({
                    products: body
                })
            })
    }

    render() {
        return (
            <div>
                <Search />
                {
                    this.state.products.length > 0
                        ? (
                            <ul className="list-inline">
                                {this.state.products.map((product) => {
                                    return (<li key={product._id} className="list-inline-item top-buffer left-buffer">
                                        <ProductDisplay product={product} />
                                    </li>)
                                })}
                            </ul>
                        )
                        : <h2 className="text-muted text-center">No products matching your search parameters were found</h2>
                }
            </div>
        )
    }
}

export default Home;