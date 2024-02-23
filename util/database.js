const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;


const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://yadeshkumarv:mBdurEZhrPpTsNTK@cluster0.pbnovkn.mongodb.net/cal_table"
  )
  .then(client => {
    console.log('connected');
    _db = client.db('cal_table');
    callback();
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
};

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No database found!';
};


exports.getDb = getDb;
exports.mongoConnect = mongoConnect;
