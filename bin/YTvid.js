var streamifier = require('streamifier'),
	wrapper 	= require('./wrapper')

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}


function sendLink(res, team) {
	var bufs = []
	var child = wrapper('python',['./bin/YTvideo.py', team])
	child.stdout.on('data', function (data) { bufs.push(data) })
	child.stdout.on('end', function () { res.json(Buffer.concat(bufs).toString()) })
	child.stderr.pipe(process.stdout)
}

module.exports = sendLink

// sendLink(process.stdout, 'Raptors')
