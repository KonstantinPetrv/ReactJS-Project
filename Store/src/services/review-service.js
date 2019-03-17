import { get, post, remove } from '../data/crud';

class OrderService {
    constructor() {
        this.baseUrl = "http://localhost:9999/review";
        this.submitUrl = this.baseUrl + '/submit';
        this.detailsUrl = this.baseUrl + '/details/'
        this.userReviewssUrl = this.baseUrl + '/user';
        this.removeUrl = this.baseUrl + '/delete/';
    }

    post(data) {
        return post(this.submitUrl, data);
    }

    getDetails(id) {
        return get(this.detailsUrl + id);
    }

    getUserReviews() {
        return get(this.userReviewssUrl);
    }

    remove(id) {
        return remove(this.removeUrl + id);
    }
}

export default OrderService;