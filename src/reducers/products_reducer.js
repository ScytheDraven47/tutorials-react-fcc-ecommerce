import {
	SIDEBAR_OPEN,
	SIDEBAR_CLOSE,
	GET_PRODUCTS_BEGIN,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_ERROR,
	GET_PRODUCT_BEGIN,
	GET_PRODUCT_SUCCESS,
	GET_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, action) => {
	switch (action.type) {
		case SIDEBAR_OPEN:
			return { ...state, isSidebarOpen: true }
		case SIDEBAR_CLOSE:
			return { ...state, isSidebarOpen: false }
		case GET_PRODUCTS_BEGIN:
			return { ...state, products_loading: true, products_error: false }
		case GET_PRODUCT_BEGIN:
			return { ...state, product_loading: true, product_error: false }
		case GET_PRODUCTS_ERROR:
			return { ...state, products_loading: false, products_error: true }
		case GET_PRODUCT_ERROR:
			return { ...state, product_loading: false, product_error: true }
		case GET_PRODUCTS_SUCCESS:
			const { payload: products } = action
			const featured_products = products.filter(
				(product) => product.featured === true
			)
			return {
				...state,
				products_loading: false,
				products,
				featured_products,
			}
		case GET_PRODUCT_SUCCESS:
			const { payload: product } = action
			return { ...state, product_loading: false, product }
		default:
			throw new Error(`No Matching "${action.type}" - action type`)
	}
}

export default products_reducer
