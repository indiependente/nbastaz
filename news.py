import urllib
from urllib import urlopen
from bs4 import BeautifulSoup

rss = 'http://sports.espn.go.com/espn/rss/nba/news'

f = urllib.urlopen(rss)
words = f.read().decode('utf-8')

soup = BeautifulSoup(words)

for news in soup.find_all('item'):
	print news.title.text