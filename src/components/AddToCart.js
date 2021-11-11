import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'

const AddToCart = ({ product }) => {
	const { id, stock, colors } = product
	const { addToCart } = useCartContext()

	const [mainColor, setMainColor] = useState(colors[0])
	const [amount, setAmount] = useState(1)

	const increment = (x) => {
		setAmount((prev) => {
			let newAmount = prev + x
			if (newAmount < 1) return prev
			if (newAmount > stock) return prev
			return newAmount
		})
	}

	return (
		<Wrapper>
			<div className='colors'>
				<span>colors: </span>
				<div>
					{colors.map((color, index) => {
						const isMain = mainColor === color
						return (
							<button
								key={index}
								onClick={() => setMainColor(color)}
								style={{ background: color }}
								className={`color-btn ${
									isMain ? 'active' : ''
								}`}
							>
								{isMain && <FaCheck />}
							</button>
						)
					})}
				</div>
			</div>
			<div className='btn-container'>
				<AmountButtons amount={amount} increment={increment} />
				<Link
					to='/cart'
					className='btn'
					onClick={() => addToCart(id, mainColor, amount, product)}
				>
					add to cart
				</Link>
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.section`
	margin-top: 2rem;
	.colors {
		display: grid;
		grid-template-columns: 125px 1fr;
		align-items: center;
		margin-bottom: 1rem;
		span {
			text-transform: capitalize;
			font-weight: 700;
		}
		div {
			display: flex;
		}
	}
	.color-btn {
		color: var(--clr-black);
		display: inline-block;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		background: #222;
		margin-right: 0.5rem;
		border: none;
		box-shadow: 0px 0px 0rem 0.1rem currentColor;
		cursor: pointer;
		opacity: 0.5;
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			font-size: 0.75rem;
			color: currentColor;
		}
	}
	.active {
		opacity: 1;
		box-shadow: 0px 0px 0.2rem 0.1rem currentColor;
	}
	.btn-container {
		margin-top: 2rem;
	}

	.btn {
		margin-top: 1rem;
		width: 140px;
	}
`
export default AddToCart
