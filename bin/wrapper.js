var spawn = require('child_process').spawn

module.exports = wrap

function wrap(command, params){
	return spawn(command, params, {
    stdio: [
      0, // use parents stdin for child
      'pipe', // pipe child's stdout to parent
      ]
	});
}
