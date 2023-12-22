const { Router } = require("express");
const { tod, todosController } = require("../controllers/todos.Controller");
const authMiddlewar = require("../models/middlewar/auth.middlewar");

const router = Router();

router.get("/todo", authMiddlewar, todosController.getAllTodos);
router.post("/todo", authMiddlewar, todosController.createTodo);
router.patch("/todo/:id", authMiddlewar, todosController.completedTodo);
router.delete("/todo/:id", authMiddlewar, todosController.deleteTodo);

module.exports = router;
