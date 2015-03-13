var express     = require('express');
var router      = express.Router();
var dateutils   = require('date-utils');
var scores      = require('../bin/scores.js');
var nexts       = require('../bin/next_matches.js');



router.get('/', function (req, res) {
  var date = new Date(req.query.date)
  console.log(req.query.date+'\t'+date)
  if(Date.compare(date, Date.today()) < 0)
  { // scores
    console.log('date < today: '+date)
    scores(date.getMonth()+1, date.toFormat('DD'), date.getFullYear(), res)
  }
  else
    { // next matches
      console.log('date >= today: '+date);
      nexts(date.getMonth()+1, date.toFormat('DD'), date.getFullYear(), res)
    }
})

module.exports = router;