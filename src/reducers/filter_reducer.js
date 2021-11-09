import {
	LOAD_PRODUCTS,
	SET_LISTVIEW,
	SET_GRIDVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
	TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'
import { VIEW_TYPES, SORT_TYPES } from '../utils/constants'

const filter_reducer = (state, action) => {
	switch (action.type) {
		case LOAD_PRODUCTS:
			let prices = action.payload.map((item) => item.price)
			let max_price = Math.max(...prices)
			return {
				...state,
				all_products: [...action.payload],
				filtered_products: [...action.payload],
				filters: {
					...state.filters,
					min_price: Math.min(...prices),
					price: max_price,
					max_price,
				},
			}
		case CLEAR_FILTERS:
			return {
				...state,
				filtered_products: [...state.all_products],
			}
		case SET_GRIDVIEW:
			return { ...state, view_type: VIEW_TYPES.GRID }
		case SET_LISTVIEW:
			return { ...state, view_type: VIEW_TYPES.LIST }
		case UPDATE_SORT:
			return {
				...state,
				sort_type: SORT_TYPES.find(
					(sort_type) => sort_type.key === action.payload
				),
			}
		case SORT_PRODUCTS:
			const { sort_type, filtered_products: products_to_sort } = state
			switch (sort_type.key) {
				case 'price_asc':
					return {
						...state,
						filtered_products: [...products_to_sort].sort(
							(a, b) => a.price - b.price
						),
					}
				case 'featured':
					return {
						...state,
						filtered_products: [...products_to_sort].sort((a, b) =>
							a.featured ? -1 : b.featured ? 1 : 0
						),
					}
				case 'price_desc':
					return {
						...state,
						filtered_products: [...products_to_sort].sort(
							(a, b) => b.price - a.price
						),
					}
				case 'name_asc':
					return {
						...state,
						filtered_products: [...products_to_sort].sort((a, b) =>
							a.name.localeCompare(b.name)
						),
					}
				case 'name_desc':
					return {
						...state,
						filtered_products: [...products_to_sort].sort((a, b) =>
							b.name.localeCompare(a.name)
						),
					}
				default:
					return { ...state }
			}
		case UPDATE_FILTERS:
			const { name, value } = action.payload
			return {
				...state,
				filters: {
					...state.filters,
					[name]: !Array.isArray(state.filters[name])
						? value
						: state.filters[name].indexOf(value) >= 0
						? [...state.filters[name]].filter((n) => n !== value)
						: [...state.filters[name], value],
				},
			}
		case FILTER_PRODUCTS:
			const {
				filters: { text: fName, category: fCategory },
				all_products: products_to_filter,
			} = state

			return {
				...state,
				filtered_products: [...products_to_filter].filter((product) => {
					const { name, category } = product
					if (!name.includes(fName)) return false
					if (fCategory.length > 0 && fCategory.indexOf(category) < 0)
						return false
					return true
				}),
			}
		default:
			throw new Error(`No Matching "${action.type}" - action type`)
	}
}

export default filter_reducer
