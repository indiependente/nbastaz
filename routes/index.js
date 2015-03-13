var	express 	= require('express'),
	router 		= express.Router()

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function (req, res) {
  res.render('index.html')
})


module.exports = router;
