var express = require('express');
var router = express.Router();

/**
 * Endpoints
 */
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index');//, {deviceConnected: deviceId});
});

router.get('/param', function (req, res) {
    res.render('param');//, {deviceConnected: deviceId});
});

module.exports = router;
