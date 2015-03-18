import re
import urllib
import json
import unicodedata

from urllib import urlopen

# This method finds the urls for each of the rosters in the NBA using regexes.
# This method generate file teams.json, give the teams.json pathname.
# teams.json structure
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
		else:
			abbr = abbr_normalize
		urlLogo = 'http://stats.nba.com/media/img/teams/logos/'+abbr.upper()+'_logo.svg';

		team_normalize = unicodedata.normalize('NFKD', team[1]).encode('ascii', 'ignore')
		team_split = team_normalize.split("-")
		key = team_split[len(team_split) - 1]
		teamsToFile[key] = {}
		teamsToFile[key]['abbr'] = abbr
		teamsToFile[key]['id'] = i
		teamsToFile[key]['team'] = " ".join(team_normalize.split("-")).title()
		teamsToFile[key]['roster'] = url
		teamsToFile[key]['logo'] = urlLogo
		teamsToFile[key]['stats'] = url.replace('roster', 'stats')
		teamsToFile[key]['depth'] = url.replace('roster', 'depth')

		i+=1

	with open(pathname, 'wb') as outfile:
		json.dump(teamsToFile, outfile)

	return roster_urls


#Using the url of each roster, this function generate the file players.json
def getPlayersJSON(roster_urls, specific_teams):

    #Open each roster, one by one.
    #print roster_urls
    for url in roster_urls['url']:
    	print url
        f = urllib.urlopen (url)
        stats = f.read().decode('utf-8')

        #The salaries were embedded in the source code in this format:
        '''
                href="http://espn.go.com/nba/player/_/id/3200/glen-davis">
                Glen Davis</a></td><td>PF</td><td >25</td><td >6-9</td><td
                >289</td><td>LSU</td><td>$3,000,004</td>
        '''
        players = dict(re.findall('http\://espn\.go\.com/nba/player/_/id/\d*?/.*?\"', stats))
        print players
        # player_salaries = dict(re.findall('http\://espn\.go\.com/nba/player/_/id/\d*?/.*?\">(\w+\s\w+)</a></td><td>\w*?</td><td >\d*?</td><td >.*?</td><td >\d*?</td><td>.*?</td><td>\$(.*?)</td>', stats))


    #players

    # {
    # 	id: espn
    # 	teamID: --> id di teams
    # 	image: link image
    #   espn: URL

    # }

    # logo: http://stats.nba.com/media/img/teams/logos/UTA_logo.svg
    return players

rosters = find_roster_urls('./data/espn_teams.json')

# f = urllib.urlopen('http://espn.go.com/nba/teams')
# words = f.read().decode('utf-8')
# teams = re.findall("http\://espn\.go\.com/nba/team/_/name/\w+?/.+?\"\sclass\=\"bi\">(.+?)</a>", words)

# getPlayersJSON(rosters, teams)