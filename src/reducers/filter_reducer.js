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
				filters: {
					...state.filters,
					text: '',
					company: [],
					category: [],
					color: [],
					price: state.filters.max_price,
					shipping: false,
				},
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
			const { name, value, dataset, checked } = action.payload

			let val = value
			if (dataset.value != null) val = dataset.value
			if (checked != null && value === 'on') val = checked

			let newValue
			if (Array.isArray(state.filters[name])) {
				newValue =
					state.filters[name].indexOf(val) >= 0
						? [...state.filters[name]].filter((n) => n !== val)
						: [...state.filters[name], val]
			} else if (typeof state.filters[name] === 'number') {
				newValue = parseInt(val)
			} else {
				newValue = val
			}

			return {
				...state,
				filters: {
					...state.filters,
					[name]: newValue,
				},
			}
		case FILTER_PRODUCTS:
			const {
				filters: {
					text: fName,
					category: fCategory,
					company: fCompany,
					color: fColor,
					price: fPrice,
					shipping: fShipping,
				},
				all_products: products_to_filter,
			} = state

			return {
				...state,
				filtered_products: [...products_to_filter].filter((product) => {
					const { name, category, company, colors, price, shipping } =
						product
					if (!name.includes(fName)) return false
					if (fCategory.length > 0 && fCategory.indexOf(category) < 0)
						return false
					if (fCompany.length > 0 && fCompany.indexOf(company) < 0)
						return false
					if (
						fColor.length > 0 &&
						colors.every((c) => fColor.indexOf(c) < 0)
					)
						return false
					if (price > fPrice) return false
					if (fShipping && !shipping) return false
					return true
				}),
			}
		default:
			throw new Error(`No Matching "${action.type}" - action type`)
	}
}

export default filter_reducer
