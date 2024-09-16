const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const ToDoModel = require("./models/Todo");

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://hoangdinhnho23:Hoangpi314%40@cluster0.emmwk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/add"
);

app.post("/add/:date", (req, res) => {
  const task = req.body.task;
  const { date } = req.params;
  ToDoModel.create({ task: task, time: date })
    .then((result) => {console.log(result);res.json(result)})
    .catch((err) => res.json(err));
});

app.get("/get/:date", (req, res) => {
  const { date } = req.params;
  console.log("date :" + date);
  ToDoModel.find({ time: date })
    .then((result) => {console.log(result);res.json(result)})
    .catch((err) => res.json(err));
});

app.put("/check/:id", (req, res) => {
  const { id } = req.params;
  ToDoModel.findById(id)
    .then((todo) => {
      todo.done = !todo.done;
      return todo.save();
    })
    .then((result) => {console.log(result);res.json(result)})
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  ToDoModel.findByIdAndDelete({ _id: id })
    .then((result) => {console.log(result);res.json(result)})
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
