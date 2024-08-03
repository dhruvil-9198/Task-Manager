const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();

dotenv.config();

const port = 3001;
app.use(bodyParser.json());

const corsOptions = {
    origin: '*', // Change this in production
    methods: ['GET', 'POST', 'DELETE']
};
app.use(cors(corsOptions));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected successfully to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});

// Define a schema and model for Tasks
const taskSchema = new mongoose.Schema({
    id: String,
    u_name: String,
    todo: String,
    isCompleted: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', taskSchema);

app.get('/', async (req, res) => {
    try {
        const name = req.query.u_name;
        const tasks = await Task.find({ u_name: name });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/', async (req, res) => {
    try {
        const task = new Task(req.body);
        const savedTask = await task.save();
        res.send({ success: true, result: savedTask });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/', async (req, res) => {
    try {
        const taskId = req.body.id;
        const deletedTask = await Task.deleteOne({id: taskId});
        res.send({ success: true, result: deletedTask });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Uncomment this for updating a task
// app.post('/', async (req, res) => {
//     try {
//         const taskId = req.body.id;
//         const updatedTask = await Task.findByIdAndUpdate(taskId, { $set: { isCompleted: req.body.isCompleted }}, { new: true });
//         res.send({ success: true, result: updatedTask });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
