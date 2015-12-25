'use strict';
var request = require("request"),
    _ = require('underscore'),
    PAPICH_TITLES = [
        "НЫАААААААА",
        "Папаня подрубил",
        "ЛЕГКОСТЬ СОЛЯРЫ",
        "VI KA",
        "ТУК ТУК ТУК",
        "запускаем бинго"
    ];

var twitch = {
    checkPapanya: function (callback) {
        var papichURL = 'https://api.twitch.tv/kraken/streams?game=Dota+2&channel=evilarthas';
        request(papichURL, function (err, resp, body) {
            if (err || !body) {
                console.log("Error trying to get PAPANYA");
                return false;
            }
            callback(resp.body);
        });
    },
    randomPapichTitle: function () {
        return _.sample(PAPICH_TITLES);
    }
};

module.exports = twitch;