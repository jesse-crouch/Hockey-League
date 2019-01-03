var express = require('express');
var cors = require('cors');
var pug = require('pug');
var path = require('path');

var app = express();
var port = 4500;

app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/indexRouter.js');

app.use('/', indexRouter);

app.listen(port, () => { console.log('Listening on port ' + port + '...'); });