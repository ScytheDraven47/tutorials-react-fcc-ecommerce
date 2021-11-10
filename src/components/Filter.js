import React, { useState } from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { FaPlus, FaMinus } from 'react-icons/fa'

const Filter = ({ name, objects, currentObject }) => {
	const { updateFilters } = useFilterContext()

	const [isVisible, setIsVisible] = useState()

	return (
		<Wrapper>
			<div className='form-control'>
				<label className='form-control-label'>
					<h5>{name}</h5>
					<button
						className='drop-toggle'
						onClick={() => setIsVisible((prev) => !prev)}
					>
						{isVisible ? <FaMinus /> : <FaPlus />}
					</button>
				</label>
				<div
					className={`hideable-container ${
						isVisible ? 'show' : 'hide'
					}`}
				>
					{objects.map((o, i) => {
						return (
							<button
								key={i}
								name={name}
								onClick={updateFilters}
								value={o}
								className={
									currentObject.indexOf(o) >= 0
										? 'active'
										: ''
								}
							>
								{o}
							</button>
						)
					})}
				</div>
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
		display: flex;
		flex-direction: row;
		justify-content: space-between;
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
	}
	.color-btn {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background: #222;
		margin-right: 0.5rem;
		border: none;
		cursor: pointer;
		opacity: 0.5;
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			font-size: 0.5rem;
			color: var(--clr-white);
		}
	}
`

export default Filter
