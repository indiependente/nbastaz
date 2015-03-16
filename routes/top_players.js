var express     = require('express'),
    router      = express.Router(),
    top    		= require('../bin/espn_scores_top.js')

router.get('/', function (req, res) {
  res.type('json');
  var date = new Date(req.query.date)
  if(Date.compare(date, Date.today()) < 0)
  { // top
    var url = top.getUrl(date.getMonth()+1, date.toFormat('DD'), date.getFullYear())
    top.topPlayers(url, res)
  }
})

module.exports = router