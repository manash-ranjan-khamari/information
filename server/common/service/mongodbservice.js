const {MongoClient} = require('mongodb');
const config = require('../../../config/appconfig.js');
const client = new MongoClient(config.mongo.url);

let db;
class MongoDBService {
    constructor() {
        this.db = db;
    }
    
    static async connect() {
        await client.connect();
        db = client.db(config.mongo.database);
        console.log('Connected successfully to mongodb server');
    }
}

module.exports = MongoDBService;
