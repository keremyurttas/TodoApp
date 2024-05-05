const Todo = require("../models/todo");

exports.getTodos = (req, res) => {
  const todos = Todo.find()
    .select("text completed _id color")
    .then((todos) => {
      res.json({ todos });
    })
    .catch((err) => console.log(err));
};
exports.createTodo = (req, res) => {
  const todo = new Todo(req.body);

  todo
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (todo) {
      res.status(200).json({ message: "Todo deleted successfully" });
    } else {
      return res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    console.error("Error deletng todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    // const updatedValues = [req.body.text, req.body.color, req.body.completed];
    const { text, color, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { text, color, completed },

      {
        new: true,
      }
    );
    console.log(updatedTodo);

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    } else {
      res.json({ message: "Todo updated succesfully", todo: updatedTodo });
    }
  } catch (err) {
    console.log("Error updating todo:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
