var express     = require('express'),
    router      = express.Router(),
    team 		= require('../bin/espn_team')

router.get('/', function (req, res) {
  res.type('json')
  team(res)
})

module.exports = router