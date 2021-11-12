import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {
	About,
	Cart,
	Checkout,
	Error,
	Home,
	PrivateRoute,
	Products,
	Product,
	AuthWrapper,
} from './pages'

function App() {
	return (
		<AuthWrapper>
			<Router>
				<Navbar />
				<Sidebar />
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route exact path='/about'>
						<About />
					</Route>
					<Route exact path='/cart'>
						<Cart />
					</Route>
					<Route exact path='/products'>
						<Products />
					</Route>
					<Route exact path='/products/:id'>
						<Product />
					</Route>
					<PrivateRoute exact path='/checkout'>
						<Checkout />
					</PrivateRoute>
					<Route path='*'>
						<Error />
					</Route>
				</Switch>
				<Footer />
			</Router>
		</AuthWrapper>
	)
}

export default App
