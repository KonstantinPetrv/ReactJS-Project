import { post, get } from '../data/crud';

class ProductService {
    constructor() {
        this.baseUrl = "http://localhost:9999/product";
        this.createProductUrl = this.baseUrl + '/create';
        this.allProductsUrl = this.baseUrl + '/all';
    }

    create(credentials) {
        return post(this.createProductUrl, credentials);
    }

    all() {
        return get(this.allProductsUrl);
    }
}

export default ProductService;