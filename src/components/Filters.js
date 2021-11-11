import React from 'react'
import styled from 'styled-components'
import Filter from './Filter'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'

const Filters = () => {
	const {
		filters: {
			text,
			category,
			company,
			color,
			min_price,
			price,
			max_price,
			shipping,
		},
		updateFilters,
		clearFilters,
		all_products,
	} = useFilterContext()

	const companies = getUniqueValues(all_products, 'company')
	const categories = getUniqueValues(all_products, 'category')
	const colors = getUniqueValues(all_products, 'colors')

	return (
		<Wrapper>
			<div className='content'>
				<form onSubmit={(e) => e.preventDefault()}>
					{/* search input */}
					<div className='form-control'>
						<input
							type='text'
							name='text'
							placeholder='search'
							className='search-input'
							value={text}
							onChange={updateFilters}
						/>
					</div>
					{/* end search input */}
					<Filter
						name={'category'}
						objects={categories}
						currentObject={category}
						className={'categories'}
					/>
					<Filter
						name={'company'}
						objects={companies}
						currentObject={company}
						className={'companies'}
					/>
					<Filter
						name={'color'}
						objects={colors}
						currentObject={color}
						className={'colors'}
						textless
					/>
					<div className='form-control'>
						<h5>price</h5>
						<p className='price'>{formatPrice(price)}</p>
						{/* TODO convert to editable content */}
						<input
							type='range'
							name='price'
							min={min_price}
							max={max_price}
							value={price}
							onChange={updateFilters}
						/>
					</div>
					<div className='form-control'>
						<label className='form-control-label shipping'>
							<h5>free shipping</h5>
							<input
								type='checkbox'
								name='shipping'
								id='shipping'
								onChange={updateFilters}
								checked={shipping}
							/>
							<span className='checkbox'></span>
						</label>
					</div>
				</form>
				<button
					type='button'
					className='clear-btn'
					onClick={clearFilters}
				>
					clear filters
				</button>
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.section`
	.form-control {
		margin-bottom: 1.25rem;
		h5 {
			margin-bottom: 0.5rem;
		}
	}
	.form-control-label {
		cursor: pointer;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.search-input {
		padding: 0.5rem;
		background: var(--clr-grey-10);
		color: var(--clr-grey-1);
		border-radius: var(--radius);
		border-color: transparent;
		letter-spacing: var(--spacing);
	}
	.search-input::placeholder {
		text-transform: capitalize;
	}

	.hideable-container {
		transition: all 0.25s ease-out;
		transform-origin: top;
		&.hide {
			transform: scaleY(0);
			max-height: 0;
		}
		&.show {
			transform: scaleY(1);
			max-height: 20rem;
		}
	}

	button {
		display: block;
		margin: 0.25em 0;
		padding: 0.25rem 0;
		text-transform: capitalize;
		background: transparent;
		border: none;
		border-bottom: 1px solid transparent;
		letter-spacing: var(--spacing);
		color: var(--clr-grey-5);
		cursor: pointer;
	}
	.active {
		border-color: var(--clr-grey-5);
	}
	.colors {
		display: flex;
		align-items: center;

		button {
			color: var(--clr-black);
			display: inline-block;
			width: 1rem;
			height: 1rem;
			border-radius: 50%;
			background: #222;
			margin-right: 0.5rem;
			border: none;
			box-shadow: 0px 0px 0rem 0.05rem currentColor;
			cursor: pointer;
			opacity: 0.5;
			display: flex;
			align-items: center;
			justify-content: center;
			svg {
				pointer-events: none;
				font-size: 0.5rem;
				color: currentColor;
			}
		}
		.active {
			opacity: 1;
			box-shadow: 0px 0px 0.1rem 0.05rem currentColor;
		}
	}

	.shipping {
		position: relative;

		input {
			position: absolute;
			opacity: 0;
			height: 0;
			width: 0;

			&:checked ~ .checkbox:after {
				display: block;
			}
		}

		/* Create a custom checkbox */
		.checkbox {
			position: relative;
			height: 1.2em;
			width: 1.2em;
			background-color: var(--clr-white);
			border-radius: var(--radius);
			border: 1px solid var(--clr-grey-5);
			display: grid;
			place-items: center;

			/* Create the checkmark/indicator (hidden when not checked) */
			&:after {
				content: '';
				display: none;

				width: 0.4em;
				height: 0.8em;
				border: solid var(--clr-black);
				border-width: 0 0.2em 0.2em 0;
				-webkit-transform: rotate(45deg);
				-ms-transform: rotate(45deg);
				transform: rotate(45deg);
			}
		}

		/* On mouse-over, add a grey background color */
		&:hover input ~ .checkbox {
			background-color: var(--clr-grey-10);
		}
	}

	.all-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 0.5rem;
		opacity: 0.5;
	}
	.active {
		opacity: 1;
	}
	.all-btn .active {
		text-decoration: underline;
	}
	.price {
		margin-bottom: 0.25rem;
	}
	.clear-btn {
		background: var(--clr-red-dark);
		color: var(--clr-white);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius);
	}
	@media (min-width: 768px) {
		.content {
			position: sticky;
			top: 1rem;
		}
	}
`

export default Filters
