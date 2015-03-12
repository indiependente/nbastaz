var express = require('express')
var app = express()
var dateutils = require('date-utils')
var fscores = require('./fscores.js')

app.get('/', function (req, res) {
  res.render('index.html')
})

app.get('/matches', function (req, res) {
  var date = new Date(req.query.date)
  console.log(req.query.date+'\t'+date)
  if(Date.compare(date, Date.today()) < 0)
	{	// scores
		console.log('date < today: '+date)
		// console.log('month = '+date.getMonth()+1)
		// console.log('day = '+date.toFormat('DD'))
		// console.log('year = '+date.getFullYear())
		fscores(date.getMonth()+1, date.toFormat('DD'), date.getFullYear(), res)
	}
  else
  	{	// next matches
  		console.log('date >= today: '+date);
  	}
})

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
})