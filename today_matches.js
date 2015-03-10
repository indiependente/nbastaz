var xray        =   require('x-ray'),
    phantom     =   require('x-ray-phantom'),
    dateutils   =   require('date-utils');

var url = 'http://stats.nba.com/scores/#!/'+Date.today().toFormat('MM/DD/YYYY');


xray(url)
  .use(phantom())
  .select([{
    $root: '#main-container > div:nth-child(2) > div > div.row > div > div > div.row > div',
    hteam:{                   // home team
    	$root: '.col-sm-6.team.htm',
    	logo: 'img[src]',   // logo
    	abbr: 'span',      //  abbreviation
        link: 'a[href]'   //   team page
    },
    vteam:{                   // home team
    	$root: '.col-sm-6.team.vtm',
    	logo: 'img[src]',   // logo
        abbr: 'span',      //  abbreviation
        link: 'a[href]'   //   team page
    },
    time: {                 // start time
    	$root: '.game-header.clearfix',
    	hour: '.status.ng-binding' // ET
    }
  }])
  .write(process.stdout);