import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
	LOAD_PRODUCTS,
	SET_GRIDVIEW,
	SET_LISTVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'
import { VIEW_TYPES, SORT_TYPES } from '../utils/constants'

const initialState = {
	filtered_products: [],
	all_products: [],
	view_type: VIEW_TYPES.GRID,
	sort_type: SORT_TYPES.find((sort_type) => sort_type.default),
	filters: {
		text: '',
		company: 'all',
		category: 'all',
		color: 'all',
		min_price: 0,
		max_price: 0,
		companies: [],
		categories: [],
		colors: [],
		price: 0,
		shipping: false,
	},
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
	const { products } = useProductsContext()
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		dispatch({ type: LOAD_PRODUCTS, payload: products })
	}, [products])

	useEffect(() => {
		dispatch({ type: FILTER_PRODUCTS })
		dispatch({ type: SORT_PRODUCTS })
	}, [products, state.sort_type, state.filters])

	const setGridView = () => {
		dispatch({ type: SET_GRIDVIEW })
	}
	const setListView = () => {
		dispatch({ type: SET_LISTVIEW })
	}

	const updateSortType = (e) => {
		dispatch({ type: UPDATE_SORT, payload: e.target.value })
	}

	const updateFilters = (e) => {
		dispatch({ type: UPDATE_FILTERS, payload: e.target })
	}

	const clearFilters = () => {
		dispatch({ type: CLEAR_FILTERS })
	}

	return (
		<FilterContext.Provider
			value={{
				...state,
				setGridView,
				setListView,
				updateSortType,
				updateFilters,
				clearFilters,
			}}
		>
			{children}
		</FilterContext.Provider>
	)
}

export const useFilterContext = () => {
	return useContext(FilterContext)
}
