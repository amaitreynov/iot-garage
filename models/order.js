/**
 * Created by Antoine on 17/03/2017.
 */
var azure = require('azure-storage');
var uuid = require('node-uuid');
var entityGen = azure.TableUtilities.entityGenerator;

module.exports = Order;

function Order(storageClient, tableName, partitionKey) {
    this.storageClient = storageClient;
    this.tableName = tableName;
    this.partitionKey = partitionKey;
    this.storageClient.createTableIfNotExists(tableName, function tableCreated(error) {
        if(error) {
            throw error;
        }
    });
}

Order.prototype = {
    find: function(query, callback) {
        let self = this;
        self.storageClient.queryEntities(this.tableName, query, null, function entitiesQueried(error, result) {
            if(error) {
                callback(error);
            } else {
                callback(null, result.entries);
            }
        });
    },

    addItem: function(item, callback) {
        let self = this;
        // use entityGenerator to set types
        // NOTE: RowKey must be a string type, even though
        // it contains a GUID in this example.
        var itemDescriptor = {
            PartitionKey: entityGen.String(self.partitionKey),
            RowKey: entityGen.String(uuid()),
            name: entityGen.String(item.name),
            category: entityGen.String(item.category),
            completed: entityGen.Boolean(false)
        };
        self.storageClient.insertEntity(self.tableName, itemDescriptor, function entityInserted(error) {
            if(error){
                callback(error);
            }
            callback(null);
        });
    },

    updateItem: function(rKey, callback) {
        let self = this;
        self.storageClient.retrieveEntity(self.tableName, self.partitionKey, rKey, function entityQueried(error, entity) {
            if(error) {
                callback(error);
            }
            entity.completed._ = true;
            self.storageClient.updateEntity(self.tableName, entity, function entityUpdated(error) {
                if(error) {
                    callback(error);
                }
                callback(null);
            });
        });
    }
};