var streamifier = require('streamifier'),
	wrapper 	= require('./wrapper'),
	teamify	 	= require('./teamify')

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function sendLinks(res) {
	var teams = teamify.getTeams()
	var buf = []
	var i = 0
	for (var k in teams) {
		var child = wrapper('python',['./YTvideo.py', capitalizeFirstLetter(k)])
		child.stdout.on('data', function (chunk) {
			var l = chunk.toString().trim()
			buf.push(l)
			// console.log(buf.length)
			// streamifier.createReadStream('{'+l+'}').pipe(res)
		})
		child.stdout.on('end', function () {
			i++
			if (i == 30){
				uniq = buf.filter(function(elmt, pos) {
    				return buf.indexOf(elmt) == pos
				})
				// console.log(new Buffer(uniq.join('\n')));
				streamifier.createReadStream(new Buffer(uniq.join('\n'))).pipe(res)
			}
		})
	}
}

sendLinks(process.stdout)
