var express     = require('express'),
    router      = express.Router(),
    highl 		= require('../bin/YTvid')

router.get('/', function (req, res) {
  res.type('json')
  highl(res, req.query.abbr)
})

module.exports = router