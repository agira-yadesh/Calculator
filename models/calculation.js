const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
const {ObjectId} = require("mongodb");
class Calculation {
    constructor(expression, result){
        this.expression = expression;
        this.result = result;
    }

    save() {
        const db  = getDb();
        return db
        .collection('result')
        .insertOne(this)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
    }

    static  fetchAll(){
        const db = getDb();
        return db.collection('result')
        .find().toArray()
        .then(result => {
            // console.log(result);
            return result;
        })
        .catch(err=>{
            console.log(err);
        });
    }

    static deleteById(calId){
        console.log("cali",calId);

        const db = getDb();
        const objectid = new ObjectId(calId);
        console.log(objectid, typeof objectid)
        return db.collection('result').deleteOne({_id: objectid })
        .then(result=>{
            console.log(result);
            console.log('deleted');
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

module.exports = Calculation;