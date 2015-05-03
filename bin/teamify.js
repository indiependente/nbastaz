var fs 	=	require('fs')


var teams = JSON.parse(fs.readFileSync('./bin/data/espn_teams.json', 'utf8'))


module.exports =
{
	getLogo : function (abbr){
                var low_split = abbr.toLowerCase().split(' ')
                var k = low_split[low_split.length - 1]
    			if (teams.hasOwnProperty(k))
                    return teams[k].logo
                return {}
	},
    getLogoByName : function (team){
                for (var k in teams) {
                    if (teams.hasOwnProperty(k)) {
                        if (teams[k].team == team)
                            return teams[k].logo
                    }
                }
    },
	getID	: function (abbr){
                var k = abbr.toLowerCase()
                if (teams.hasOwnProperty(k))
                    return teams[k].id
                return {}
    },
    getTeamByAbbr : function (abbr){
                var k = abbr.toLowerCase()
                if (teams.hasOwnProperty(k))
                    return teams[k]
                return {}
    },
	getTeamByID : function (id){
				if (id < 1 || id > 30)
					return null
                for (var k in teams) {
                    if (teams.hasOwnProperty(k)) {
                        if (teams[k].id == id)
                            return teams[k]
                    }
                }
	},
    getStats : function (abbr){
                var k = abbr.toLowerCase()
                if (teams.hasOwnProperty(k))
                    return teams[k].stats
                return {}
    },
    getRoster : function(abbr){
                var k = abbr.toLowerCase()
                if (teams.hasOwnProperty(k))
                    return teams[k].roster
                return {}
    },
    getDepth : function(abbr){
                var k = abbr.toLowerCase()
                if (teams.hasOwnProperty(k))
                    return teams[k].depth
                return {}
    },
    getTeams : function(){
                return teams
    }
}