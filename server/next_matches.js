var xray        =   require('x-ray'),
    phantom     =   require('x-ray-phantom'),
    dateutils   =   require('date-utils');

var month = process.argv[2];
var day = process.argv[3];
var year = process.argv[4];

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
    vteam:{                   // home team
    	$root: '.col-sm-6.team.vtm',
    	logo: 'img[src]',   // logo
        abbr: 'span',      //  abbreviation
        link: 'a[href]',   //   team page
        record: 'div.record.ng-binding'
    },
    hteam:{                   // home team
        $root: '.col-sm-6.team.htm',
        logo: 'img[src]',   // logo
        abbr: 'span',      //  abbreviation
        link: 'a[href]',   //   team page
        record: 'div.record.ng-binding'
    },
    time: {                 // start time
    	$root: '.game-header.clearfix',
    	hour: '.status.ng-binding' // ET
    }
  }])
  .write(process.stdout);