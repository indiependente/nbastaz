var xray        =   require('x-ray');

// var url = 'http://espn.go.com/nba/player/_/id/3978/demar-derozan'
// getPlayerInfo(url, process.stdout)

function born(str){
	return str.substring(4);
}

function draf_coll(str){
	return str.substring(7);
}

function experience(str){
	return str.substring(10);
}

function getID(){
	return urlPlayer.split('/')[7];
}

function getTeamID(str){
	var array = str.split(" ");
	return array[array.length-1].toLowerCase();
}
// ___________________________ ADD TOOLTIP TO GAMELOG _________________________________________
// output:
// {
// 	name: 							name of player
// 	numb_pos: 						number and pos, like "#4 SF"
// 	height_weight:					like this 6' 7", 240 lbs
// 	team: 							name of team
// 	link_team: 						link to team
// 	born: 							info about born like Oct 6, 1990 in Tyler, TX (Age: 24) 
// 	drafted: 						like 2012: 2nd Rnd, 37th by TOR
// 	college: 						like Baylor
// 	experience: 					like years
// 	season: 						like 2014-15 Season
// 	ppg: 							point for game
// 	apg: 							assist for game
// 	rpg: 							rebounds for game
// 	per: 							player efficiency rating
// 	career_ppg		
// 	career_apg
// 	career_rpg
// 	salary: 						like $915,243
// 	expiration_salary: 				like 1 year remaining
// 	gamelog: {		// all values are array. ______REMEMBER TOOLTIP_______
//		date: 						dates of matches  					--- Tooltip: DATE
//		opponent_team: 				abbr of teams opponent  			---	Tooltip: OPP     
//		link_opponent_team: 		link to team
//		win_or_lose: 				like W or L 						---	Tooltip: SCORE
//		result: 					result of matches					--- Tooltip: SCORE, together to win_or_lose
//		min: 						Minutes								--- Tooltip: MIN
//		fgm_fga: 					Field Goals Made-Attempted			--- Tooltip: FGM_FGA
//		fg: 						Field Goal Percentage 				--- Tooltip: FG%
//		pm3_pa3						3 Point Field Goals Made-Attempted	--- Tooltip: 3PM-3PA
// 		p3: 						3 Point Field Goal Percentage 		--- Tooltip: 3P%
// 		ftm_fta: 					Free Throws Made-Attempted			--- Tooltip: FTM-FTA	
// 		ft: 						Free Throw Percentage 				--- Tooltip: FT%
// 		reb: 						Rebounds 							--- Tooltip: REB 							
// 		ast: 						Assists 							--- Tooltip: AST
// 		blk: 						Blocks 								--- Tooltip: BLK
// 		stl: 						Steals 								--- Tooltip: STL
// 		pf: 						Fouls 								--- Tooltip: PF
// 		to: 						Turnovers 							--- Tooltip: TO
// 		pts: 						Points 								--- Tooltip: PTS

//	}
// }
function getPlayerInfo(url, out){
	urlPlayer = url; 
	xray(url)
		.prepare('born', born)
		.prepare('draf_coll', draf_coll)
		.prepare('experience', experience)
		.prepare('getID', getID)
		.prepare('getTeamID', getTeamID)
		.select([{
			$root: '#content',
			id: '| getID',
			teamID: '.mod-container.mod-no-header-footer.mod-page-header > div.mod-content > div.player-bio > ul.general-info > li:nth-child(3) > a | getTeamID',
			name : '.mod-container.mod-no-header-footer.mod-page-header > div.mod-content > h1',
			team: '.mod-container.mod-no-header-footer.mod-page-header > div.mod-content > div.player-bio > ul.general-info > li:nth-child(3) > a',
			link_team: '.mod-container.mod-no-header-footer.mod-page-header > div.mod-content > div.player-bio > ul.general-info > li:nth-child(3) > a[href]',
			// image: dal file
			numb_pos: '.mod-container.mod-no-header-footer.mod-page-header > div.mod-content > div.player-bio > ul.general-info > li:first-child',
			height_weight: '.mod-container.mod-no-header-footer.mod-page-header > div.mod-content > div.player-bio > ul.general-info > li:nth-child(2)',
			born: '.mod-container.mod-no-header-footer.mod-page-header > div.mod-content > div.player-bio > .player-metadata.floatleft > li:nth-child(1) | born',		// delete "Born"
			drafted: '.mod-container.mod-no-header-footer.mod-page-header > div.mod-content > div.player-bio > .player-metadata.floatleft > li:nth-child(2) | draf_coll', 	// delete "Drafted"
			college: '.mod-container.mod-no-header-footer.mod-page-header > div.mod-content > div.player-bio > .player-metadata.floatleft > li:nth-child(3) | draf_coll',	// delete "College"
			experience: '.mod-container.mod-no-header-footer.mod-page-header > div.mod-content > div.player-bio > .player-metadata.floatleft > li:nth-child(4) | experience',	// delete "Experience"
			season: '.mod-container.mod-no-header-footer.mod-page-header > div.mod-content > div.player-stats > p',
			ppg: '.mod-container.mod-no-header-footer.mod-page-header > div.mod-content > div.player-stats > table.header-stats > tr:first-child > td:nth-child(1)',
			apg: '.mod-container.mod-no-header-footer.mod-page-header > div.mod-content > div.player-stats > table.header-stats > tr:first-child > td:nth-child(2)',
			rpg: '.mod-container.mod-no-header-footer.mod-page-header > div.mod-content > div.player-stats > table.header-stats > tr:first-child > td:nth-child(3)',
			per: '.mod-container.mod-no-header-footer.mod-page-header > div.mod-content > div.player-stats > table.header-stats > tr:first-child > td:nth-child(4)',
			career_ppg: '.mod-container.mod-no-header-footer.mod-page-header > div.mod-content > div.player-stats > table.header-stats > tr.career > td:nth-child(1)',
			career_apg: '.mod-container.mod-no-header-footer.mod-page-header > div.mod-content > div.player-stats > table.header-stats > tr.career > td:nth-child(2)',
			career_rpg: '.mod-container.mod-no-header-footer.mod-page-header > div.mod-content > div.player-stats > table.header-stats > tr.career > td:nth-child(3)',
			salary: 'div.bg-opaque > .span-2.last > .mod-container.mod-no-footer.mod-open-list.mod-quick-facts > div.mod-content > ul > li > dl > dt > strong',
			expiration_salary: 'div.bg-opaque > .span-2.last > .mod-container.mod-no-footer.mod-open-list.mod-quick-facts > div.mod-content > ul > li > dl > dd > span',
			gamelog:{
				$root: 'div.bg-opaque > .span-6.last > div.mod-container.mod-table.mod-no-footer:nth-child(3) > div.mod-content > table > tr[class*=team]',
				date: ['td:nth-child(1)'],
				opponent_team: ['td:nth-child(2) > ul.game-schedule > li.team-name > a'],
				link_opponent_team: ['td:nth-child(2) > ul.game-schedule > li.team-name > a[href]'],
				win_or_lose: ['td:nth-child(3) > span'],
				result: ['td:nth-child(3) > a'],
				min: ['td:nth-child(4)'],
				fgm_fga: ['td:nth-child(5)'],
				fg: ['td:nth-child(6)'],	
				pm3_pa3: ['td:nth-child(7)'],	
				p3: ['td:nth-child(8)'],	//percentage
				ftm_fta: ['td:nth-child(9)'],
				ft: ['td:nth-child(10)'],	
				reb: ['td:nth-child(11)'],
				ast: ['td:nth-child(12)'],
				blk: ['td:nth-child(13)'],
				stl: ['td:nth-child(14)'],
				pf: ['td:nth-child(15)'],
				to: ['td:nth-child(16)'],
				pts: ['td:nth-child(17)']		
			}
		}]).write(out)
}

