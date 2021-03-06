var xray        =   require('x-ray'),
    phantom     =   require('x-ray-phantom'),
    dateutils   =   require('date-utils');

module.exports = scores;

function scores(month, day, year, out){

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

    var url = 'http://stats.nba.com/scores/#!/'+date.toFormat('MM/DD/YYYY');


    xray(url)
      .use(phantom())
      .select([{
        $root: '#main-container > div:nth-child(2) > div > div.row > div > div > div.row > div',
        vteam:{                   // home team
            $root: '.team-row',
            abbr: 'div > div.row > div.col-sm-6.linescores > table > tbody > tr.team-row > td.abbr > a', //  abbreviation
            logo: 'img[src]',   // logo
            link: 'a[href]',   //   team page
            record: 'span',
            qtrs: ['td.qtr.ng-binding'],
            finl: 'td.final.ng-binding'
        },
        vstats: {
            pts: {
                $root: 'div.col-sm-6.game-highs.ng-scope > div.game-highs-container > table > tbody > tr:nth-child(2)',
                name: 'td:nth-child(2)',
                q: 'td:nth-child(3)'
            },
            reb: {
                $root: 'div.col-sm-6.game-highs.ng-scope > div.game-highs-container > table > tbody > tr:nth-child(3)',
                name: 'td:nth-child(2)',
                q: 'td:nth-child(3)'
            },
            ast:{
                $root: 'div.col-sm-6.game-highs.ng-scope > div.game-highs-container > table > tbody > tr:nth-child(4)',
                name: 'td:nth-child(2)',
                q: 'td:nth-child(3)'
            }
        },
        hteam:{                   // home team
            $root: '.game-row',
            abbr: 'div > div.row > div.col-sm-6.linescores > table > tbody > tr.game-row > td.abbr > a', //  abbreviation
            logo: 'img[src]',   // logo
            link: 'a[href]',   //   team page
            record: 'span',   //   won-lost count
            qtrs: ['td.qtr.ng-binding'],    //  partial points in quarters
            finl: 'td.final.ng-binding'     //  final result
        },
        hstats: {
            pts: {
                $root: 'div.col-sm-6.game-highs.ng-scope > div.game-highs-container > table > tbody > tr:nth-child(2)',
                name: 'td:nth-child(4)', // player name
                q: 'td:nth-child(5)'    //  points
            },
            reb: {
                $root: 'div.col-sm-6.game-highs.ng-scope > div.game-highs-container > table > tbody > tr:nth-child(3)',
                name: 'td:nth-child(4)',    //  player name
                q: 'td:nth-child(5)'       //   num of rebounds
            },
            ast:{
                $root: 'div.col-sm-6.game-highs.ng-scope > div.game-highs-container > table > tbody > tr:nth-child(4)',
                name: 'td:nth-child(4)',    //  player name
                q: 'td:nth-child(5)'       //   num of assists
            }
        },
        time: 'div > div.game-header.clearfix > div > span'    // 'FINAL'
      }])
    .write(out) // out must be a variable or a WritableStream


}