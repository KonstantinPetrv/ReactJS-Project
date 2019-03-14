import { get, post } from '../data/crud';

class OrderService {
    constructor() {
        this.baseUrl = "http://localhost:9999/orders";
        this.submitUrl = this.baseUrl + '/submit';
        this.pendingUrl = this.baseUrl + '/pending';
        this.approveUrl = this.baseUrl + '/approve/';
    }

    post(data) {
        return post(this.submitUrl, data);
    }

    getPending() {
        return get(this.pendingUrl);
    }

    postApprove(id) {
        return post(this.approveUrl + id);
    }
}

export default OrderService;