import sys
import re
import urllib
from urllib import urlopen
from bs4 import BeautifulSoup
import json



def scrapeURL(team):
	try:
		f = urllib.urlopen('https://www.youtube.com/user/nbagamerecap1/videos')
		words = f.read().decode('utf-8')
		soup = BeautifulSoup(words)
		watch = soup.find('a', title=re.compile(team))['href'][9:]
		return 'http://www.youtube.com/embed/'+watch
	except Exception, e:
		pass

if __name__ == '__main__':
	url = scrapeURL(sys.argv[1])
	if url is not None:
		print json.dumps({
		"team".encode('ascii') : sys.argv[1].lower().encode('ascii'),
		"url".encode('ascii') : url.encode('ascii')
		}, sort_keys=True)