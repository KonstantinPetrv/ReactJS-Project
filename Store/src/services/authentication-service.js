import { post } from '../data/crud';

class AuthenticationService {
    constructor() {
        this.baseUrl = "http://localhost:9999/auth";
        this.loginUrl = this.baseUrl + '/login';
        this.registerUrl = this.baseUrl + '/register';
    }

    login(credentials) {
        return post(this.loginUrl, credentials);
    }

    register(credentials) {
        return post(this.registerUrl, credentials);
    }
}

export default AuthenticationService;