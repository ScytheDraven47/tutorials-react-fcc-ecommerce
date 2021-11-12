import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
	ADD_TO_CART,
	REMOVE_CART_ITEM,
	INCREMENT_CART_ITEM_AMOUNT,
	CLEAR_CART,
	COUNT_CART_TOTALS,
} from '../actions'

const getLocalStorageCart = () => JSON.parse(localStorage.getItem('cart')) || []

const initialState = {
	cart: getLocalStorageCart(),
	total_items: 0,
	total_amount: 0,
	shipping_fee: 599,
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(state.cart))
		dispatch({ type: COUNT_CART_TOTALS })
	}, [state.cart])

	const addToCart = (id, color, amount, product) => {
		dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } })
	}

	const removeItems = (id) => {
		dispatch({ type: REMOVE_CART_ITEM, payload: { id } })
	}
	const incrementAmount = (id, value) => {
		dispatch({ type: INCREMENT_CART_ITEM_AMOUNT, payload: { id, value } })
	}
	const clearCart = () => {
		dispatch({ type: CLEAR_CART })
	}

	return (
		<CartContext.Provider
			value={{
				...state,
				addToCart,
				removeItems,
				incrementAmount,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

// make sure use
export const useCartContext = () => {
	return useContext(CartContext)
}
