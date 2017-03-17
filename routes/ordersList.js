/**
 * Created by Antoine on 17/03/2017.
 */
var azure = require('azure-storage');
var async = require('async');

module.exports = OrdersList;

function OrdersList(order) {
    this.order = order;
}

OrdersList.prototype = {
    showOrders: function(req, res) {
        let self = this;
        var query = new azure.TableQuery()
            .where('', false);
        self.order.find(query, function itemsFound(error, items) {
            res.render('admin',{title: 'My Orders List ', orders: items});
        });
    },

    addOrder: function(req, res) {
        var self = this;
        var item = req.body.item;
        self.order.addItem(item, function itemAdded(error) {
            if(error) {
                throw error;
            }
            res.redirect('/');
        });
    },

    completeOrder: function(req, res) {
        var self = this;
        var completedOrders = Object.keys(req.body);
        async.forEach(completedOrders, function orderIterator(completedOrder, callback) {
            self.order.updateItem(completedOrder, function itemsUpdated(error) {
                if(error){
                    callback(error);
                } else {
                    callback(null);
                }
            });
        }, function goHome(error){
            if(error) {
                throw error;
            } else {
                res.redirect('/');
            }
        });
    }
};