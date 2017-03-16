var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index');//, {deviceConnected: deviceId});
});

router.get('/param', function (req, res) {
    res.render('param');//, {deviceConnected: deviceId});
});

router.get('/admin', function (req, res, next) {
    //registry.list(function (err, devices) {
        res.render('admin');//, {devices: devices, deviceConnected: deviceId});
    //})
});
module.exports = router;
