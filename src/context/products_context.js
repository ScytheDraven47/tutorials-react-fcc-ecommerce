import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url } from '../utils/constants'
import {
	SIDEBAR_OPEN,
	SIDEBAR_CLOSE,
	GET_PRODUCTS_BEGIN,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_ERROR,
	GET_SINGLE_PRODUCT_BEGIN,
	GET_SINGLE_PRODUCT_SUCCESS,
	GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
	cartTotal: 12,
	isSidebarOpen: false,
	products_loading: false,
	products_error: false,
	products: [],
	featured_products: [],
	product_loading: false,
	product_error: false,
	product: [],
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const openSidebar = () => {
		dispatch({ type: SIDEBAR_OPEN })
	}

	const closeSidebar = () => {
		dispatch({ type: SIDEBAR_CLOSE })
	}

	const fetchProducts = (url) => {
		dispatch({ type: GET_PRODUCTS_BEGIN })
		axios
			.get(url)
			.then((response) => {
				dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response.data })
			})
			.catch(() => {
				dispatch({ type: GET_PRODUCTS_ERROR })
			})
	}

	useEffect(() => {
		fetchProducts(products_url)
	}, [])

	return (
		<ProductsContext.Provider
			value={{ ...state, openSidebar, closeSidebar }}
		>
			{children}
		</ProductsContext.Provider>
	)
}
// make sure use
export const useProductsContext = () => {
	return useContext(ProductsContext)
}
