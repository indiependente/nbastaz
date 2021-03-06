var xray        =   require('x-ray'),
    phantom     =   require('x-ray-phantom'),
    dateutils   =   require('date-utils');

module.exports = nexts;

function nexts(month, day, year, out){

    if (!Date.validateDay(parseInt(day), parseInt(year), parseInt(month))) // Date sanity check
    {
        console.error('Invalid date format');
        process.exit(1);
    }

    var date = new Date(month+'/'+day+'/'+year);

    if (Date.compare(date, Date.today()) == -1) // Date must be
    {
        console.error('I need a date starting from today...');
        process.exit(1);
    }

    var url = 'http://stats.nba.com/scores/#!/'+date.toFormat('MM/DD/YYYY');


    xray(url)
      .use(phantom())
      .select([{
        $root: '#main-container > div:nth-child(2) > div > div.row > div > div > div.row > div',
        vteam:{                   // visitor team
            $root: '.col-sm-6.team.vtm',
            abbr: 'span',       //  abbreviation
            link: 'a[href]',   //   team page
            logo: 'img[src]', // logo
            record: 'div.record.ng-binding'
        },
        hteam:{                   // home team
            $root: '.col-sm-6.team.htm',
            abbr: 'span',       //  abbreviation
            link: 'a[href]',   //   team page
            logo: 'img[src]', // logo
            record: 'div.record.ng-binding'
        },
        time: 'div.game-header.clearfix > div.status.ng-binding'    // starting time (ET)
      }])
      .write(out);
}