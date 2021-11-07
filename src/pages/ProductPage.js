import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { product_url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
	Loading,
	Error,
	ProductImages,
	AddToCart,
	Stars,
	PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ProductPage = () => {
	const { id } = useParams()
	const history = useHistory()
	const {
		product_loading: isLoading,
		product_error: isError,
		product,
		fetchProduct,
	} = useProductsContext()

	useEffect(() => {
		fetchProduct(`${product_url}${id}`)
	}, [])

	useEffect(() => {
		let errorTimeout
		if (isError) {
			errorTimeout = setTimeout(() => {
				history.push('/')
			}, 3000)
		}
		return () => clearTimeout(errorTimeout)
	}, [isError])

	if (isLoading) return <Loading />
	if (isError) return <Error />

	const {
		name,
		price,
		description,
		stock,
		stars,
		reviews,
		id: sku,
		company,
		images,
	} = product
	const hasStock = stock > 0
	const isLowStock = hasStock && stock < 5

	return (
		<Wrapper>
			<PageHero title={name} product />
			<div className='section section-center page'>
				<Link to='/products' className='btn'>
					back to products
				</Link>
				<div className='product-center'>
					<ProductImages images={images} />
					<section className='content'>
						<h2>{name}</h2>
						<Stars stars={stars} reviews={reviews} />
						<h5 className='price'>{formatPrice(price)}</h5>
						<p className='desc'>{description}</p>
						<p className='info'>
							<span>Available: </span>
							{isLowStock ? (
								<span className='danger'>LOW STOCK!</span>
							) : hasStock ? (
								'in stock'
							) : (
								'out of stock'
							)}
						</p>
						<p className='info'>
							<span>Brand: </span>
							{company}
						</p>
						<p className='info'>
							<span>SKU: </span>
							{sku}
						</p>
						<hr />
						{hasStock && <AddToCart product={product} />}
					</section>
				</div>
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.main`
	.product-center {
		display: grid;
		gap: 4rem;
		margin-top: 2rem;
	}
	.price {
		color: var(--clr-primary-5);
	}
	.desc {
		line-height: 2;
		max-width: 45em;
	}
	.info {
		text-transform: capitalize;
		width: 300px;
		display: grid;
		grid-template-columns: 125px 1fr;
		span {
			font-weight: 700;
		}
		.danger {
			color: firebrick;
		}
	}

	@media (min-width: 992px) {
		.product-center {
			grid-template-columns: 1fr 1fr;
			align-items: center;
		}
		.price {
			font-size: 1.25rem;
		}
	}
`

export default ProductPage
