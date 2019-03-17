# The app

ReactJS-Project is a small shopping app with basic functionality.

## Idea
Anonymous users have access to a home view which contains a search bar and all available products in the store. They also have access to a detailed view of products and can add them to their cart.

Logged-in users have all the functionality that anonymous users have. They can also make orders, write reviews, see all his written reviews and order history where they can also cancel all of their pending orders.

Admins can do all everything normal users can, however they can also make, edit delete producs, and approve orders.

## Security and Validation
The app validates everything that the user is doing. Incase they to access a route they shouldn't have access to they will be redirected by the front-end. If they manage to bypass the front-end validation the backend will not allow them to make any requests wihtout proper authorization.

In case of an error or any appropriate message are being displayed by the [react-toastify](https://www.npmjs.com/package/react-toastify/v/1.4.3) library.

## Routes

The app split in 3 parts
1. **Public** - Accessable by anyone.
2. **Private** - Logged in users have access.
3. **Administrative** - Only admins can access.

#### Authorization is being checked by a *AuthRoute* component.

``` javascript
	<Route path="/" exact component={Home} />
	<Route path="/product/search" component={SearchResults} />
	<Route path="/register" exact render={() => (
		!!window.localStorage.getItem('auth_token')
			? <Redirect to='/' />
			: <Register />
    )} />
	<Route path="/login" exact render={() => (
		!!window.localStorage.getItem('auth_token')
			? <Redirect to='/' />
			: <Login />
    )} />
    <Route path="/logout" exact component={Logout} />
    <AuthRoute path="/product/create" exact
		component={ProductCreate}
        allowedRoles={['Admin']}
        isLoggedIn={!!window.localStorage.getItem('auth_token')} />
	<AuthRoute path="/product/edit/:id"
		component={ProductEdit}
        allowedRoles={['Admin']}
        isLoggedIn={!!window.localStorage.getItem('auth_token')} />
    <Route path="/product/details/:id" component={ProductDetails} />
    <AuthRoute path="/product/delete/:id"
		component={ProductDelete}
        allowedRoles={['Admin']}
        isLoggedIn={!!window.localStorage.getItem('auth_token')} />
    <AuthRoute path="/orders/pending" exact
		component={OrdersPending}
		allowedRoles={['Admin']}
        isLoggedIn={!!window.localStorage.getItem('auth_token')} />
    <Route path="/orders/checkout" component={Checkout} />
    <AuthRoute path="/user/orders"
		component={UserOrders}
        isLoggedIn={!!window.localStorage.getItem('auth_token')} />
    <AuthRoute path="/user/reviews"
		component={UserReviews}
        isLoggedIn={!!window.localStorage.getItem('auth_token')} />
    <Route component={NotFound} />
```
## Services
 AuthenticationService handles user requests.
 
 OrderService handles all order requests.
 
 ProductService handles all product requests.
 
 ReviewService handles all review requests.