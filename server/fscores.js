var xray        =   require('x-ray'),
    phantom     =   require('x-ray-phantom'),
    dateutils   =   require('date-utils');

// var month = process.argv[2];
// var day = process.argv[3];
// var year = process.argv[4];
module.exports = fscores;

function fscores(month, day, year, out){

    if (!Date.validateDay(parseInt(day), parseInt(year), parseInt(month))) // Date sanity check
    {
        console.error('Invalid date format');
        process.exit(1);
    }
    console.log('syntax check');

    var date = new Date(month+'/'+day+'/'+year);

    console.log('semantic check');
    if (Date.compare(Date.UTCyesterday(), date) == -1) // Date must be
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
            logo: 'img[src]',   // logo
            abbr: {            //  abbreviation
                $root: '.abbr',
                text: 'a'
            },
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
            logo: 'img[src]',   // logo
            abbr: {            //  abbreviation
                $root: '.abbr',
                text: 'a'
            },
            link: 'a[href]',   //   team page
            record: 'span',
            qtrs: ['td.qtr.ng-binding'],
            finl: 'td.final.ng-binding'
        },
        hstats: {
            pts: {
                $root: 'div.col-sm-6.game-highs.ng-scope > div.game-highs-container > table > tbody > tr:nth-child(2)',
                name: 'td:nth-child(4)',
                q: 'td:nth-child(5)'
            },
            reb: {
                $root: 'div.col-sm-6.game-highs.ng-scope > div.game-highs-container > table > tbody > tr:nth-child(3)',
                name: 'td:nth-child(4)',
                q: 'td:nth-child(5)'
            },
            ast:{
                $root: 'div.col-sm-6.game-highs.ng-scope > div.game-highs-container > table > tbody > tr:nth-child(4)',
                name: 'td:nth-child(4)',
                q: 'td:nth-child(5)'
            }
        },
        time: {                 // start time
            $root: '.game-header.clearfix',
            hour: 'span' // ET
        }
      }])
    .write(out)


}