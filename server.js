// set variables for environment
var express = require('express');
var app = express();
var path = require('path');

// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');

var translation = require('./server/translate');

// Your Google Cloud Platform project ID
const projectId = 'lingvo-174213';
// Your Google Cloud Platform project Key
const key = 'AIzaSyAECAJxcwHs0GSvOXt3_WG5_1_GoeaDjQo';

// Instantiates a client
const translateClient = Translate({
    key: key
});

app.set('port', (process.env.PORT || 5000));

app.get('/', function (request, response) {
    response.sendfile('./public/templates/index.html');
});

app.get('/slavic', function (request, response) {
    response.sendfile('./public/templates/lingvo.html');
});


app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


app.get('/api/foo', function (req, res) {
    res.json({"foo": "bar"});
});

app.get('/api/translate', function (req, res) {
    var text = req.query.q;

    var obj = {};
    obj.value  = text;
    obj.translations = [];

    translation.foo(text)
        .then(function (results) {
            obj.translations = results;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(obj));
        })
        .catch(function (err) {
            console.log(err)
        });

});

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); // use either jade or ejs		
// instruct express to server up static assets
app.use(express.static('public'));




