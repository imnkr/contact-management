const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'myproject';

const client = new MongoClient(url, { useUnifiedTopology: true });


async function insertData (data) {
  try {
    await client.connect();
    let db = client.db(dbName)
    let collection = db.collection('userdata');
    let record = await collection.insertOne({ data });
    console.log(`Inserted ${record} into collection successfully`);
    await client.close();
  }
  catch(err) {
    console.log(err);
  }
}
async function findData () {
  try {
    await client.connect();
    let db = client.db(dbName)
    let collection = db.collection('userdata');
    let record = await collection.find({}).toArray();
    console.log(`All contacts are fetched successfully ${record}`);
    await client.close();
    return record
  }
  catch(err) {
    console.log(err);
  }
}

async function deleteData () {
  try {
    await client.connect();
    let db = client.db(dbName)
    let collection = db.collection('userdata');
    await collection.deleteMany();
    console.log(`Contacts deleted successfully`);
    await client.close();
  }
  catch(err) {
    console.log(err);
  }
}

module.exports = { insertData, findData, deleteData };