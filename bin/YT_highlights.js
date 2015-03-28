var teamify	 	= require('./teamify'),
	wrapper 	= require('./wrapper')



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
function getTeamHL (team){
	var s = wrapper('python', ['YTvideos.py', capitalizeFirstLetter(el)])
	s.on('data', function (chunk) {
		buffs.push(chunk)
		// console.log(chunk);
	})
	s.on('end', function (chunk) {
		var buf = Buffer.concat(buffs)
		// console.log(buf.toString());
	})
}
module.exports = {
	all_highlights : function (w_stream) {
						var buffs = []
						var teams = Object.keys(teamify.getTeams())
						teams.map(getTeamHL(el))
					},
	team_highlights : getTeamHL
}


// getLinks(process.stdout)
