var express     = require('express'),
    router      = express.Router(),
    dateutils   = require('date-utils'),
    scores      = require('../bin/espn_scores_top.js'),
    schedule    = require('../bin/espn_schedule_matches.js')



router.get('/', function (req, res) {
  var date = new Date(req.query.date)
  console.log(req.query.date+'\t'+date)
  if(Date.compare(date, Date.today()) < 0)
  { // scores
    console.log('date < today: '+date)
    var url = scores.getUrl(date.getMonth()+1, date.toFormat('DD'), date.getFullYear())
    scores.scores(url, res)
  }
  else
    { // next matches
      console.log('date >= today: '+date)
      var url = schedule.getUrl(date.getMonth()+1, date.toFormat('DD'), date.getFullYear())
      schedule.schedule(url, res)
    }
})

module.exports = router