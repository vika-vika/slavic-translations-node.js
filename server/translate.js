// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');
var async = require('async-p');

var tr = require('transliteration').transliterate;

// Your Google Cloud Platform project ID
const projectId = 'lingvo-174213';
// Your Google Cloud Platform project Key
const key = 'XXXXXXXXXXXXXXXXXXXXXXXXX';

// Instantiates a client
const translateClient = Translate({
    key: key
});


var languages =
    [{lang: "ru", group: "e"},
        {lang: "be", group: "e"},
        {lang: "uk", group: "e"},

        {lang: "pl", group: "w"},
        {lang: "cs", group: "w"},
        {lang: "sk", group: "w"},

        {lang: "bs", group: "s"},
        {lang: "bg", group: "s"},
        {lang: "hr", group: "s"},
        {lang: "mk", group: "s"},
        {lang: "sr", group: "s"},
        {lang: "sl", group: "s"}];


var methods = {

    timestamp: function (item) {
        console.log('Current Time in Unix Timestamp: ' + Math.floor(Date.now() / 1000) + "  " + item);
    },
    currentDate: function () {
        console.log('Current Date is: ' + new Date().toISOString().slice(0, 10));
    },

    translate: function (word) {
        return function (data) {
            return translateClient.translate(word, data.lang)
                .then(function (result) {
                    var obj = {};
                    obj.target = data.lang;
                    obj.group = data.group;
                    obj.value = result[0];
                    obj.tr = tr(obj.value);

                    return obj;
                })
        };
    },

    foo : function (text) {
        return async.each(languages, this.translate(text))
    }

};

module.exports = methods;
