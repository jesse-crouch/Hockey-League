var express = require('express');
var router = express.Router();
var fs = require('fs');

var url = '';
fs.readFile('serverURL.txt', 'utf8', (err, data) => {
    if (err) console.log(err);
    url = data;
});

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Hockey League - Home',
        js: 'index',
        server: url
    });
});

module.exports = router;