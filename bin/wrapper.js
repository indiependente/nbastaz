var spawn = require('child_process').spawn

module.exports = wrap

function wrap(command, params){
	var child = spawn(command, params)
	//child.stderr.pipe(process.stderr)
	return child.stdout
}


