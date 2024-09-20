
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 


const app = express();


app.use(bodyParser.json());
app.use(cors());


let tasks = [];
let taskId = 1;


app.use(express.static('public'));


app.get('/tasks', (req, res) => {
  res.json(tasks); 
});


app.post('/tasks', (req, res) => {
  const task = { id: taskId++, name: req.body.name }; 
  tasks.push(task); 
  res.json(task); 
});


app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id); 
  const task = tasks.find(t => t.id === id); 

  if (task) {
    task.name = req.body.name; 
    res.json(task); 
  } else {
    res.status(404).send('Task not found'); 
  }
});


app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id); 
  tasks = tasks.filter(t => t.id !== id); 
  res.status(204).send(); 
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
