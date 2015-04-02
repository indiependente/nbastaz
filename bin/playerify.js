var fs 	=	require('fs')

var players

fs.readFile('./bin/data/espn_players.json', 'utf8', function (err, data) {
  if (err) throw err
  players = JSON.parse(data)
})

module.exports = {
	getPlayerByID : function (id){
		if (players.hasOwnProperty(id))
            return players[id]
        return {}
	},
	getPlayers : function(){
		return players
	},
	getImage : function(id){
		if (players.hasOwnProperty(id))
            return players[id].image
        return {}
	},
	getTeamName : function(id){
		if (players.hasOwnProperty(id))
			return players[id].teamName
		return {}
	},
	getTeamAbbr : function(id){
		if (players.hasOwnProperty(id))
			return players[id].teamAbbr
		return {}
	}
}