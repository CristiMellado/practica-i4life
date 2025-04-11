const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/auth.middleware");

// Obtener todas las tareas
router.get("/tasks", async (req, res) => {
  try {
    //const tasks = await Task.find();
    const tasks = await Task.find().populate('userId', 'username'); //me muestra el username
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

//Obtener authMiddleware
router.get('/', authMiddleware,async (req, res) => { 
  console.log(req.userId)
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
});

/*  Agregar una nueva tarea
router.post("/tasks", authMiddleware ,async (req, res) => { // comento para probar que no me falle más
  try {
    const { title } = req.body;
    if (!title)
      return res.status(400).json({ error: "El título es obligatorio" });
    const newTask = new Task({ title });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
});*/

//antiguo
/*router.post('/', authMiddleware, async (req, res) => {
    const { title} = req.body;
    const task = new Task({ title, completed: false, userId: req.userId });
    await task.save();
    res.status(201).json(task);
    }); */

    // Refactorización  de mi post cuando recibe el departamento
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, department } = req.body; // Recibimos el título y el departamento desde el cuerpo de la solicitud

    if (!title) {
      return res.status(400).json({ error: "El título es obligatorio" });
    }
    // Validamos que el departamento esté en el enum de valores permitidos
    const validDepartments = ['Datos & IOT', 'Desarrollo Fullstack', 'Marketing', 'Diseño Web'];
    if (department && !validDepartments.includes(department)) {
      return res.status(400).json({ error: "Departamento inválido" });
    }

    // Creamos la nueva tarea con los datos recibidos
    const task = new Task({
      title,
      completed: false, 
      userId: req.userId, 
      department // Incluimos el departamento si fue enviado
    });

    // Guardamos la tarea en la base de datos
    await task.save();

    // Respondemos con la tarea creada
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
});


// Marcar una tarea como completada
router.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada" });
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
});



// Eliminar una tarea
router.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
});
module.exports = router;
