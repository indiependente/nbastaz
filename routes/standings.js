var express     = require('express'),
    router      = express.Router(),
    stands 		= require('../bin/cbssports_standings')

router.get('/', function (req, res) {
  res.type('json')
  stands(res)
})

module.exports = router