import {config} from '@shared/constants'
import logger from '@shared/Logger';


import mongo from 'mongodb'
module.exports = async()=> {
    const mongoDB = await mongo.MongoClient.connect(`mongodb://${config.db.host}/${config.db.name}`, (err :any, client :any)=> {
        if (err) throw err;
        const db = client.db('bitcora');

        db.collection('users').find().toArray((err:any, result:any) =>{
            if (err) throw err;
            logger.log(result)
        })
    });
};