const express = require("express")
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const db = require('db')
db.connect()

const router = express.Router()

// Get blog
router.get('/:id', async (req, res) => {
    const blog = await loadBlogCollection()
    const response = await blog.findOne({
        _id: new ObjectID(req.params.id)
    }) 
    res.status(200).send(response) 
})

// update blog
router.put('/:id', async (req, res) => {
    const blog = await loadblogCollection()
    const response = await blog.updateOne({
        _id: new ObjectID(req.params.id)
    }, { $set: {expireAfterViews: req.body.expireAfterViews} })
 
    res.status(200).send(response) 
})

// Post blog
router.post('/', async (req, res) => {
    const blog = await loadblogCollection()
    const response = await blog.insertOne({
        blog: req.body.blog,
        expireAfterViews: req.body.expireAfterViews,
        expireAfter: req.body.expireAfter,
        createdAt: new Date()
    })
    res.status(200).send(response)
})

// Delete blog
router.delete('/:id', async (req, res) => {
    const blog = await loadblogCollection()
    await blog.deleteOne({
        _id: new ObjectID(req.params.id)
    })
    res.status(200).send()
})

// mongo db function
async function loadBlogCollection () {
const uri = process.env.MONGO_DB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
await client.connect();
const collection = await client.db("blog").collection("blog"); 
return collection
}


module.exports = router