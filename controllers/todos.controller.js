// const Todo = require("../models/Todo.model")

// module.exports.todoController = {

//     getTodos : async (req, res) => {
//         try {
//             const todo = await Todo.find()
//             res.json(todo)
//         } catch (error) {
//             res.json(error)
//         }
//     },

//     postTodo : async (req, res) => {
//             try {
//                 const { name } = req.body
//                 const todo = await Todo.create({name})
//                 res.json(todo)
//             } catch (error) {
//                 res.json(error.message)
//             }
//         },

//     patchTodo : async (req, res) => {
//         try {
//             const { name } = req.body
//             const todo = await Todo.findByIdAndUpdate(req.params.id, {name})
//             res.json(todo)
//         } catch (error) {
//             res.json(error)
//         }
//     },

//     deleteTodo : async (req, res) => {
//         try {
//             const todo = await Todo.findByIdAndDelete(req.params.id)
//             res.json(todo)
//         } catch (error) {
//             res.json(error)
//         }
//     }
// }
const Todo = require("../models/Todo.model");
const jwt = require("jsonwebtoken");

module.exports.todosController = {

  getAllTodos: async (req, res) => {
    const todos = await Todo.find({user: req.user.id});

    res.json(todos);
  },

  deleteTodo: async (req, res) => {
    const { id } = req.params;
    try {

      const todo = await Todo.findById(id)      
      if (todo.user.toString() === req.user.id) {
        await Todo.findByIdAndRemove(id)
        return res.json("Удалено")
      }
     return res.status(401).json("Ошибка нет доступа");
    } catch (e) 
    {
     return res.status(401).json(e.message + "Внутренняя ошибка сервера");
    }
  },
  
  createTodo: async (req, res) => {
    const { name } = req.body;
    try {
      const todo = await Todo.create({
        user: req.user.id,
        name,
      });

      return res.json(todo)
    } catch (e) {
      res.status(401).json(e.toString());
    }
  },
  completedTodo: async (req, res) => {
    try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(id, { completed: req.body.completed });
    res.json(todo);
    } catch (error) {
    res.json({ message: "Ошибка при изменении тудушки" });
    }
  }
};

