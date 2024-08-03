const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const app = express()

dotenv.config()

const port = 3001
app.use(bodyparser.json())

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE']
};
app.use(cors(corsOptions))

const url = process.env.MONGO_URI;
const client = new MongoClient(url);

const dbName = process.env.DB_NAME;

async function main(){
    await client.connect();
    
    app.get('/', async (req, res) => {
    const name = req.query.u_name;
    const db = client.db(dbName);
    const collection = db.collection('Tasks');
    const findResult = await collection.find({u_name: name}).toArray();
    res.json(findResult)
})

app.post('/', async (req, res) => {
    const task = req.body;
    const db = client.db(dbName);
    const collection = db.collection('Tasks');
    const findResult = await collection.insertOne(task);
    res.send({success: true, result: findResult})
})

app.delete('/', async (req, res) => {
    const task = req.body.id;
    const db = client.db(dbName);
    const collection = db.collection('Tasks');
    const findResult = await collection.deleteOne(({id: task}));
    res.send({success: true, result: findResult})
})

// app.post('/', async (req, res) => {
    //     const task = req.body;
    //     const db = client.db(dbName);
    //     const collection = db.collection('Tasks');
    //     const updateResult = await collection.updateOne({_id:task.id}, { $set: { isCompleted: !task.isCompleted }});
    //     res.send({success: true, result: updateResult})
    // })
    
    
    
    app.listen(port, () => {
        console.log(`Example app listening on port http://localhost:${port}`)
    })
}

main();