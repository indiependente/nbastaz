var xray        =   require('x-ray'),
    dateutils   =   require('date-utils');

var url = 'http://www.sportslogos.net/teams/list_by_league/6/National_Basketball_Association/NBA/logos/';

function trim(str) {
  return str.trim();
}

xray(url)
.prepare('trim', trim)
.select([{
    $root: '#team > ul > li',
    name: 'a | trim',
    logo: 'a > img[src]'
    }])
.write('logos.json');