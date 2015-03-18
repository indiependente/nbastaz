var express     = require('express'),
    router      = express.Router(),
    team 		    = require('../bin/espn_team'),
    teamify     = require('../bin/teamify')

router.get('/', function (req, res){
  res.type('json')
  // parse the request parameters and get the url
  res.send(teamify.getTeamByAbbr(req.query.abbr))
})

router.get('/stats', function (req, res) {
  res.type('json')
  // parse the request parameters and get the url
  var stats = teamify.getStats(req.query.abbr) // get the stats link on ESPN
  team.teamStats(stats, res)
})

router.get('/leaders', function (req, res) {
  res.type('json')
  // parse the request parameters and get the url
  var stats = teamify.getStats(req.query.abbr) // get the stats link on ESPN
  team.teamLeaders(stats, res)
})

router.get('/roster', function (req, res) {
  res.type('json')
  // parse the request parameters and get the url
  var roster = teamify.getRoster(req.query.abbr) // get the roster link on ESPN
  team.teamRoster(roster, res)
})

router.get('/depth', function (req, res) {
  res.type('json')
  // parse the request parameters and get the url
  var depth = teamify.getDepth(req.query.abbr) // get the depth link on ESPN
  team.teamDepth(depth, res)
})

module.exports = router