var spawn = require('child_process').spawn

module.exports = wrap

function wrap(command, params){
	var child = spawn(command, params)
	return child.stdout
}


