var xray = require('x-ray');
var phantom = require('x-ray-phantom')
url = 'http://stats.nba.com/scores/#!/03/10/2015'

// phantom.create(function (ph) {
//   ph.createPage(function (page) {
//     page.open(url, function (status) {
//       console.log("opened nba? ", status);
//       // div.game:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(3) > a:nth-child(1)
//       // #main-container > div:nth-child(2) > div > div.row > div > div > div.row
//       page.evaluate(function () { return document.body; }, function (result) {
//         // console.log(result);
//         ph.exit();
//       });
//     });
//   });
// });

// xray(url)
//   .use(phantom())
//   .select([{
//     $root: '#main-container > div:nth-child(2) > div > div.row > div > div > div.row',
//     class_: 'col-sm-12 game ng-scope pre'
//   }])
//   .write('out.json');

xray(url)
  .use(phantom())
  .select([{
    $root: '#main-container > div:nth-child(2) > div > div.row > div > div > div.row > div:nth-child(1)',
    hteam:{
    	$root: '.col-sm-6.team.htm',
    	logo: 'img[src]',
    	abbr: 'span[class="team-abbrv.pull-right.ng-binding"]'
    },
    vteam:{
    	$root: '.col-sm-6.team.vtm',
    	logo: 'img[src]',
    	abbr: 'span[class="team-abbrv.pull-right.ng-binding"]'
    },
    time: {
    	$root: '.game-header.clearfix',
    	hour: '.status.ng-binding'
    },
    //hteam: 'div[class="col-sm-6 team vtm"]',
    link: 'a[href]'
  }])
  .write(process.stdout);