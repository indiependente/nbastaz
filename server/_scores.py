import sys
import urllib
import datetime
from urllib import urlopen
from bs4 import BeautifulSoup


# urlscores = 'http://stats.nba.com/scores/#!/'

# yesterday = datetime.date.today() - datetime.timedelta(1)

# yesterday = yesterday.strftime("%m/%d/%Y")

# f = urllib.urlopen(urlscores+yesterday)
# words = f.read().decode('utf-8')
#

words = ''
for line in sys.stdin:
	words += line


soup = BeautifulSoup(words)

matches = soup.find_all('div', class_='col-sm-6 linescores')

print matches