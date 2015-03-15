import sys
import re
import urllib
from urllib import urlopen
from bs4 import BeautifulSoup

TEAM = sys.argv[1]


f = urllib.urlopen('https://www.youtube.com/channel/UCfaYgM4Upm3r3fQMg_c_agw/videos?live_view=500&flow=list&view=0&sort=dd')
words = f.read().decode('utf-8')

soup = BeautifulSoup(words)

watch = soup.find('a', title=re.compile(TEAM))['href'][9:]

video = 'http://www.youtube.com/embed/'+watch

print video
