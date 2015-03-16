import urllib
from urllib import urlopen
from bs4 import BeautifulSoup

rss = 'http://sports.espn.go.com/espn/rss/nba/news'

f = urllib.urlopen(rss)
words = f.read().decode('utf-8')

soup = BeautifulSoup(words)
array = []
for news in soup.find_all('item'):
	array.append(
		{'title': news.title.text,
		 'descr': news.description.text})

print array