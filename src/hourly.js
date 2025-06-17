const { giveMoney } = require('./balance.js')
function hourlyCommand(userId) {
	return `New Balance: ${giveMoney(userId)}`
}

module.exports = {
	hourlyCommand
}
