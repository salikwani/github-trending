var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var repositories = [];
request('https://www.github.com/trending', function(err, response, html) {
    if(!err && response.statusCode == 200) {
        var $ = cheerio.load(html);

        $('.Box-row').each(function(i, el) {
            var title = $(el).find('> h1 > a').text().replace(/\s\s+/g,"");
            
            var description = $(el).find('> p').text().replace(/\s\s+/g,"");

            var url = $(el).find('> h1 > a').attr('href');

            var star = $(el).find('> div > a:nth-child(2)').text().replace(/\s\s+/g,"");

            var fork = $(el).find('> div > a:nth-child(3)').text().replace(/\s\s+/g,"");

            var language = $(el).find('span[itemprop="programmingLanguage"]').text(); 

            var obj = {title: title, description: description, url: url, stars: star, forks: fork, language: language};
            repositories.push(obj);
        });

        fs.writeFile('github-trending.json', JSON.stringify(repositories), function(err) {
            if(!err) {
                console.log(repositories);
                console.log("File Succesfully Saved");
            } else {
                console.log("error");
            }
        });

    } else { 
        console.log("error");
    }
});
