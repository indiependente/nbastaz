var express     = require('express'),
    router      = express.Router(),
    wrapper     = require('../bin/wrapper')


router.get('/', function (req, res) {
  res.type('json');
  wrapper('python', ['./bin/news.py']).on('data', function(data){
    res.send(data)
  })
})

module.exports = router