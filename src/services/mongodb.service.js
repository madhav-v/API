const dotenv = require('dotenv')
dotenv.config()
const {MongoClient} = require('mongodb')

class MongodbService{
    #client;
    _db;

    constructor(){
        this._connect()
    }

    _connect = async()=>{
        try{
            this.#client = await MongoClient.connect(process.env.MONGODB_URL)
            this._db = this.#client.db(process.env.MONGODB_NAME)
        } catch(exception){
            throw exception;
        }
    }
}
module.exports = MongodbService;