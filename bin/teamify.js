var fs 	=	require('fs')

var teams

fs.readFile('./bin/data/teams.json', 'utf8', function (err, data) {
  if (err) throw err
  teams = JSON.parse(data)
})


module.exports =
{
	getLogo : function (team){
    			for (var i = 0; i < teams.length; i++) {
        			if (teams[i].team.indexOf(team) != -1)
            			return teams[i].logo
    			}
	},
	getID	: function (team){
				for (var i = 0; i < teams.length; i++) {
        			if (teams[i].team.indexOf(team) != -1)
            			return teams[i].id
    			}
	},
	getTeam : function (id){
				if (id < 1 || id > 30)
					return null
				for (var i = 0; i < teams.length; i++) {
        			if (teams[i].team.indexOf(team) != -1)
            			return teams[i]
    			}
	}
}