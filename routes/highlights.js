var express     = require('express'),
    router      = express.Router(),
    highl 		= require('../bin/YTvids')

router.get('/', function (req, res) {
  res.type('json')
  highl(res)
})

module.exports = router