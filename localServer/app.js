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

function getList(type, page, callback) {
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
            $("#content-left .article").each(function() {
                var item = {};
                var authorImg = $(this).find('.author img');
                var content =  $(this).find('.contentHerf');
                item.avatar = authorImg.attr('src');
                item.author = authorImg.attr('alt');
                item.content =  content.find('span').html();
                item.id =  content.attr('href').replace(/.*\//, '');
                item.likes =  $(this).find('.stats-vote .number').html();
                item.comments =  $(this).find('.qiushi_comments .number').html();
                item.image =  $(this).find('.thumb img').attr('src');
                list.push(item);
            });
            callback(list);
        }
    });
}
app.get('/getList', function(req, res){
    const {type, page} = req.query;
    getList(type, page, function(list) {
        res.send(list);
    });
});

function getCommentList(id, callback) {
    jsdom.env({
        url: 'http://www.qiushibaike.com/article/'+117749425,
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20100101 Firefox/23.0' },
        src: [jquery],
        done: function (error, window) {
            if (error) {
                callback([]);
                return;
            }
            var $ = window.$;
            var list = [];
            $('.comments-wrap .comments .comment-block').each(function() {
                var item = {};
                var replayerImg = $(this).find('.avatars img');
                item.avatar = replayerImg.attr('src');
                item.replayer = replayerImg.attr('alt');
                item.replay =  $(this).find('.replay span').html();
                item.report =  $(this).find('.report').html();
                list.push(item);
            });
            callback(list);
        }
    });
}
app.get('/getCommentList', function(req, res){
    const {id} = req.query;
    getCommentList(id, function(list) {
        res.send(list);
    });
});


app.listen(3000, function() {
    console.log("server listen on: http://localhost:3000");
});
