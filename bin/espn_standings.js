var xray 		= 	require('x-ray');

var url = 'http://www.cbssports.com/nba/standings';

module.exports = standing;

function standing(out){

	xray(url)
		.select([{
			$root: '#sortableContent > table > tr.row1,tr.row2',
			team: 'td > a',							// team name
			link: 'td > a[href]',					// link to team
			w: 'td:nth-child(2)',					// wins
			l: 'td:nth-child(3)',					// losses
			pct: 'td:nth-child(4)',					// win percentage. To determine a win percentage, take the number of total games a team has played and divide it by their wins
			gb: 'td:nth-child(5)',					// how many games behind first place a team is
			home: 'td:nth-child(6)',				// record at home
			road: 'td:nth-child(7)',				// record on the road
			conf: 'td:nth-child(8)',				// record of a team against their conference
			div: 'td:nth-child(9)',					// record of a team against their own division 
			streak: 'td:nth-child(10)',				// current streak
			l10: 'td:nth-child(11)'					// how a team has done in their past ten games
		}])
		.write(out);
} 

