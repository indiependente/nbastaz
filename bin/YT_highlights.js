var teamify	 	= require('./teamify'),
	wrapper 	= require('./wrapper')



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports = function (w_stream) {
	var buffs = []
	var teams = Object.keys(teamify.getTeams())
	teams.map(function(el){
		var s = wrapper('python', ['YTvideos.py', capitalizeFirstLetter(el)])
		s.on('data', function (chunk) {
			buffs.push(chunk)
			console.log(chunk);
		})
		s.on('end', function (chunk) {
			var buf = Buffer.concat(buffs)
			// console.log(buf.toString());
		})
	})



}


// getLinks(process.stdout)
