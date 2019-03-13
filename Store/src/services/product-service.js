import { post, get } from '../data/crud';

class ProductService {
    constructor() {
        this.baseUrl = "http://localhost:9999/product";
        this.createProductUrl = this.baseUrl + '/create';
        this.allUrl = this.baseUrl + '/all';
        this.detailsUrl = this.baseUrl + '/details/';
        this.editUrl = this.baseUrl + '/edit/';
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

    edit(id, credentials) {
        return post(this.editUrl + id, credentials);
    }
}

export default ProductService;