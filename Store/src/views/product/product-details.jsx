import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductService from '../../services/product-service';
import '../../css/details.css'
import ReviewForm from "../../components/forms/review-form";
import ReviewDisplay from "../../components/displays/review-display";

class ProductDetails extends Component {
    static service = new ProductService();

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            price: '',
            image: '',
            reviews: [],
            inCart: false
        }

        this.updateReviews = this.updateReviews.bind(this);
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

    updateReviews(d) {
        this.setState({
            reviews: [...this.state.reviews, d]
        });
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
            .then(({ product, reviews }) => {
                let isInCart = false;
                [...window.localStorage.getItem('cart').trim().split(',')]
                    .indexOf(product._id) > -1 ? isInCart = true : isInCart = false
                this.setState({
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    image: product.image,
                    reviews: reviews,
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
                                <h3 className="product-title text-center">{title}</h3>
                                <p className="product-description">{description}</p>
                                <div className="rating top-buffer">
                                    <span className="review-no">reviews&#58; {reviews.length}</span>
                                </div>
                                <h4 className="price">current price&#58; <span>{typeof (price) === 'number' ? price.toFixed(2) : null}&#36;</span></h4>
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
                        <div name="reviw-content-container" className="mt-4 mb-2">
                            <div name="review-form" className="">
                                <h4 className="mt-2">Review Product&#58;</h4>
                                <ReviewForm
                                    productId={this.props.match.params.id}
                                    update={this.updateReviews}
                                />
                            </div>
                            <div name="reviews">
                                {
                                    this.state.reviews.length > 0
                                        ? (
                                            <table className="table table-striped table-hover">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th scope="col" className="text-left">Reviews&#58;</th>
                                                        <th scope="col" className="text-center col-md-2"></th>
                                                        <th scope="col" className="text-center col-md-2"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.reviews.map(review => {
                                                            return <ReviewDisplay
                                                                key={review._id}
                                                                content={review.content}
                                                                opinion={review.opinion}
                                                                anchor={review.creator.username} />
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        )
                                        : <h3 className="text-muted">Currently there aren&#39;t any reviews for this product&#46;</h3>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetails;