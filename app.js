'use strict';
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    schedule = require("node-schedule"),
    stats = require('./routes/stats'),
    telegram = require('./routes/telegram'),
    telegramHelper = require('./core/telegram/telegram'),
    _ = require('lodash'),
    statistic = require('./core/statistic/statistic'),
    ChatStatistic = require('./core/models/chat-statistic'),
    currency = require('./core/currency/currency.js'),
    twitch = require('./core/twitch/twitch.js'),
    db = require('./core/db/mongoose'); //start db

var app = express(),
    chat_id = process.env.CHAT_ID || 'your_chat_id';

var isPapichOnline = false;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/telegram', telegram);
app.use('/stats', stats);

// catch 404 and forward to error handler
app.use(function (req, res) {
    res.status = 404;
    res.render('error', {
        message: 'Not Found',
        error: res
    });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var postCurrency = _.throttle(function () {
    var promise = currency.getScheduledCurrency();
    if (promise) {
        promise.then(function (result) {
            var message = "Курсы валют:\n";
            _.mapKeys(result, function (val, key) {
                message += key.toUpperCase() + ': ' + val + '\n';
            });
            telegramHelper.sendMessage(chat_id, message, "");
        })
    }
}, 10000);

var saveStats = _.throttle(function () {
    var statistics = statistic.getAllStatistic();
    ChatStatistic.update(statistics, {upsert: true}, function (err, msg) {
        if (err) {
            console.log('stat update error: ' + err);
            console.log('chat id: ' + chatStatistic.chat_id + ' time: ' + new Date());
        }
    });
    console.log('stat updated: ' + new Date());
}, 10000);

var checkPapanya = _.throttle(function () {
    twitch.checkPapanya().then(function (result) {
        var papichStramURL = 'http://www.twitch.tv/evilarthas';

        _.mapKeys(JSON.parse(result), function (val, key) {
            var title;

            if (key === "streams") {
                if (val.length) {
                    if (!isPapichOnline) {
                        isPapichOnline = true;
                        title = twitch.randomPapichTitle();
                        telegramHelper.sendMessage(chat_id, title + " " + papichStramURL, "");
                    }
                } else {
                    isPapichOnline = false;
                }
            }
        });
    });
}, 10000);


schedule.scheduleJob({minute: 0}, postCurrency);
schedule.scheduleJob("*/5 * * * *", saveStats);
schedule.scheduleJob("0,30 * * * * *", checkPapanya);
module.exports = app;