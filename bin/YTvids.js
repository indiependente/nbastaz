var streamifier = require('streamifier'),
	wrapper 	= require('./wrapper'),
	teamify	 	= require('./teamify')

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

// function sendLinks(res) {
// 	var teams = teamify.getTeams()
// 	var buf = []
// 	res.write('[')
// 	var i = 0
// 	for (var k in teams) {
// 		i++
// 		var child = wrapper('python',['./bin/YTvideo.py', capitalizeFirstLetter(k)])
// 		child.stdout.on('data', function (chunk) {
// 			var o = chunk.toString()
// 			var l = JSON.parse(o)
// 			if (buf.join(' ').indexOf(l.url) == -1) {
// 				buf.push(l.url)
// 				res.write(o+', ')
// 			}
// 		})
// 		child.stdout.on('end', function () {
// 			if (--i == 0) {
// 				res.write(']')
// 				res.end()
// 			}
// 		})
// 	}
// }

function sendLinks(res) {
	var bufs = []
	var child = wrapper('python',['./bin/highl_parallel.py'])
	child.stdout.on('data', function (data) { bufs.push(data) })
	child.stdout.on('end', function () { res.json(Buffer.concat(bufs).toString()) })
	child.stderr.pipe(process.stdout)
}

module.exports = sendLinks

// sendLinks(process.stdout)
