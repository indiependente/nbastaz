var xray 		= 	require('x-ray'),
	dateutils   =   require('date-utils'),
	logofy      =   require('./teamify').getLogo;

// -----------------
// Testing
// url = getUrl('03', '14', '2015');
// schedule(url, process.stdout);
// -----------------

module.exports = {
	getUrl   : getUrl,
	schedule : schedule
};

// from month, day, year it returns a URL from which to start the scraping for espn score or top player of the specific day
function getUrl(month, day, year){

    if (!Date.validateDay(parseInt(day), parseInt(year), parseInt(month))) // Date sanity check
    {
        console.error('Invalid date format');
        process.exit(1);
    }

    var date = new Date(month+'/'+day+'/'+year);

    if (Date.compare(date, Date.today()) == -1) // Date must be
    {
        console.error('I need a date starting from today...');
        process.exit(1);
    }

    return 'http://espn.go.com/nba/schedule?date='+date.toFormat('YYYYMMDD');
}

// Input: need URL from getUrl function
// Output: From specific data, the output is all matches, equipped their info, in a week. Where the week starts
// 		   with the specific data. So if it will be pass 14-03-2015. He shows the matches of the days 14-15-16-17-18-19-20.
// Structure: array of date and matches. Matches is an array that contains information about all match in a specific day.
function schedule(url, out){
	xray(url)
		.prepare('logofy', logofy)
		.select([{
			$root: '#my-teams-table > div.mod-container.mod-table.mod-no-header-footer > div > table:nth-child(1) > tr[class*="team"]',
			match: 'td:nth-child(1)',								// match. Format: Boston at Indiana
			vteam: 'td:nth-child(1) > a:first-child',				// visitor team
			vlogo: 'td:nth-child(1) > a:first-child | logofy',		// visitor team logo
			linkvteam: 'td:nth-child(1) > a[href]:first-child',		// link to page of visitor team
			hteam: 'td:nth-child(1) > a:last-child',				// home team
			hlogo: 'td:nth-child(1) > a:last-child | logofy',		// home team logo
			linkhteam: 'td:nth-child(1) > :last-child[href]',		// link to page of home  team. He doesn't like a[href]:last-child
			time: 'td:nth-child(2)'									// time start of match
			// awaytv: 'td:nth-child(3)',								// away tv
			// hometv: 'td:nth-child(4)',								// home tv
			// nattv: 'td:nth-child(5)',								// nat tv. He can be empty
			// tickets: 'td:nth-child(6)',								// Ticket information from stubhub.com. Format: 637 available from $21
			// linktickets: 'td:nth-child(6) > a[href]'				// link to stubhub.com for the match
		}])
	.write(out);
}

