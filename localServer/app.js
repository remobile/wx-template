var express = require('express');
var bodyParser = require('body-parser');
var jsdom = require("jsdom");
var jquery = require('fs').readFileSync('./utils/jquery.js').toString();
var fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

function getContent(type, page, callback) {
    jsdom.env({
        url: 'http://www.qiushibaike.com/'+type+'/page/'+page,
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20100101 Firefox/23.0' },
        src: [jquery],
        done: function (error, window) {
            if (error) {
                callback([]);
                return;
            }
            var $ = window.$;
            var list = [];
            $("#content-left").find(".article").each(function() {
                var item = {};
                var authorImg = $(this).find('.author img');
                item.avatar = authorImg.attr('src');
                item.username = authorImg.attr('alt');
                item.content =  $(this).find('.content span').html();
                item.likes =  $(this).find('.stats-vote .number').html();
                item.comments =  $(this).find('.qiushi_comments .number').html();
                list.push(item);
            });
            callback(list);
        }
    });
}

app.post('/getList', function(req, res){
    const {type, page} = req.body;
    getContent(type, page, function(list) {
        res.send({list: list});
    });
});


app.listen(3000, function() {
    console.log("server listen on: http://localhost:3000");
});
