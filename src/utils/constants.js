import React from 'react'
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi'
export const links = [
	{
		id: 1,
		text: 'home',
		url: '/',
	},
	{
		id: 2,
		text: 'about',
		url: '/about',
	},
	{
		id: 3,
		text: 'products',
		url: '/products',
	},
]

export const services = [
	{
		id: 1,
		icon: <GiCompass />,
		title: 'mission',
		text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
	},
	{
		id: 2,
		icon: <GiDiamondHard />,
		title: 'vision',
		text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
	},
	{
		id: 3,
		icon: <GiStabbedNote />,
		title: 'history',
		text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
	},
]

export const products_url = 'https://course-api.com/react-store-products'

export const product_url = `https://course-api.com/react-store-single-product?id=`

export const VIEW_TYPES = {
	GRID: 'GRID',
	LIST: 'LIST',
}

export const SORT_TYPES = [
	{ key: 'featured', label: 'Featured', default: true },
	{ key: 'price_asc', label: 'Price (Lowest)' },
	{ key: 'price_desc', label: 'Price (Highest)' },
	{ key: 'name_asc', label: 'Name (A-Z)' },
	{ key: 'name_desc', label: 'Name (Z-A)' },
]
