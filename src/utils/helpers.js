export const formatPrice = (number) => {
	return new Intl.NumberFormat('en-NZ', {
		style: 'currency',
		currency: 'NZD',
	}).format(number / 100)
}

export const getUniqueValues = () => {}
