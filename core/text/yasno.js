'use strict';

var yasno = {
    yasnyfy: function (text) {
        var year = new Date().getFullYear();
        var yasnenko = "\nЯсно";
        if (text.length === 0) {
            text = ("\n>" + year + yasnenko);
        }
        else {
            text = ("\n>" + year + "\n>" + text + yasnenko);
        }
        return text;
    }
};
module.exports = yasno;