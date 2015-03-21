import re
import urllib
from urllib import urlopen

# This method finds the urls for each of the rosters in the NBA using regexes.
def find_roster_urls():
    # Open the webpage containing links to each roster,
    # and extract the names of each roster available.
    f = urllib.urlopen('http://espn.go.com/nba/teams')
    words = f.read().decode('utf-8')
    teams = re.findall("http\://espn\.go\.com/nba/team/_/name/(\w+)/(.+)\"\sclass", words)

    #Using the names of the rosters, this creates the urls of each roster in the NBA.
    roster_urls = []
    for team in teams:
        #each roster webpage follows this general pattern.
        roster_urls.append('http://espn.go.com/nba/team/roster/_/name/' + team[0] + '/' + team[1])

    return roster_urls

#Using the url of each roster, we extract the salary data using regexes and
#perform calculations based on what we have extracted.
def calculate_statistic(roster_urls,specific_teams):

    #Create empty lists that will contain the statistics.
    average_team_salaries = []
    highest_salary_per_team = []

    #Open each roster, one by one.
    for url in roster_urls:
        f = urllib.urlopen (url)
        stats = f.read().decode('utf-8')

        #The salaries were embedded in the source code in this format:
        '''
                href="http://espn.go.com/nba/player/_/id/3200/glen-davis">
                Glen Davis</a></td><td>PF</td><td >25</td><td >6-9</td><td
                >289</td><td>LSU</td><td>$3,000,004</td>
        '''
        #This is the regex pattern corresponding to the code.
        #We create a dictionary to match players to their salary.
        player_salaries = dict(re.findall('http\://espn\.go\.com/nba/player/_/id/\d*?/.*?\">(\w+\s\w+)</a></td><td>\w*?</td><td >\d*?</td><td >.*?</td><td >\d*?</td><td>.*?</td><td>\$(.*?)</td>', stats))

        #change the salaries from strings to integers.
        for key in player_salaries.keys():
            player_salaries[key] = int(re.sub(',',"", player_salaries[key]))
        yield player_salaries
        #Sort the salaries and append them to the list,
        #Also returns the person with the highest salary
        salaries = list(player_salaries.values())

        property = "of statprojects.com"
        highest_salary_per_team.append((find_key(player_salaries,sorted(salaries)[-1]),sorted(salaries)[-1]))
        average_team_salaries.append(sum(salaries)/len(salaries))

    #Prints the average salary out, with the team and salary side by side.
    print ("\n\nAverage Team Salaries in the NBA\n(Average amount spent on each player)\n\n")
    team_with_salary = dict(zip(average_team_salaries, specific_teams ))

    average_team_salaries.sort()
    for key in average_team_salaries:
        print (team_with_salary[key].ljust(30), round(key,2))

    #Prints the highest salaries out, with the team and salary side by side.
    team_with_highest = dict(zip(highest_salary_per_team, specific_teams ))
    highest_salary_per_team.sort(key=lambda highest_salary_per_team: highest_salary_per_team[1])
    print ("\n\nPlayer with the highest salary per team in the NBA\n\n")
    for key in highest_salary_per_team:
        print (team_with_highest[key].ljust(30), key)

#This is a method that finds the key of a dictionary, given the value (not so important, you can ignore this part).
#This is used in the calculate_statistics method.
def find_key(dic, val):
    """return the key of dictionary dic given the value"""
    return [k for k, v in dic.items() if v == val][0]

#Run the program.
rosters = find_roster_urls()

f = urllib.urlopen('http://espn.go.com/nba/teams')
words = f.read().decode('utf-8')
teams = re.findall("http\://espn\.go\.com/nba/team/_/name/\w+?/.+?\"\sclass\=\"bi\">(.+?)</a>", words)

player_salaries = calculate_statistic(rosters,teams)

for p in player_salaries:
	print p