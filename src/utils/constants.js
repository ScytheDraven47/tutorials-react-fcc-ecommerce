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
	{ key: 'FEATURED', label: 'Featured', default: true },
	{ key: 'PRICE_ASC', label: 'Price (Lowest)' },
	{ key: 'PRICE_DESC', label: 'Price (Highest)' },
	{ key: 'NAME_ASC', label: 'Name (A-Z)' },
	{ key: 'NAME_DESC', label: 'Name (Z-A)' },
]
