var express     = require('express'),
    router      = express.Router(),
    dateutils   = require('date-utils'),
    scores      = require('../bin/espn_scores_top.js')


router.get('/', function (req, res) {
  var date = new Date(req.query.date)
  if(Date.compare(date, Date.today()) < 0)
  { // scores
    var url = scores.getUrl(date.getMonth()+1, date.toFormat('DD'), date.getFullYear())
    scores.scores(url, res)
  }
  else
    { // next matches
      var url = scores.getUrl(date.getMonth()+1, date.toFormat('DD'), date.getFullYear())
      scores.schedule(url, res)
    }
})

module.exports = router