var xray        =   require('x-ray');

// var url = 'http://espn.go.com/nba/team/stats/_/name/bos/boston-celtics';
// teamStats(url, process.stdout);
// teamLeaders(url, process.stdout);
// var urlRoster = 'http://espn.go.com/nba/team/roster/_/name/bos/boston-celtics';
// teamRoster(urlRoster, process.stdout);

module.exports = {
	teamStats : teamStats,
	teamLeaders : teamLeaders,
	teamRoster : teamRoster
};

// Remember to insert TOOLTIP for each field. The tooltips are the comments, like Games played
function teamStats(url, out){

	xray(url)
		.select([{
			$root: '#my-players-table > .mod-container.mod-table > div:nth-child(2) > table > tr[class*="row"]',
			name: 'td:nth-child(1) > a',				// player's name
			link: 'td:nth-child(1) > a[href]',			// link to player

			gp: 'td:nth-child(2)', 						// Games played
			gs: 'td:nth-child(3)',						// Games started
			min: 'td:nth-child(4)', 					// Minutes per game
			ppg: 'td:nth-child(5)', 					// Points per game
			offr: 'td:nth-child(6)',					// Offensive Rebounds per game
			defr: 'td:nth-child(7)',					// Defensive Rebounds per game
			rpg: 'td:nth-child(8)',						// Rebounds per game
			apg: 'td:nth-child(9)',						// Assists per game
			spg: 'td:nth-child(10)',					// Steals per game
			bpg: 'td:nth-child(11)',					// Blocks per game
			tpg: 'td:nth-child(12)',					// Turnovers per game
			fpg: 'td:nth-child(13)',					// Fouls per game
			ato: 'td:nth-child(14)',					// Assist to turnover ratio
			per: 'td:nth-child(15)'						// Player Efficiency Rating
		}]).write(out);
}



function teamLeaders(url, out){

	xray(url)
		.select([{
			$root: '#my-players-table > .mod-container.mod-stat-leaders > div.span-1 > div.mod-container.mod-stat',
			category: 'div.mod-header > h4',								// category like points
			name: 'div.mod-content > ul.player-info > li.name > a',			// top player in the category
			link: 'div.mod-content > a[href]',								// link to top player in the category
			number: 'div.mod-content > ul.player-info > li.number',			// number of top player in the category
			stat: 'div.mod-content > ul.player-info > li.stat',				// stat of top player in the category
			image: 'div.mod-content > a > img[src]' 						// image of top player in the category

		}]).write(out);

}


function teamRoster(url, out){

	xray(url)
		.select([{
			$root: '#my-players-table > .mod-container.mod-table.mod-no-header-footer > .mod-content > table > tr[class*="row"]',
			name: 'td:nth-child(2) > a',									// player name
			link: 'td:nth-child(2) > a[href]',								// link to player
			number: 'td:nth-child()',										// number of player
			pos: 'td:nth-child(1)',											// position
			age: 'td:nth-child(3)',											// età
			ht: 'td:nth-child(4)',											// height
			wt: 'td:nth-child(5)',											// weight
			college: 'td:nth-child(6)',										// college
			salary: 'td:nth-child(7)'										// salary in 2014-2015
		}]).write(out);
}