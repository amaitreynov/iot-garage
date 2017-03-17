/**
 * Created by Antoine on 17/03/2017.
 */
var express = require('express');
var router = express.Router();
var nconf = require('nconf');
var azure = require('azure-storage');

/**
 * Params
 * @type {String}
 */
var tableName = nconf.get("TABLE_NAME");
var partitionKey = nconf.get("PARTITION_KEY");
var accountName = nconf.get("STORAGE_NAME");
var accountKey = nconf.get("STORAGE_KEY");

/**
 * Orders related
 * @type {OrdersList}
 */
var OrdersList = require('./ordersList');
var Order = require('../models/order');
var order = new Order(azure.createTableService(accountName, accountKey), tableName, partitionKey);
var orderList = new OrdersList(order);

/**
 * Endpoints
 */
router.get('/', orderList.showOrders.bind(orderList));
router.post('/addorder', orderList.addOrder.bind(orderList));
router.post('/completeorder', orderList.completeOrder.bind(orderList));

module.exports = router;