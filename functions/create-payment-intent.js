// domain/.netlify/functions/create-payment-intent

require('dotenv').config()

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET)

exports.handler = (event, context) => {
	if (event.body) {
		const { cart, shipping_fee, total_amount } = JSON.parse(event.body)

		const calculateOrderAmount = () => {
			// in live site, should re-fetch prices from backend
			return shipping_fee + total_amount
		}

		return stripe.paymentIntents
			.create({
				amount: calculateOrderAmount(),
				currency: 'usd',
			})
			.then((paymentIntent) => ({
				statusCode: 200,
				body: JSON.stringify({
					clientSecret: paymentIntent.client_secret,
				}),
			}))
			.catch((error) => ({
				statusCode: 500,
				body: JSON.stringify({ message: error.message }),
			}))
	}

	return {
		statusCode: 200,
		body: 'Create Payment Intent',
	}
}
