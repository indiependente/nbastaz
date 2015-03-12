var express   = require('express'),
 app          = express(),
 dateutils    = require('date-utils'),
 scores       = require('./scores.js'),
 nexts        = require('./next_matches.js')
 path         = require('path')

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', function (req, res) {
  res.render('index.html')
})

app.get('/matches', function (req, res) {
  var date = new Date(req.query.date)
  console.log(req.query.date+'\t'+date)
  if(Date.compare(date, Date.today()) < 0)
	{	// scores
		console.log('date < today: '+date)
		scores(date.getMonth()+1, date.toFormat('DD'), date.getFullYear(), res)
	}
  else
  	{	// next matches
  		console.log('date >= today: '+date);
      nexts(date.getMonth()+1, date.toFormat('DD'), date.getFullYear(), res)
  	}
})

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
})