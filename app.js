var express = require('express');
var cors = require('cors');
var pug = require('pug');
var crypto = require('crypto-js');
var jwt = require('jsonwebtoken');
var { Client } = require('pg');
var client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'hockey-league',
    user: 'postgres',
    password: 'mplkO0'
});
var path = require('path');
var secretKey = '48470564ef464dda627bbfc59ddd9adeb5a5e316d74e3970a4373dc568466bb1';

var app = express();
var port = 4500;

app.use(cors());
client.connect();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var indexRouter = require('./routes/indexRouter.js');
var loginRouter = require('./routes/loginRouter.js');
var registerRouter = require('./routes/registerRouter.js');
var accountRouter = require('./routes/accountRouter.js');
var logoutRouter = require('./routes/logoutRouter.js');

var registerPlayerRouter = require('./routes/registerPlayerRouter.js');
var registerParentRouter = require('./routes/registerParentRouter.js');
var registerCoachRouter = require('./routes/registerCoachRouter.js');
var registerAssistantCoachRouter = require('./routes/registerAssistantCoachRouter.js');
var registerRefereeRouter = require('./routes/registerRefereeRouter.js');
var registerTimekeeperRouter = require('./routes/registerTimekeeperRouter.js');

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/account', accountRouter);
app.use('/logout', logoutRouter);

app.use('/register/player', registerPlayerRouter);
app.use('/register/coach', registerCoachRouter);
app.use('/register/parent', registerParentRouter);
app.use('/register/assistant_coach', registerAssistantCoachRouter);
app.use('/register/referee', registerRefereeRouter);
app.use('/register/timekeeper', registerTimekeeperRouter);

/**
 * POST and GET Methods for CRUD communication
 */

/*app.post('/verifyToken', (req, res) => {
    var payload = jwt.verify(req.body.token, secretKey);
    if (payload.level >= req.body.required_level) {
        res.json({
            success: true,
            data: payload
        });
    } else {
        res.sendStatus(403);
    }
});*/

app.post('/verifyLogin', (req, res) => {
    var query = 'select * from users where email = \'' + req.body.email + '\'';
    client.query(query, (err, result) => {
        if (err) console.log(err);
        if (result.rows.length > 0) {
            // Found a user, check password
            var hash = crypto.SHA256(req.body.password + result.rows[0].salt);
            if (hash == result.rows[0].password) {
                // Passwords match, generate token and send to client
                var token = jwt.sign(result.rows[0], secretKey);
                res.json({
                    success: true,
                    token: token
                });
            } else {
                // Passwords don't match
                res.json({
                    success: false,
                    reason: 'wrongPass'
                });
            }
        } else {
            // No user was found
            res.json({
                success: false,
                reason: 'noUser'
            });
        }
    });
});

app.post('/verifyToken', (req, res) => {
    console.log('Verifying token...');

    try {
        var payload = jwt.verify(req.body.token, secretKey);

        if (payload.email == 'sysadmin') {
            // If user is sysadmin, skip all checking
            searching = false;
            data = {
                table: 'Admin',
                info: payload
            };
        } else {
            // Get rest of data from parent table
            var searching = true, data = null;
            var query = 'select * from primary_parent where user_id = \'' + payload.user_id + '\'';
            client.query(query, (err, result) => {
                if (err) console.log(err);
                if (result.rows.length > 0) {
                    searching = false;
                    data = {
                        table: 'Parent',
                        info: result.rows[0]
                    };
                }
            });
            if (searching) {
                query = 'select * from secondary_parent where user_id = \'' + payload.user_id + '\'';
                client.query(query, (err, result) => {
                    if (err) console.log(err);
                    if (result.rows.length > 0) {
                        searching = false;
                        data = {
                            table: 'Parent',
                            info: result.rows[0]
                        };
                    }
                });
            }
            if (searching) {
                query = 'select * from player where user_id = \'' + payload.user_id + '\'';
                client.query(query, (err, result) => {
                    if (err) console.log(err);
                    if (result.rows.length > 0) {
                        searching = false;
                        data = {
                            table: 'Player',
                            info: result.rows[0]
                        };
                    }
                });
            }
            if (searching) {
                query = 'select * from referee where user_id = \'' + payload.user_id + '\'';
                client.query(query, (err, result) => {
                    if (err) console.log(err);
                    if (result.rows.length > 0) {
                        searching = false;
                        data = {
                            table: 'Referee',
                            info: result.rows[0]
                        };
                    }
                });
            }
            if (searching) {
                query = 'select * from timekeeper where user_id = \'' + payload.user_id + '\'';
                client.query(query, (err, result) => {
                    if (err) console.log(err);
                    if (result.rows.length > 0) {
                        searching = false;
                        data = {
                            table: 'Timekeeper',
                            info: result.rows[0]
                        };
                    }
                });
            }
            if (searching) {
                query = 'select * from coach where user_id = \'' + payload.user_id + '\'';
                client.query(query, (err, result) => {
                    if (err) console.log(err);
                    if (result.rows.length > 0) {
                        searching = false;
                        data = {
                            table: 'Coach',
                            info: result.rows[0]
                        };
                    }
                });
            }
            if (searching) {
                query = 'select * from assistant_coach where user_id = \'' + payload.user_id + '\'';
                client.query(query, (err, result) => {
                    if (err) console.log(err);
                    if (result.rows.length > 0) {
                        searching = false;
                        data = {
                            table: 'Assistant Coach',
                            info: result.rows[0]
                        };
                    }
                });
            }
        }
        if (searching) {
            res.json({ success: false });
        } else {
            res.json({
                success: true,
                data: data
            });
        }

    } catch(err) {
        console.log(err);
        console.log('Failed to verify token');
        res.json({success: false});
    }
});

/**
 * POST and GET Methods END
 */

app.listen(port, () => { console.log('Listening on port ' + port + '...'); });