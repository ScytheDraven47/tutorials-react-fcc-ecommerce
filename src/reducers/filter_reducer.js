import {
	LOAD_PRODUCTS,
	SET_LISTVIEW,
	SET_GRIDVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
} from '../actions'
import { VIEW_TYPES } from '../utils/constants'

const filter_reducer = (state, action) => {
	switch (action.type) {
		case LOAD_PRODUCTS:
			return {
				...state,
				all_products: [...action.payload],
				filtered_products: [...action.payload],
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
		default:
			throw new Error(`No Matching "${action.type}" - action type`)
	}
}

export default filter_reducer
