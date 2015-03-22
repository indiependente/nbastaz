import multiprocessing
pool = multiprocessing.Pool()
import json
from YTvideos import scrapeURL


with open('./data/espn_teams.json') as data_file:
    data = json.load(data_file)

keys = []
for k in data:
	keys.append(k.title())
print [x.encode('utf-8') for x in list(set(pool.map(scrapeURL, keys))) if x is not None]