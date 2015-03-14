var dateutils   =   require('date-utils');
var xray = require('x-ray');

// Testing
// var url = getUrl('03','11','2015');
// process.stdout.write(url+'\n');
// scores(url, 'scores.json');
// topPlayers(url, 'topPlayers.json');

function getUrl(month, day, year){

    if (!Date.validateDay(parseInt(day), parseInt(year), parseInt(month))) // Date sanity check
    {
        console.error('Invalid date format');
        process.exit(1);
    }

    var date = new Date(month+'/'+day+'/'+year);

    if (Date.compare(Date.UTCyesterday(), date) == -1) // Date must be previous to current one
    {
        console.error('I can\'t tell you the future...');
        process.exit(1);
    }

    return 'http://scores.espn.go.com/nba/scoreboard?date='+date.toFormat('YYYYMMDD');
}

function scores(url, out){

    xray(url)
     .select([{
     	$root: '.mod-container.mod-no-header-footer.mod-scorebox.mod-nba-scorebox.final-state',
     	vteam:{                   // visitor team
     		$root: '.mod-content > .team.away',
            name: '.team-capsule > .team-name > span > a',
            link: '.team-capsule > .team-name > span > a[href]',
            record: '.team-capsule > .team-name > p',
            qtrs: ['.score > li:not(.finalScore)'],
            finl: '.score > li.finalScore'
        },
        vstats: {
        	$root: '.mod-content > :nth-last-child(2) > table > tbody ',
            pts: {
            	$root: 'tr:nth-child(1)',
                name: 'td:nth-child(2)',
                q: 'td:nth-child(3)',
                linkPlayer: 'td:nth-child(2) > a[href]'
            },
            reb: {
    			$root: 'tr:nth-child(2)',
                name: 'td:nth-child(2)',
                q: 'td:nth-child(3)',
                linkPlayer: 'td:nth-child(2) > a[href]'

            },
            ast:{
    			$root: 'tr:nth-child(3)',
                name: 'td:nth-child(2)',
                q: 'td:nth-child(3)',
                linkPlayer: 'td:nth-child(2) > a[href]'
            }
        },
         hteam:{                   // home team
            $root: '.mod-content > .team.home',
            name: '.team-capsule > .team-name > span > a',
            link: '.team-capsule > .team-name > span > a[href]',
            record: '.team-capsule > .team-name > p',
            qtrs: ['.score > li:not(.finalScore)'],
            finl: '.score > li.finalScore'
        },
        hstats: {
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
                linkPlayer: 'td:nth-child(4) > a[h'
            }
        }
     }]).write(out);
};

function topPlayers(url, out){

    xray(url)
        .select([{
            $root: '.top-performer',
            first: {
                $root: '#leader-1',
                link: 'a[href]',
                name: 'a >img[title]',
                image: 'a > img[src]',
                team: '.top-performers > li:first-child > a:last-child',
                stats: '.top-performers > li:nth-child(2)',
                game: '.top-performers > li:last-child > a',
                linkgame: '.top-performers > li:last-child > a[href]'
            },
            second: {
                $root: '#leader-2',
                link: 'a[href]',
                name: 'a >img[title]',
                image: 'a > img[src]',
                team: '.top-performers > li:first-child > a:last-child',
                stats: '.top-performers > li:nth-child(2)',
                game: '.top-performers > li:last-child > a',
                linkgame: '.top-performers > li:last-child > a[href]'
            },
            third: {
                $root: '#leader-3',
                link: 'a[href]',
                name: 'a >img[title]',
                image: 'a > img[src]',
                team: '.top-performers > li:first-child > a:last-child',
                stats: '.top-performers > li:nth-child(2)',
                game: '.top-performers > li:last-child > a',
                linkgame: '.top-performers > li:last-child > a[href]'
            }
    }]).write(out);
};