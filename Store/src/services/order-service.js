import { get, post, remove } from '../data/crud';

class OrderService {
    constructor() {
        this.baseUrl = "http://localhost:9999/orders";
        this.submitUrl = this.baseUrl + '/submit';
        this.pendingUrl = this.baseUrl + '/pending';
        this.approveUrl = this.baseUrl + '/approve/';
        this.userOrdersUrl = this.baseUrl + '/user';
        this.removeUrl = this.baseUrl + '/delete/';
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

    getUserOrders() {
        return get(this.userOrdersUrl);
    }

    remove(id) {
        return remove(this.removeUrl + id);
    }
}

export default OrderService;