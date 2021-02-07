const MongoClient = require('mongodb').MongoClient;

describe('insert', () => {
  let client;
  let db;

  beforeAll(async () => {
    const uri = process.env.MONGO_DB_URI;
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = await client.db("blog").collection('Blog');
  });

  afterAll(async () => {
    await client.close();
    await db.close();
  });


  // let us a simple test for our db
  it('should get and post a doc from collection', async () => {
    // 1. insert a record
    const mockSecret = {_id: '60123b98c757ab700ff8907d', author: 'Tim Cook', content: "Hello World"};
    await db.insertOne(mockSecret);
     
    // 2. find the record it should match
    const insertedSecret = await db.findOne({_id: '60123b98c757ab700ff8907d'});
    expect(insertedSecret).toEqual(mockSecret);
    
    // delete
    await db.deleteOne({_id: '60123b98c757ab700ff8907d'});
  });
});