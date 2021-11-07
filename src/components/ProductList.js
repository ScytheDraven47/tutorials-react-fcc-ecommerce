import React from 'react'
import { useFilterContext } from '../context/filter_context'
import { useProductsContext } from '../context/products_context'
import GridView from './GridView'
import ListView from './ListView'
import Loading from './Loading'
import { VIEW_TYPES } from '../utils/constants'

const ProductList = () => {
	const { products_loading: isLoading } = useProductsContext()
	const { filtered_products: products, view_type } = useFilterContext()

	if (isLoading) {
		return <Loading />
	}

	if (products.length < 1) {
		return (
			<h5 style={{ textTransform: 'none' }}>
				Sorry, no products matched your search...
			</h5>
		)
	}

	switch (view_type) {
		case VIEW_TYPES.GRID:
			return <GridView products={products} />
		case VIEW_TYPES.LIST:
			return <ListView products={products} />
		default:
			return (
				<h5 style={{ textTransform: 'none' }}>
					ERROR: Invalid view type...
				</h5>
			)
	}
}

export default ProductList
