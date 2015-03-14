var xray        =   require('x-ray'),
    phantom     =   require('x-ray-phantom');

var url = 'http://stats.nba.com/teams';

xray(url)
  .use(phantom())
  .select([{
    $root: 'div.team-block.clearfix.ng-scope',
    team: 'div.team-info > a',
    logo: 'div.team-img > a > stats-img-team > img[src]'
  }])
  .write('logos.json');
