import {
	ADD_TO_CART,
	CLEAR_CART,
	COUNT_CART_TOTALS,
	REMOVE_CART_ITEM,
	INCREMENT_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			const {
				id,
				color,
				amount,
				product: { name, price, images, stock: max },
			} = action.payload
			const itemId = id.toString().concat(color)

			const isInCart = state.cart.find((item) => item.id === itemId)
			if (isInCart)
				return {
					...state,
					cart: state.cart.map((item) => {
						if (item.id === itemId)
							return {
								...item,
								amount: Math.min(
									item.amount + amount,
									item.max
								),
							}
						return item
					}),
				}
			return {
				...state,
				cart: [
					...state.cart,
					{
						id: itemId,
						max,
						name,
						color,
						price,
						amount,
						image: images[0].url,
					},
				],
			}
		case INCREMENT_CART_ITEM_AMOUNT:
			return {
				...state,
				cart: state.cart
					.map((item) => {
						if (item.id === action.payload.id)
							return {
								...item,
								amount: Math.min(
									item.amount + action.payload.value,
									item.max
								),
							}
						return item
					})
					.filter((item) => item.amount > 0),
			}
		case REMOVE_CART_ITEM:
			return {
				...state,
				cart: state.cart.filter(
					(item) => item.id !== action.payload.id
				),
			}
		case CLEAR_CART:
			return {
				...state,
				cart: [],
			}
		case COUNT_CART_TOTALS:
			const { total_items, total_amount } = state.cart.reduce(
				(acc, item) => ({
					total_items: acc.total_items + item.amount,
					total_amount: acc.total_amount + item.amount * item.price,
				}),
				{ total_items: 0, total_amount: 0 }
			)
			return {
				...state,
				total_items,
				total_amount,
			}
		default:
			throw new Error(`No Matching "${action.type}" - action type`)
	}
}

export default cart_reducer
