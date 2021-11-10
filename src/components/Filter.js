import React, { useState } from 'react'
import { useFilterContext } from '../context/filter_context'
import { FaCheck, FaPlus, FaMinus } from 'react-icons/fa'

const Filter = ({ name, objects, currentObject, className, textless }) => {
	const { updateFilters } = useFilterContext()

	const [isVisible, setIsVisible] = useState()

	return (
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
				className={`${className} hideable-container ${
					isVisible ? 'show' : 'hide'
				}`}
			>
				{objects.map((o, i) => {
					const isActive = currentObject.indexOf(o) >= 0
					return (
						<button
							key={i}
							name={name}
							onClick={updateFilters}
							data-value={o}
							style={textless ? { background: o } : {}}
							className={isActive ? 'active' : ''}
						>
							{!textless && o}
							{textless && isActive && <FaCheck />}
						</button>
					)
				})}
			</div>
		</div>
	)
}

export default Filter
