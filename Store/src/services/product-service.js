import { post, get, remove } from '../data/crud';

class ProductService {
    constructor() {
        this.baseUrl = "http://localhost:9999/product";
        this.createProductUrl = this.baseUrl + '/create';
        this.allUrl = this.baseUrl + '/all';
        this.detailsUrl = this.baseUrl + '/details/';
        this.editUrl = this.baseUrl + '/edit/';
        this.removeUrl = this.baseUrl + '/delete/';
        this.cartUrl = this.baseUrl + '/order';
    }

    create(credentials) {
        return post(this.createProductUrl, credentials);
    }

    all() {
        return get(this.allUrl);
    }

    details(id) {
        return get(this.detailsUrl + id);
    }

    cart(products) {
        return post(this.cartUrl, products);
    }

    edit(id, credentials) {
        return post(this.editUrl + id, credentials);
    }

    remove(id, credentials) {
        return remove(this.removeUrl + id, credentials)
    }
}

export default ProductService;