var express     = require('express'),
    router      = express.Router(),
    playerify	= require('../bin/playerify')

router.get('/', function (req, res) {
  res.type('json')
  res.send(playerify.getPlayers())
})

module.exports = router