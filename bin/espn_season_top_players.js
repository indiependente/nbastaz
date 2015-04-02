var xray        =   require('x-ray'),
	getTeamName =	require('./playerify').getTeamName,
	getTeamAbbr = 	require('./playerify').getTeamAbbr;


var url = 'http://espn.go.com/nba/statistics';
// seasonTopPlayers(process.stdout);

module.exports = seasonTopPlayers;

function getID(string){
	return string.split('/')[7];
}

// output: for every category, the output is:
// 		category: 		category like points, rebounds...
//		abbr_category: 	the image of top player in the category
// 		players: 		array of players' names ordered by the top to the lowest. |players| = 5
//		link_players: 	array of players' links. |link_players|=5
// 		scores: 		array of players' scores ordered by the top to the lowest. |scores| = 5
function seasonTopPlayers(out){

	xray(url)
		.prepare('getTeamName', getTeamName)
		.prepare('getTeamAbbr', getTeamAbbr)
		.prepare('getID', getID)
		.select([{
			$root: '#my-players-table > div.span-2 > div> div.mod-content > table',
			category: 'tr > td',
			id: 'tr:nth-child(2) > td:nth-child(2) > a[href] | getID',
			team: 'tr:nth-child(2) > td:nth-child(2) > a[href] | getID | getTeamName',
			abbr_team: 'tr:nth-child(2) > td:nth-child(2) > a[href] | getID | getTeamAbbr',
			abbr_category: 'tr > td:nth-child(2)',
			image_top: 'tr:nth-child(2) > td > a > img[src]',
			player: 'tr:nth-child(2) > td:nth-child(2) > a', 
			link_player: 'tr:nth-child(2) > td:nth-child(2) > a[href]',
			score: 'tr:nth-child(2) > td:nth-child(3)'
		}]).write(out);
}