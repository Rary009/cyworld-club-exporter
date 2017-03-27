/**
 * Created by ecst_000 on 2016-01-10.
 */
module.exports = function (cookies, articleNo, articles, callback) {
    var cheerio = require('cheerio');
    var $ = cheerio.load(articles);

    var replies = $('table.replylist tbody tr');
    var result = [];

    replies.each(function(i, e){
        var reply = $(this);
		if(reply.hasClass('re_reply')) {
			reply.find('table tr').each(function(i, e){
				if($(this).find('a.nameui').text())
				result.push({
					username: $(this).find('a.nameui').text(),
					registerAt: $(this).find('td.date').text(),
					contents: $(this).find('span.obj_rslt').text()
				});
			});
		}
        else if (!reply.hasClass('new_re')) {
			if(reply.find('a.nameui').text())
            result.push({
                username: reply.find('a.nameui').text(),
                registerAt: reply.find('td.date').text(),
                contents: reply.find('span.obj_rslt').text()
            });
        }
    });

    callback(null, cookies, articleNo, result);
};