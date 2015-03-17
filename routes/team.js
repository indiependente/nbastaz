var express     = require('express'),
    router      = express.Router(),
    team 		= require('../bin/espn_team')

router.get('/stats', function (req, res) {
  res.type('json')
  // parse the request parameters and get the url
  var url = '' // to be filled
  team.teamStats(url, res)
})

router.get('/leaders', function (req, res) {
  res.type('json')
  // parse the request parameters and get the url
  var url = '' // to be filled
  team.teamLeaders(url, res)
})

router.get('/roster', function (req, res) {
  res.type('json')
  // parse the request parameters and get the url
  var url = '' // to be filled
  team.teamRoster(url, res)
})

router.get('/teamDepth', function (req, res) {
  res.type('json')
  // parse the request parameters and get the url
  var url = '' // to be filled
  team.teamDepth(url, res)
})

module.exports = router