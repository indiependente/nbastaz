var express     = require('express'),
    router      = express.Router(),
    playerify	= require('../bin/playerify'),
    player 		= require('../bin/espn_player')

router.get('/', function (req, res) {
  res.type('json') // example: /player?id=3978
  var pInfo = playerify.getPlayerByID(req.query.id)
  console.log(pInfo.espn);
  player(pInfo.espn, res)
})

module.exports = router