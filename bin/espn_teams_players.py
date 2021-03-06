import re
import urllib
import json
import unicodedata
import requests
import bs4

from urllib import urlopen

# This method finds the urls for each of the rosters in the NBA using regexes.
# This method generate file teams.json, give the espn_teams.json pathname.

# espn_teams.json structure

# {
# 	abbr: {
#		abbr
#		id: #num
# 		team: name
# 		stats: URL
#		roster: URL
#		espn: URL
#		logo: URL
# 	}
# }
def find_roster_urls(pathname):
	# Open the webpage containing links to each roster,
	# and extract the names of each roster available.
	f = urllib.urlopen('http://espn.go.com/nba/teams')
	words = f.read().decode('utf-8')
	teams = re.findall("http\://espn\.go\.com/nba/team/_/name/(\w+)/(.+)\"\sclass", words)

	#Using the names of the rosters, this creates the urls of each roster in the NBA.
	roster_urls = {}
	roster_urls['url'] = list()
	roster_urls['idTeam'] = list()
	roster_urls['teamAbbr'] = list()
	roster_urls['teamName'] = list()
	teamsToFile = {}
	i = 1
	for team in teams:
		#each roster webpage follows this general pattern.
		url = 'http://espn.go.com/nba/team/roster/_/name/' + team[0] + '/' + team[1]

		url = unicodedata.normalize('NFKD', url).encode('ascii', 'ignore')
		roster_urls['url'].append(url)
		roster_urls['idTeam'].append(i)

		abbr_normalize = unicodedata.normalize('NFKD', team[0]).encode('ascii', 'ignore')
		if(len(abbr_normalize)==2):
			abbr = (abbr_normalize+team[1].split('-')[2][0])
		elif (abbr_normalize=='wsh'):
			abbr = 'was'
		else:
			abbr = abbr_normalize
		
		if(team[1]=='charlotte-hornets'):
			urlLogo = 'http://upload.wikimedia.org/wikipedia/it/3/31/Logo_Charlotte_Hornets_%282014%29.png'
		else:
			urlLogo = 'http://stats.nba.com/media/img/teams/logos/'+abbr[:3].upper()+'_logo.svg';
		
		team_normalize = unicodedata.normalize('NFKD', team[1]).encode('ascii', 'ignore')
		team_split = team_normalize.split("-")
		key = team_split[len(team_split) - 1]
		teamsToFile[key] = {}
		teamsToFile[key]['abbr'] = abbr_normalize
		teamsToFile[key]['id'] = i
		teamsToFile[key]['team'] = " ".join(team_normalize.split("-")).title()
		teamsToFile[key]['roster'] = url
		teamsToFile[key]['logo'] = urlLogo
		teamsToFile[key]['stats'] = url.replace('roster', 'stats')
		teamsToFile[key]['depth'] = url.replace('roster', 'depth')
		roster_urls['teamAbbr'].append(key)
		roster_urls['teamName'].append(teamsToFile[key]['team'])
		print key
		i+=1

	with open(pathname, 'wb') as outfile:
		json.dump(teamsToFile, outfile)

	return roster_urls



#Using the url of each roster, this function generate the file players.json
# espn_players.json structure
# id: {
# 	id: espn
# 	teamID: --> id di teams
# 	image: link image
#   espn: URL
#	name:
# }
def getPlayersJSON(roster_urls, specific_teams, pathname):

	#Open each roster, one by one.
	players = {}
	i = 1
	for url in roster_urls['url']:
		print '\n',url,'\n'
		index = roster_urls['url'].index(url)

		response = requests.get(url)
		soup = bs4.BeautifulSoup(response.text)


		playersURL = [unicodedata.normalize('NFKD', a.attrs.get('href')).encode('ascii', 'ignore') for a in soup.select('#my-players-table > .mod-container.mod-table.mod-no-header-footer > .mod-content > table:first-child() > tr[class*="player"] > td.sortcell > a[href]')]

		for playerURL in playersURL:

			
			response = requests.get(playerURL)
			soup = bs4.BeautifulSoup(response.content)

			playerURLsplit = playerURL.split('/')
			id = playerURLsplit[7]

			name = " ".join(playerURLsplit[8].split("-")).title()
			if(name == 'Steve Nash' or name == 'Elliot Williams'):
				continue
			
			players[id] = {}
			players[id]['id'] = id
			players[id]['teamID'] = roster_urls['idTeam'][index]
			players[id]['teamAbbr'] = roster_urls['teamAbbr'][index]
			players[id]['teamName'] = roster_urls['teamName'][index]
			players[id]['name'] = name
			players[id]['espn'] = playerURL


			if playerURL == 'http://espn.go.com/nba/player/_/id/2959753/joffrey-lauvergne':
				image = 'http://stats.nba.com/media/players/230x185/203530.png'
			elif playerURL == 'http://espn.go.com/nba/player/_/id/2488689/sean-kilpatrick':
				image = 'http://stats.nba.com/media/players/230x185/203930.png'
			elif playerURL == 'http://espn.go.com/nba/player/_/id/1708/mike-dunleavy':
				image = 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1708.png&w=350&h=254'
			else:
				#content > div.mod-container.mod-no-header-footer.mod-page-header > div.mod-content > div.main-headshot > img
				image = soup.select('#content > .mod-container.mod-no-header-footer.mod-page-header > div.mod-content > div.main-headshot > img')[0]['src']
				image = unicodedata.normalize('NFKD', image).encode('ascii', 'ignore')
			players[id]['image'] = image

			print players[id]

	with open(pathname, 'wb') as fp:
		json.dump(players, fp)
	return players

rosters = find_roster_urls('./data/espn_teams.json')

f = urllib.urlopen('http://espn.go.com/nba/teams')
words = f.read().decode('utf-8')
teams = re.findall("http\://espn\.go\.com/nba/team/_/name/\w+?/.+?\"\sclass\=\"bi\">(.+?)</a>", words)

getPlayersJSON(rosters, teams, 'data/espn_players.json')
