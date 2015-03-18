var express     = require('express'),
    router      = express.Router(),
    teamify 		= require('../bin/teamify')

router.get('/', function (req, res) {
  res.type('json')
  res.send(teamify.getTeams())
})

module.exports = router