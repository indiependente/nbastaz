var xray        =   require('x-ray');

var url = 'http://espn.go.com/nba/statistics';

module.exports = seasonTopPlayers;

function seasonTopPlayers(out){

	xray(url).
		select([{
			$root: '#my-players-table > div.span-2 > div> div.mod-content > table',
			category: 'tr > td',
			abbr_category: 'tr > td:nth-child(2)',
			image_top: 'tr:nth-child(2) > td > a > img[src]',
			players: ['tr:nth-child(2) > td:nth-child(2) > a', 'tr:nth-child(n+3):nth-child(-n+6) > td:nth-child(1) > a'],
			link_players: ['tr:nth-child(2) > td:nth-child(2) > a[href]', 'tr:nth-child(n+3):nth-child(-n+6) > td:nth-child(1) > a[href]'],
			scores: ['tr:nth-child(2) > td:nth-child(3)', 'tr:nth-child(n+3):nth-child(-n+6) > td:nth-child(2)']
		}]).write(out);
}