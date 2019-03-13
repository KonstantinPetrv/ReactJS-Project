import { get,post } from '../data/crud';

class OrderService {
    constructor() {
        this.baseUrl = "http://localhost:9999/orders";
        this.submitUrl = this.baseUrl + '/submit';
        this.pendingUrl = this.baseUrl + '/pending';
    }

    post(data) {
        return post(this.submitUrl, data);
    }

    pendingGet() {
        return get(this.pendingUrl);
    }
}

export default OrderService;