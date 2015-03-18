var xray        =   require('x-ray'),
    dateutils   =   require('date-utils'),
    logofy      =   require('./teamify').getLogo

// -----------------
// Testing
// var url = getUrl('03','12','2015');
// console.log(url);
// scores(url, process.stdout);
// topPlayers(url, process.stdout);
// -----------------

module.exports = {
    getUrl : getUrl,
    scores : scores,
    schedule : schedule,
    topPlayers : topPlayers
};

// from month, day, year it returns a URL from which to start the scraping for espn score or top player of the specific day
function getUrl(month, day, year){

    if (!Date.validateDay(parseInt(day), parseInt(year), parseInt(month))) // Date sanity check
    {
        console.error('Invalid date format');
        process.exit(1);
    }

    var date = new Date(month+'/'+day+'/'+year);

    // if (Date.compare(Date.UTCyesterday(), date) == -1) // Date must be previous to current one
    // {
    //     console.error('I can\'t tell you the future...');
    //     process.exit(1);
    // }

    return 'http://scores.espn.go.com/nba/scoreboard?date='+date.toFormat('YYYYMMDD');
}


// need URL from getUrl function
function scores(url, out){

    xray(url)
     .prepare('logofy', logofy)
     .select([{
     	$root: '.mod-container.mod-no-header-footer.mod-scorebox.mod-nba-scorebox.final-state',
     	vteam:{                   // visitor team
     		$root:  '.mod-content > .team.away',
            name:   '.team-capsule > .team-name > span > a',          // team name
            logo:   '.team-capsule > .team-name > span > a | logofy', // team logo
            link:   '.team-capsule > .team-name > span > a[href]',    // team page
            record: '.team-capsule > .team-name > p',               // won-lost count
            qtrs:   ['.score > li:not(.finalScore)'],                 // partial points in quarters
            //ATTENTION! the last qtrs can be empty, because espn leave the space in case of OT
            finl: '.score > li.finalScore'                          // visitor final score
        },
        vstats: {               // stats of visitor team
        	$root: '.mod-content > :nth-last-child(2) > table > tbody ',
            pts: {
            	$root: 'tr:nth-child(1)',
                name: 'td:nth-child(2)',                            // player name
                q: 'td:nth-child(3)',                               // points
                linkPlayer: 'td:nth-child(2) > a[href]'             // link to player page
                // ATTENTION! this field can be empty, just in case 2 players with the same score
            },
            reb: {
    			$root: 'tr:nth-child(2)',
                name: 'td:nth-child(2)',                            // player name
                q: 'td:nth-child(3)',                               // num of rebounds
                linkPlayer: 'td:nth-child(2) > a[href]'             // link to player page
                // ATTENTION! this field can be empty, just in case 2 players with the same score
            },
            ast:{
    			$root: 'tr:nth-child(3)',
                name: 'td:nth-child(2)',                            // player name
                q: 'td:nth-child(3)',                               // num of assists
                linkPlayer: 'td:nth-child(2) > a[href]'             // link to player page
                // ATTENTION! this field can be empty, just in case 2 players with the same score
            }
        },
         hteam:{                   // home team
            $root: '.mod-content > .team.home',
            name: '.team-capsule > .team-name > span > a',
            logo:   '.team-capsule > .team-name > span > a | logofy', // team logo
            link: '.team-capsule > .team-name > span > a[href]',
            record: '.team-capsule > .team-name > p',
            qtrs: ['.score > li:not(.finalScore)'],
            finl: '.score > li.finalScore'
        },
        hstats: {                  // stats of home team
            $root: '.mod-content > :nth-last-child(2) > table > tbody ',
            pts: {
            	$root: 'tr:nth-child(1)',
                name: 'td:nth-child(4)',
                q: 'td:nth-child(5)',
                linkPlayer: 'td:nth-child(4) > a[href]'
            },
            reb: {
    			$root: 'tr:nth-child(2)',
                name: 'td:nth-child(4)',
                q: 'td:nth-child(5)',
                linkPlayer: 'td:nth-child(4) > a[href]'
            },
            ast:{
    			$root: 'tr:nth-child(3)',
                name: 'td:nth-child(4)',
                q: 'td:nth-child(5)',
                linkPlayer: 'td:nth-child(4) > a[href]'
            }
        }
     }]).write(out); // out must be a variable or a WritableStream
};

// need URL from getUrl function
function schedule(url, out){

    xray(url)
     .prepare('logofy', logofy)
     .select([{

        $root: '.mod-container.mod-no-header-footer.mod-scorebox.mod-nba-scorebox.preview',
        vteam:{                   // visitor team
            $root:  '.mod-content > .team.away',
            name:   '.team-capsule > .team-name > span > a',            // team name
            logo:   '.team-capsule > .team-name > span > a | logofy',  // team logo
            link:   '.team-capsule > .team-name > span > a[href]',    // team page
            record: '.team-capsule > .team-name > p'                 // won-lost count
        },
         hteam:{                   // home team
            $root: '.mod-content > .team.home',
            name: '.team-capsule > .team-name > span > a',
            logo:   '.team-capsule > .team-name > span > a | logofy', // team logo
            link: '.team-capsule > .team-name > span > a[href]',
            record: '.team-capsule > .team-name > p'
        },
        time: 'div.mod-content > div.game-header > div.game-status > p'
     }]).write(out); // out must be a variable or a WritableStream
};

// need URL from getUrl function
function topPlayers(url, out){
    xray(url)
        .select([{
            $root: '#content > div.span-2.last > div.mod-container.mod-scoreboard > div.mod-content > ul > li',
            link: 'a[href]',                                            // link to player page
            name: 'a >img[title]',                                      // name of player
            image: 'a > img[src]',                                      // player image
            team: '.top-performers > li:first-child > a:last-child',    // player team
            stats: '.top-performers > li:nth-child(2)',                 // stats of player with format: x pts, y reb, z ast
            game: '.top-performers > li:last-child > a',                // short preview of the opposing team
            linkgame: '.top-performers > li:last-child > a[href]'       // link to game
    }]).write(out); // out must be a variable or a WritableStream
};