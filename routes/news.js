var express     = require('express'),
    router      = express.Router(),
    scrapeNews  = require('../bin/espn_news')


router.get('/', function (req, res) {
  res.type('json');
  scrapeNews(res)
})

module.exports = router