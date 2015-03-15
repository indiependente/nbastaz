var fs 	=	require('fs')

var logos

fs.readFile('./bin/data/logos.json', 'utf8', function (err, data) {
  if (err) throw err
  logos = JSON.parse(data)
})


module.exports = function (team){
    for (var i = 0; i < logos.length; i++) {
        if (logos[i].team.indexOf(team) != -1)
            return logos[i].logo
    }
}