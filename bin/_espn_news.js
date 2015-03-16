var xray        =   require('x-ray')

var rss = 'http://www.cbssports.com/nba/wiremenu'

function scrapeNews(out){
	xray(rss)
	.select([{
		$root: '#atreroInner > div.ssItem:nth-child(-n + 10)',
		title: 'div > div.titleContent.mBottom5.fontUbuntuBold > a',
		descr: 'div > div.contentText',
		pubDate: 'span.gmtTimeUpdated'
	}])
	.write(out)
}

module.exports = scrapeNews
