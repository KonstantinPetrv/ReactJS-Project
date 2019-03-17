import React, { Component } from 'react';
import { toast } from 'react-toastify';
import ReviewService from '../../services/review-service';

class ReviewForm extends Component {
    static service = new ReviewService();

    state = {
        content: '',
        opinion: 'Positive'
    }

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            content: this.state.content,
            productId: this.props.productId,
            opinion: this.state.opinion
        }


        ReviewForm.service.post(data)
            .then(({ success, message, data }) => {
                success
                    ? toast.success(message)
                    : toast.error('Something went wrong.');
                this.props.update(data);
                this.setState({
                    content: ''
                })
            }).catch((err) => console.log(err));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="top-buffer border-bottom mb-4">
                <div className="form-group row">
                    <div className="col-xl-12">
                        <textarea
                            type="description"
                            className="form-control"
                            rows="5"
                            name="content"
                            id="content"
                            placeholder="Write a review&#58;"
                            value={this.state.content}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                    <input
                        type="radio"
                        id="positive"
                        name="opinion"
                        value="Positive"
                        className="custom-control-input"
                        onChange={this.handleChange} />
                    <label
                        className="custom-control-label"
                        htmlFor="positive">
                        : Positive
                        </label>
                </div>
                <span className="custom-control custom-radio custom-control-inline col-md-8">
                    <input
                        type="radio"
                        id="negative"
                        name="opinion"
                        className="custom-control-input"
                        value="Negative"
                        onChange={this.handleChange} />
                    <label
                        className="custom-control-label"
                        htmlFor="negative">
                        : Negative
                        </label>
                    <span className="col-md-3">
                        <button type="submit" className="btn btn-primary float-right mb-2">Submit</button>
                    </span>
                </span>
            </form >
        )
    }
}

export default ReviewForm;