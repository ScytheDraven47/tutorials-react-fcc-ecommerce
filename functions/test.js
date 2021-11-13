// domain/.netlify/functions/test
const items = {
	id: 47,
	name: 'scythe',
}
exports.handler = async (event, context) => {
	return { statusCode: 200, body: JSON.stringify(items) }
}
