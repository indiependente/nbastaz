var express     = require('express'),
    router      = express.Router(),
    top    		= require('../bin/espn_season_top_players')

router.get('/', function (req, res) {
  res.type('json')
  top(res)
})

module.exports = router