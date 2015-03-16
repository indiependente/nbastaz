var xray        =   require('x-ray')

var url = 'http://www.nba.com/news/'
function removeTrail(string){
	return string.replace(' Read Full Article ', '')
}
function scrapeNews(out){
	xray(url)
	.prepare('removeTrail', removeTrail)
	.select([{
		$root: '#tab1Content > table',
		title: 'a',
		descr: 'td.nbaNewsInfo > p | removeTrail'
	}])
	.write(out)
}

module.exports = scrapeNews
