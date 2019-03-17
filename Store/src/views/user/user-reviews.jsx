import React, { Component } from "react";
import { toast } from 'react-toastify';
import ReviewService from '../../services/review-service';
import ReviewDisplay from "../../components/displays/review-display";

class UserReviews extends Component {
    static service = new ReviewService();

    constructor(props) {
        super(props);

        this.state = {
            reviews: []
        }
    }

    getReviews = () => {
        UserReviews.service.getUserReviews()
            .then((body) => {
                this.setState({
                    reviews: body
                })
            })
    }

    removeReview = (id) => {
        UserReviews.service.remove(id)
            .then((data) => {
                toast.success(data.message)
                this.getReviews();
            }).catch((err) => console.error(err))
    }

    componentWillMount() {
        this.getReviews();
    }

    render() {
        return (
            <div>
                <h3 className="top-buffer">Reviews&#58;</h3>
                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col" className="text-center">Product</th>
                            <th scope="col" className="text-center">Review</th>
                            <th scope="col" className="text-center">Opinion</th>
                            <th scope="col" className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.reviews.map((review) => {
                            return (
                                <ReviewDisplay
                                    key={review._id}
                                    content={review.content}
                                    opinion={review.opinion}
                                    anchor={review.product.title}
                                    creator={true}
                                    action={this.removeReview}
                                    id={review._id}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div >
        )
    }
}

export default UserReviews;