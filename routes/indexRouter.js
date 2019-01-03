var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Hockey League - Home',
        js: 'index'
    });
});

module.exports = router;