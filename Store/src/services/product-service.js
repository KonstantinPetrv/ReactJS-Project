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
        this.searchUrl = this.baseUrl + '/search/';
    }

    create(credentials) {
        return post(this.createProductUrl, credentials);
    }

    all() {
        return get(this.allUrl);
    }

    getSearch(query) {
        return get(this.searchUrl + query);
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