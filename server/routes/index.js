const express = require("express");
const { createValidator } = require("../validator");
const {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todos");

const router = express.Router();

router.get("/",(req,res)=>{
  res.end('Welcome...')
})
router.get("/todos", getTodos);
router.post("/todos", createValidator, createTodo);
router.delete("/todos/:id", deleteTodo);
router.put("/todos/:id", updateTodo);
//
module.exports = router;
